import { POST } from '../../app/api/ai/privacy-policy/route';
import { NextRequest } from 'next/server';

// Mock authentication utilities
jest.mock('../../lib/auth', () => ({
  getServerSession: jest.fn(),
}));

const mockGetServerSession = require('../../lib/auth').getServerSession;

// Mock AI service
jest.mock('../../lib/ai', () => ({
  aiService: {
    generatePrivacyPolicy: jest.fn(),
    checkRateLimit: jest.fn(),
  },
}));

const mockAiService = require('../../lib/ai').aiService;

// Mock database
jest.mock('../../lib/db', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('Privacy Policy API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a privacy policy with valid input', async () => {
    // Mock authenticated user
    mockGetServerSession.mockResolvedValue({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    });
    
    // Mock AI service responses
    mockAiService.generatePrivacyPolicy.mockResolvedValue('Generated privacy policy content');
    mockAiService.checkRateLimit.mockResolvedValue(true);
    
    // Setup specific mock responses
    const mockDb = require('../../lib/db').supabase;
    
    // Helper function to create a mock query with chained methods
    const createMockQuery = (result: any = null) => ({
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue(result || { data: null, error: null }),
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
    });
    
    // Mock organization_users query
    mockDb.from.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            single: () => Promise.resolve({
              data: {
                user_id: 'test@example.com',
                organization_id: 'mock-org-id',
              },
              error: null,
            }),
          }),
        }),
      }),
    }));
    
    // Mock organizations query
    mockDb.from.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({
            data: {
              id: 'mock-org-id',
              name: 'Test Org',
            },
            error: null,
          }),
        }),
      }),
    }));
    
    // Mock data_processes query
    mockDb.from.mockImplementationOnce(() => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({
            data: [],
            error: null,
          }),
        }),
      }),
    }));
    
    // Mock policies insert
    mockDb.from.mockImplementationOnce(() => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({
            data: {
              id: 'policy-id',
              content: 'Generated privacy policy content',
            },
            error: null,
          }),
        }),
      }),
    }));
    
    // Mock audit_logs insert
    mockDb.from.mockImplementationOnce(() => ({
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({
            data: null,
            error: null,
          }),
        }),
      }),
    }));
    
    // Create a mock NextRequest
    const mockRequest = {
      json: async () => ({
        organizationId: 'mock-org-id',
        organizationDetails: 'Test organization details',
      }),
      headers: {
        get: (name: string) => {
          if (name === 'x-forwarded-for') return '127.0.0.1';
          if (name === 'user-agent') return 'test-agent';
          return null;
        },
      },
    } as unknown as NextRequest;

    const response: any = await POST(mockRequest);
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    
    const jsonResponse = await response.json();
    expect(jsonResponse.policy).toBeDefined();
    expect(jsonResponse.policy.content).toBeDefined();
    expect(typeof jsonResponse.policy.content).toBe('string');
    expect(jsonResponse.policy.content.length).toBeGreaterThan(0);
  });

  it('should return 400 for invalid input', async () => {
    // Mock authenticated user
    mockGetServerSession.mockResolvedValue({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    });
    
    // Mock AI service responses
    mockAiService.checkRateLimit.mockResolvedValue(true);
    
    // Create a mock NextRequest with invalid data
    const mockRequest = {
      json: async () => ({
        invalidField: 'test',
      }),
      headers: {
        get: (name: string) => null,
      },
    } as unknown as NextRequest;

    const response: any = await POST(mockRequest);
    expect(response).toBeDefined();
    expect(response.status).toBe(400);
    
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBeDefined();
  });

  it('should return 401 for unauthorized access', async () => {
    // Mock unauthenticated user
    mockGetServerSession.mockResolvedValue(null);
    
    // Create a mock NextRequest
    const mockRequest = {
      json: async () => ({
        organizationId: 'mock-org-id',
        organizationDetails: 'Test organization details',
      }),
      headers: {
        get: (name: string) => null,
      },
    } as unknown as NextRequest;

    const response: any = await POST(mockRequest);
    expect(response).toBeDefined();
    expect(response.status).toBe(401);
    
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe('Unauthorized');
  });
});
