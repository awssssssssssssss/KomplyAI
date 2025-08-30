import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { aiService } from '@/lib/ai';
import { z } from 'zod';

const privacyPolicySchema = z.object({
    organizationId: z.string(),
    organizationDetails: z.string(),
});

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check rate limit
        const rateLimitSuccess = await aiService.checkRateLimit(`ai-policy-${session.user.id}`);
        if (!rateLimitSuccess) {
            return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        }

        const body = await req.json();
        const { organizationId, organizationDetails } = privacyPolicySchema.parse(body);

        // Verify user has access to organization
        const organizationUser = await prisma.organizationUser.findFirst({
            where: {
                userId: session.user.id,
                organizationId,
            },
        });

        if (!organizationUser) {
            return NextResponse.json({ error: 'Organization not found or access denied' }, { status: 403 });
        }

        // Get organization details
        const organization = await prisma.organization.findUnique({
            where: { id: organizationId },
            include: {
                dataProcesses: true,
            },
        });

        if (!organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        // Get data processing activities
        const dataProcesses = await prisma.dataProcess.findMany({
            where: {
                organizationId,
            },
        });

        // Generate privacy policy using AI
        const privacyPolicy = await aiService.generatePrivacyPolicy(
            organization.name,
            organizationDetails,
            dataProcesses
        );

        // Save policy to database
        const policy = await prisma.policy.create({
            data: {
                title: `Datenschutzerklärung - ${organization.name}`,
                content: privacyPolicy,
                version: '1.0',
                effectiveDate: new Date(),
                organizationId,
            },
        });

        // Log the action
        await prisma.auditLog.create({
            data: {
                action: 'GENERATE_PRIVACY_POLICY',
                entityId: policy.id,
                entityType: 'Policy',
                userId: session.user.id,
                organizationId,
                ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
                userAgent: req.headers.get('user-agent') || '',
            },
        });

        return NextResponse.json({ policy });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data', details: error.errors }, { status: 400 });
        }

        console.error('Error generating privacy policy:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
