// Data Assets API Route

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDataAssets, getDataAsset, createDataAsset, updateDataAsset, deleteDataAsset } from '@/lib/db/data-inventory';
import { validateOrganizationAccess } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const searchTerm = searchParams.get('search') || '';
    const categoryFilter = searchParams.get('category') || 'all';
    const dataSourceId = searchParams.get('dataSourceId');
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let assets = await getDataAssets(organizationId);
    
    // Apply search filter
    if (searchTerm) {
      assets = assets.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      assets = assets.filter(asset => asset.category === categoryFilter);
    }
    
    // If dataSourceId is provided, filter by it
    if (dataSourceId) {
      assets = assets.filter(asset => asset.data_source_id === dataSourceId);
    }
    
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching data assets:', error);
    return NextResponse.json({ error: 'Failed to fetch data assets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { organizationId, ...assetData } = body;
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const asset = await createDataAsset(organizationId, assetData);
    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error('Error creating data asset:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, organizationId, ...updates } = body;
    
    if (!id || !organizationId) {
      return NextResponse.json({ error: 'ID and Organization ID are required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const asset = await updateDataAsset(id, organizationId, updates);
    return NextResponse.json(asset);
  } catch (error) {
    console.error('Error updating data asset:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const organizationId = searchParams.get('organizationId');
    
    if (!id || !organizationId) {
      return NextResponse.json({ error: 'ID and Organization ID are required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteDataAsset(id, organizationId);
    return NextResponse.json({ message: 'Data asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting data asset:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
