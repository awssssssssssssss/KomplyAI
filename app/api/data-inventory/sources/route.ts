// Data Sources API Route

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDataSources, getDataSource, createDataSource, updateDataSource, deleteDataSource } from '@/lib/db/data-inventory';
import { validateOrganizationAccess } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const sources = await getDataSources(organizationId);
    return NextResponse.json(sources);
  } catch (error) {
    console.error('Error fetching data sources:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { organizationId, ...sourceData } = body;
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const source = await createDataSource(organizationId, sourceData);
    return NextResponse.json(source, { status: 201 });
  } catch (error) {
    console.error('Error creating data source:', error);
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

    const source = await updateDataSource(id, organizationId, updates);
    return NextResponse.json(source);
  } catch (error) {
    console.error('Error updating data source:', error);
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

    await deleteDataSource(id, organizationId);
    return NextResponse.json({ message: 'Data source deleted successfully' });
  } catch (error) {
    console.error('Error deleting data source:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
