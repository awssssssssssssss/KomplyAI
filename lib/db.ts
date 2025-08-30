// Database utilities for local development
// No real database required for proof of concept

// Mock supabase client for local development
export const supabase = {
  from: (table: string) => ({
    select: (fields?: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({
          data: getMockData(table, column, value),
          error: null
        }),
        eq: (column2: string, value2: any) => ({
          single: async () => ({
            data: getMockData(table, column, value, column2, value2),
            error: null
          })
        })
      }),
      single: async () => ({
        data: getMockData(table),
        error: null
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({
          data: { ...data, id: 'mock-id-' + Date.now() },
          error: null
        })
      })
    })
  })
};

// Helper function to generate mock data based on table and query
function getMockData(table: string, column1?: string, value1?: any, column2?: string, value2?: any) {
  switch (table) {
    case 'organization_users':
      return {
        id: 'mock-org-user-id',
        user_id: 'test@example.com',
        organization_id: 'mock-org-id',
        role: 'owner'
      };
    case 'organizations':
      return {
        id: 'mock-org-id',
        name: 'Test Organization',
        address: '123 Test Street, Berlin, Germany',
        contact_email: 'contact@test-org.com',
        data_processes: [
          {
            id: 'mock-process-1',
            name: 'Customer Data Processing',
            purpose: 'To provide our services to customers',
            data_categories: ['personal', 'contact', 'financial'],
            data_subjects: ['customers'],
            retention_period: '2 years',
            legal_basis: 'contract_performance',
            third_parties: ['payment_processor'],
            security_measures: 'encrypted_storage'
          }
        ]
      };
    case 'data_processes':
      return [
        {
          id: 'mock-process-1',
          organization_id: 'mock-org-id',
          name: 'Customer Data Processing',
          purpose: 'To provide our services to customers',
          data_categories: ['personal', 'contact', 'financial'],
          data_subjects: ['customers'],
          retention_period: '2 years',
          legal_basis: 'contract_performance',
          third_parties: ['payment_processor'],
          security_measures: 'encrypted_storage'
        }
      ];
    case 'policies':
      return {
        id: 'mock-policy-id',
        title: 'Datenschutzerklärung - Test Organization',
        content: 'This is a mock privacy policy generated for testing purposes.',
        version: '1.0',
        effective_date: new Date().toISOString(),
        organization_id: 'mock-org-id'
      };
    case 'audit_logs':
      return {
        id: 'mock-audit-id',
        action: 'GENERATE_PRIVACY_POLICY',
        entity_id: 'mock-policy-id',
        entity_type: 'Policy',
        user_id: 'test@example.com',
        organization_id: 'mock-org-id',
        ip_address: '127.0.0.1',
        user_agent: 'Test Agent'
      };
    default:
      return {};
  }
}

export async function getUser(id: string) {
  // Return mock user data for local development
  return {
    id: 'mock-user-id',
    email: 'test@example.com',
    name: 'Test User',
  };
}

export async function getOrganization(id: string) {
  // Return mock organization data for local development
  return {
    id: 'mock-org-id',
    name: 'Test Organization',
    address: '123 Test Street, Berlin, Germany',
    contact_email: 'contact@test-org.com',
  };
}

export async function getDataProcesses(organizationId: string) {
  // Return mock data processes for local development
  return [
    {
      id: 'mock-process-1',
      organization_id: 'mock-org-id',
      name: 'Customer Data Processing',
      purpose: 'To provide our services to customers',
      data_categories: ['personal', 'contact', 'financial'],
      data_subjects: ['customers'],
      retention_period: '2 years',
      legal_basis: 'contract_performance',
      third_parties: ['payment_processor'],
      security_measures: 'encrypted_storage'
    }
  ];
}
