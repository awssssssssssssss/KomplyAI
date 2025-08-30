import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';
import { supabase as supabaseClient } from '@/lib/db';
import { aiService } from '@/lib/ai';
import { z } from 'zod';

const privacyPolicySchema = z.object({
    organizationId: z.string(),
    organizationDetails: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        // For local development, use mock session
        const session = await getServerSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if Supabase client is initialized
        if (!supabaseClient) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        // Since we've checked that supabaseClient is not null, we can safely use it
        const supabase = supabaseClient;

        // For local development, no rate limiting
        const rateLimitSuccess = await aiService.checkRateLimit(`ai-policy-${session.user.email || 'unknown'}`);
        if (!rateLimitSuccess) {
            return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        }

        const body = await req.json();
        const { organizationId, organizationDetails } = privacyPolicySchema.parse(body);

        // Verify user has access to organization (mock implementation)
        const organizationUserResult: any = await supabase
            .from('organization_users')
            .select('*')
            .eq('user_id', session.user.email || 'unknown')
            .eq('organization_id', organizationId)
            .single();

        const { data: organizationUser, error: organizationUserError } = organizationUserResult;

        if (organizationUserError || !organizationUser) {
            return NextResponse.json({ error: 'Organization not found or access denied' }, { status: 403 });
        }

        // Get organization details (mock implementation)
        const organizationResult: any = await supabase
            .from('organizations')
            .select(`
                *,
                data_processes(*)
            `)
            .eq('id', organizationId)
            .single();

        const { data: organization, error: organizationError } = organizationResult;

        if (organizationError || !organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        // Get data processing activities (mock implementation)
        const dataProcessesResult: any = await supabase
            .from('data_processes')
            .select('*')
            .eq('organization_id', organizationId);

        const { data: dataProcesses, error: dataProcessesError } = dataProcessesResult;

        if (dataProcessesError) {
            return NextResponse.json({ error: 'Error fetching data processes' }, { status: 500 });
        }

        // Generate privacy policy using AI (mock implementation)
        const privacyPolicy = await aiService.generatePrivacyPolicy(
            `Generate a privacy policy for ${(organization as any).name || 'an organization'} with the following details: ${organizationDetails}`
        );

        // Save policy to database (mock implementation)
        const policyResult: any = await supabase
            .from('policies')
            .insert({
                title: `Datenschutzerklärung - ${(organization as any).name || 'Organization'}`,
                content: privacyPolicy,
                version: '1.0',
                effective_date: new Date().toISOString(),
                organization_id: organizationId,
            })
            .select()
            .single();

        const { data: policy, error: policyError } = policyResult;

        if (policyError) {
            return NextResponse.json({ error: 'Error creating policy' }, { status: 500 });
        }

        // Log the action (mock implementation)
        const auditLogResult: any = await supabase
            .from('audit_logs')
            .insert({
                action: 'GENERATE_PRIVACY_POLICY',
                entity_id: (policy as any).id,
                entity_type: 'Policy',
                user_id: session.user.email || 'unknown',
                organization_id: organizationId,
                ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
                user_agent: req.headers.get('user-agent') || '',
            });

        const { error: auditLogError } = auditLogResult;

        if (auditLogError) {
            console.error('Error creating audit log:', auditLogError);
            // Don't fail the request if audit log creation fails
        }

        return NextResponse.json({ policy });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 });
        }

        console.error('Error generating privacy policy:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
