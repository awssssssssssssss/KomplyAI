// Data Classifications API Route

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDataClassifications, getDataClassification, createDataClassification, updateDataClassification, deleteDataClassification } from '@/lib/db/data-inventory';
import { validateOrganizationAccess } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const dataAssetId = searchParams.get('dataAssetId');
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    let classifications;
    if (dataAssetId) {
      // For mock data, we'll just return all classifications since we don't have proper filtering
      classifications = await getDataClassifications(organizationId);
    } else {
      classifications = await getDataClassifications(organizationId);
    }
    
    return NextResponse.json(classifications);
  } catch (error) {
    console.error('Error fetching data classifications:', error);
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
    const { organizationId, ...classificationData } = body;
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const classification = await createDataClassification(organizationId, classificationData);
    return NextResponse.json(classification, { status: 201 });
  } catch (error) {
    console.error('Error creating data classification:', error);
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

    const classification = await updateDataClassification(id, organizationId, updates);
    return NextResponse.json(classification);
  } catch (error) {
    console.error('Error updating data classification:', error);
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

    await deleteDataClassification(id, organizationId);
    return NextResponse.json({ message: 'Data classification deleted successfully' });
  } catch (error) {
    console.error('Error deleting data classification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
