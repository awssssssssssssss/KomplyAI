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
          }),
          order: (column: string, options: { ascending: boolean }) => ({
            single: async () => ({
              data: getMockData(table, column, value, column2, value2),
              error: null
            })
          })
        }),
        order: (column: string, options: { ascending: boolean }) => ({
          single: async () => ({
            data: getMockData(table, column, value),
            error: null
          })
        })
      }),
      single: async () => ({
        data: getMockData(table),
        error: null
      }),
      order: (column: string, options: { ascending: boolean }) => ({
        single: async () => ({
          data: getMockData(table),
          error: null
        })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({
          data: { ...data, id: 'mock-id-' + Date.now() },
          error: null
        })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: async () => ({
            data: { ...data, id: 'mock-id' },
            error: null
          })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: async () => ({
            data: null,
            error: null
          })
        })
      })
    })
  })
};

// Export a createClient function that returns the mock supabase client
export function createClient() {
  return supabase;
}

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
    case 'data_sources':
      // Return mock data sources
      return [
        {
          id: 'mock-source-1',
          organization_id: value1 || 'mock-org-id',
          name: 'Customer Database',
          type: 'database',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'mock-source-2',
          organization_id: value1 || 'mock-org-id',
          name: 'User Files',
          type: 'file_system',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    case 'data_assets':
      // Return mock data assets
      return [
        {
          id: 'mock-asset-1',
          organization_id: value1 || 'mock-org-id',
          data_source_id: 'mock-source-1',
          name: 'Customer Table',
          type: 'table',
          category: 'personal',
          description: 'Contains customer personal information',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'mock-asset-2',
          organization_id: value1 || 'mock-org-id',
          data_source_id: 'mock-source-1',
          name: 'Order Table',
          type: 'table',
          category: 'financial',
          description: 'Contains order and payment information',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    case 'data_classifications':
      // Return mock data classifications
      return [
        {
          id: 'mock-classification-1',
          organization_id: value1 || 'mock-org-id',
          data_asset_id: 'mock-asset-1',
          classification_type: 'pii',
          confidence_score: 0.95,
          detected_fields: { name: 'high', email: 'high', phone: 'medium' },
          reviewed: true,
          reviewed_by: 'test@example.com',
          reviewed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    case 'data_flows':
      // Return mock data flows
      return [
        {
          id: 'mock-flow-1',
          organization_id: value1 || 'mock-org-id',
          source_asset_id: 'mock-asset-1',
          destination_asset_id: 'mock-asset-2',
          purpose: 'Data synchronization',
          frequency: 'daily',
          transfer_method: 'database_sync',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
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
