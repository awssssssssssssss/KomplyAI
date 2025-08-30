import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAuditLogs } from '@/lib/db/data-inventory';
import { validateOrganizationAccess } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId') || 'mock-org-id';
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Validate organization access
    const hasAccess = await validateOrganizationAccess(session.user.email, organizationId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const auditLogs = await getAuditLogs(organizationId, limit);
    
    return NextResponse.json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
