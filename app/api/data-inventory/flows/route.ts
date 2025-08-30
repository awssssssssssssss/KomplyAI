// Data Flows API Route

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getDataFlows, getDataFlow, createDataFlow, updateDataFlow, deleteDataFlow, getDataFlowGraph } from '@/lib/db/data-inventory';
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
    const sourceAssetId = searchParams.get('sourceAssetId');
    const destinationAssetId = searchParams.get('destinationAssetId');
    const graph = searchParams.get('graph') === 'true';
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return graph data if requested
    if (graph) {
      const graphData = await getDataFlowGraph(organizationId);
      return NextResponse.json(graphData);
    }

    let flows = await getDataFlows(organizationId);
    
    // Apply search filter
    if (searchTerm) {
      flows = flows.filter(flow => 
        flow.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flow.frequency?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flow.transfer_method?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by source asset if provided
    if (sourceAssetId) {
      flows = flows.filter(flow => flow.source_asset_id === sourceAssetId);
    }
    
    // Filter by destination asset if provided
    if (destinationAssetId) {
      flows = flows.filter(flow => flow.destination_asset_id === destinationAssetId);
    }
    
    return NextResponse.json(flows);
  } catch (error) {
    console.error('Error fetching data flows:', error);
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
    const { organizationId, ...flowData } = body;
    
    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user?.email || '', organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const flow = await createDataFlow(organizationId, flowData);
    return NextResponse.json(flow, { status: 201 });
  } catch (error) {
    console.error('Error creating data flow:', error);
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

    const flow = await updateDataFlow(id, organizationId, updates);
    return NextResponse.json(flow);
  } catch (error) {
    console.error('Error updating data flow:', error);
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

    await deleteDataFlow(id, organizationId);
    return NextResponse.json({ message: 'Data flow deleted successfully' });
  } catch (error) {
    console.error('Error deleting data flow:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
