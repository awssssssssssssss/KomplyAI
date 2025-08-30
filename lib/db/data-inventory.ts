// Data Inventory Database Service (Mock Implementation)

import { DataSource, DataAsset, DataClassification, DataFlow, AuditLog, CreateDataSourceRequest, UpdateDataSourceRequest, CreateDataAssetRequest, UpdateDataAssetRequest, CreateDataClassificationRequest, UpdateDataClassificationRequest, CreateDataFlowRequest, UpdateDataFlowRequest } from '@/app/types/data-inventory';

// Validation functions
function validateDataSource(data: any): data is DataSource {
  return (
    typeof data.id === 'string' &&
    typeof data.organization_id === 'string' &&
    typeof data.name === 'string' &&
    ['database', 'file_system', 'api', 'cloud_storage', 'other'].includes(data.type) &&
    ['active', 'inactive', 'error'].includes(data.status) &&
    typeof data.created_at === 'string' &&
    typeof data.updated_at === 'string'
  );
}

function validateDataAsset(data: any): data is DataAsset {
  return (
    typeof data.id === 'string' &&
    typeof data.organization_id === 'string' &&
    typeof data.name === 'string' &&
    ['table', 'collection', 'file', 'field', 'folder', 'bucket', 'other'].includes(data.type) &&
    (!data.category || ['personal', 'sensitive', 'financial', 'operational', 'other'].includes(data.category)) &&
    typeof data.created_at === 'string' &&
    typeof data.updated_at === 'string'
  );
}

function validateDataClassification(data: any): data is DataClassification {
  return (
    typeof data.id === 'string' &&
    typeof data.organization_id === 'string' &&
    typeof data.data_asset_id === 'string' &&
    ['pii', 'sensitive_personal', 'financial', 'health', 'other'].includes(data.classification_type) &&
    typeof data.reviewed === 'boolean' &&
    typeof data.created_at === 'string' &&
    typeof data.updated_at === 'string'
  );
}

function validateDataFlow(data: any): data is DataFlow {
  return (
    typeof data.id === 'string' &&
    typeof data.organization_id === 'string' &&
    typeof data.source_asset_id === 'string' &&
    typeof data.destination_asset_id === 'string' &&
    typeof data.created_at === 'string' &&
    typeof data.updated_at === 'string'
  );
}

function validateCreateDataSourceRequest(data: any): data is CreateDataSourceRequest {
  return (
    typeof data.name === 'string' &&
    data.name.length > 0 &&
    ['database', 'file_system', 'api', 'cloud_storage', 'other'].includes(data.type)
  );
}

function validateUpdateDataSourceRequest(data: any): data is UpdateDataSourceRequest {
  return (
    (!data.name || typeof data.name === 'string') &&
    (!data.status || ['active', 'inactive', 'error'].includes(data.status))
  );
}

function validateCreateDataAssetRequest(data: any): data is CreateDataAssetRequest {
  return (
    typeof data.name === 'string' &&
    data.name.length > 0 &&
    ['table', 'collection', 'file', 'field', 'folder', 'bucket', 'other'].includes(data.type)
  );
}

function validateUpdateDataAssetRequest(data: any): data is UpdateDataAssetRequest {
  return (
    (!data.name || typeof data.name === 'string') &&
    (!data.category || ['personal', 'sensitive', 'financial', 'operational', 'other'].includes(data.category))
  );
}

function validateCreateDataClassificationRequest(data: any): data is CreateDataClassificationRequest {
  return (
    typeof data.data_asset_id === 'string' &&
    ['pii', 'sensitive_personal', 'financial', 'health', 'other'].includes(data.classification_type)
  );
}

function validateUpdateDataClassificationRequest(data: any): data is UpdateDataClassificationRequest {
  return (
    (!data.classification_type || ['pii', 'sensitive_personal', 'financial', 'health', 'other'].includes(data.classification_type)) &&
    (!data.confidence_score || (typeof data.confidence_score === 'number' && data.confidence_score >= 0 && data.confidence_score <= 1)) &&
    (!data.reviewed || typeof data.reviewed === 'boolean')
  );
}

function validateCreateDataFlowRequest(data: any): data is CreateDataFlowRequest {
  return (
    typeof data.source_asset_id === 'string' &&
    typeof data.destination_asset_id === 'string' &&
    data.source_asset_id !== data.destination_asset_id
  );
}

function validateUpdateDataFlowRequest(data: any): data is UpdateDataFlowRequest {
  return (
    (!data.frequency || ['real_time', 'hourly', 'daily', 'weekly', 'monthly', 'on_demand', 'other'].includes(data.frequency)) &&
    (!data.transfer_method || ['api', 'file_transfer', 'database_sync', 'manual', 'other'].includes(data.transfer_method))
  );
}

// Mock data
const mockDataSources: DataSource[] = [
  {
    id: 'mock-source-1',
    organization_id: 'mock-org-id',
    name: 'Customer Database',
    type: 'database',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-source-2',
    organization_id: 'mock-org-id',
    name: 'User Files',
    type: 'file_system',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-source-3',
    organization_id: 'mock-org-id',
    name: 'Payment Processing API',
    type: 'api',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-source-4',
    organization_id: 'mock-org-id',
    name: 'Cloud Storage',
    type: 'cloud_storage',
    status: 'inactive',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockDataAssets: DataAsset[] = [
  {
    id: 'mock-asset-1',
    organization_id: 'mock-org-id',
    data_source_id: 'mock-source-1',
    name: 'Customer Table',
    type: 'table',
    category: 'personal',
    description: 'Contains customer personal information including names, emails, and addresses',
    size_bytes: 1024000,
    row_count: 15000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-asset-2',
    organization_id: 'mock-org-id',
    data_source_id: 'mock-source-1',
    name: 'Order Table',
    type: 'table',
    category: 'financial',
    description: 'Contains order and payment information including transaction IDs and amounts',
    size_bytes: 512000,
    row_count: 8500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-asset-3',
    organization_id: 'mock-org-id',
    data_source_id: 'mock-source-2',
    name: 'User Documents',
    type: 'folder',
    category: 'personal',
    description: 'Collection of user uploaded documents and files',
    size_bytes: 2048000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-asset-4',
    organization_id: 'mock-org-id',
    data_source_id: 'mock-source-3',
    name: 'Payment Records',
    type: 'collection',
    category: 'financial',
    description: 'API response data containing payment transaction records',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-asset-5',
    organization_id: 'mock-org-id',
    data_source_id: 'mock-source-1',
    name: 'Employee Data',
    type: 'table',
    category: 'sensitive',
    description: 'Internal employee information including salaries and performance reviews',
    size_bytes: 256000,
    row_count: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockDataClassifications: DataClassification[] = [
  {
    id: 'mock-classification-1',
    organization_id: 'mock-org-id',
    data_asset_id: 'mock-asset-1',
    classification_type: 'pii',
    confidence_score: 0.95,
    detected_fields: { name: 'high', email: 'high', phone: 'medium' },
    reviewed: true,
    reviewed_by: 'test@example.com',
    reviewed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-classification-2',
    organization_id: 'mock-org-id',
    data_asset_id: 'mock-asset-2',
    classification_type: 'financial',
    confidence_score: 0.98,
    detected_fields: { transaction_id: 'high', amount: 'high', currency: 'medium' },
    reviewed: true,
    reviewed_by: 'test@example.com',
    reviewed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-classification-3',
    organization_id: 'mock-org-id',
    data_asset_id: 'mock-asset-5',
    classification_type: 'sensitive_personal',
    confidence_score: 0.92,
    detected_fields: { salary: 'high', performance_review: 'high' },
    reviewed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockDataFlows: DataFlow[] = [
  {
    id: 'mock-flow-1',
    organization_id: 'mock-org-id',
    source_asset_id: 'mock-asset-1',
    destination_asset_id: 'mock-asset-2',
    purpose: 'Data synchronization',
    frequency: 'daily',
    transfer_method: 'database_sync',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-flow-2',
    organization_id: 'mock-org-id',
    source_asset_id: 'mock-asset-1',
    destination_asset_id: 'mock-asset-3',
    purpose: 'Backup customer data',
    frequency: 'weekly',
    transfer_method: 'file_transfer',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-flow-3',
    organization_id: 'mock-org-id',
    source_asset_id: 'mock-asset-4',
    destination_asset_id: 'mock-asset-2',
    purpose: 'Payment data integration',
    frequency: 'real_time',
    transfer_method: 'api',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-flow-4',
    organization_id: 'mock-org-id',
    source_asset_id: 'mock-asset-5',
    destination_asset_id: 'mock-asset-1',
    purpose: 'Employee-customer mapping',
    frequency: 'monthly',
    transfer_method: 'database_sync',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: 'mock-audit-1',
    action: 'CREATE',
    entity_type: 'DataSource',
    entity_id: 'mock-source-1',
    user_id: 'mock-user-1',
    organization_id: 'mock-org-id',
    details: { name: 'Customer Database', type: 'database' },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 'mock-audit-2',
    action: 'CLASSIFY',
    entity_type: 'DataAsset',
    entity_id: 'mock-asset-1',
    user_id: 'mock-user-1',
    organization_id: 'mock-org-id',
    details: { classification_type: 'pii', confidence_score: 0.95 },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: 'mock-audit-3',
    action: 'UPDATE',
    entity_type: 'DataAsset',
    entity_id: 'mock-asset-5',
    user_id: 'mock-user-1',
    organization_id: 'mock-org-id',
    details: { category: 'sensitive' },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: 'mock-audit-4',
    action: 'CREATE',
    entity_type: 'DataFlow',
    entity_id: 'mock-flow-3',
    user_id: 'mock-user-1',
    organization_id: 'mock-org-id',
    details: { purpose: 'Payment data integration', frequency: 'real_time' },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: 'mock-audit-5',
    action: 'DELETE',
    entity_type: 'DataClassification',
    entity_id: 'mock-classification-old',
    user_id: 'mock-user-1',
    organization_id: 'mock-org-id',
    details: { reason: 'Reclassification required' },
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  }
];

// Data Sources
export async function getDataSources(organizationId: string): Promise<DataSource[]> {
  return mockDataSources.filter(source => source.organization_id === organizationId);
}

export async function getDataSource(id: string, organizationId: string): Promise<DataSource | null> {
  return mockDataSources.find(source => source.id === id && source.organization_id === organizationId) || null;
}

export async function createDataSource(organizationId: string, dataSource: CreateDataSourceRequest): Promise<DataSource> {
  if (!validateCreateDataSourceRequest(dataSource)) {
    throw new Error('Invalid data source data');
  }
  
  const newDataSource: DataSource = {
    id: `mock-source-${Date.now()}`,
    organization_id: organizationId,
    ...dataSource,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataSources.push(newDataSource);
  return newDataSource;
}

export async function updateDataSource(id: string, organizationId: string, updates: UpdateDataSourceRequest): Promise<DataSource> {
  if (!validateUpdateDataSourceRequest(updates)) {
    throw new Error('Invalid data source update data');
  }
  
  const index = mockDataSources.findIndex(source => source.id === id && source.organization_id === organizationId);
  if (index === -1) throw new Error('Data source not found');
  
  mockDataSources[index] = {
    ...mockDataSources[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return mockDataSources[index];
}

export async function deleteDataSource(id: string, organizationId: string): Promise<void> {
  const index = mockDataSources.findIndex(source => source.id === id && source.organization_id === organizationId);
  if (index === -1) throw new Error('Data source not found');
  
  mockDataSources.splice(index, 1);
}

// Data Assets
export async function getDataAssets(organizationId: string): Promise<DataAsset[]> {
  return mockDataAssets.filter(asset => asset.organization_id === organizationId);
}

export async function getDataAsset(id: string, organizationId: string): Promise<DataAsset | null> {
  return mockDataAssets.find(asset => asset.id === id && asset.organization_id === organizationId) || null;
}

export async function createDataAsset(organizationId: string, dataAsset: CreateDataAssetRequest): Promise<DataAsset> {
  if (!validateCreateDataAssetRequest(dataAsset)) {
    throw new Error('Invalid data asset data');
  }
  
  const newDataAsset: DataAsset = {
    id: `mock-asset-${Date.now()}`,
    organization_id: organizationId,
    ...dataAsset,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataAssets.push(newDataAsset);
  return newDataAsset;
}

export async function updateDataAsset(id: string, organizationId: string, updates: UpdateDataAssetRequest): Promise<DataAsset> {
  if (!validateUpdateDataAssetRequest(updates)) {
    throw new Error('Invalid data asset update data');
  }
  
  const index = mockDataAssets.findIndex(asset => asset.id === id && asset.organization_id === organizationId);
  if (index === -1) throw new Error('Data asset not found');
  
  mockDataAssets[index] = {
    ...mockDataAssets[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return mockDataAssets[index];
}

export async function deleteDataAsset(id: string, organizationId: string): Promise<void> {
  const index = mockDataAssets.findIndex(asset => asset.id === id && asset.organization_id === organizationId);
  if (index === -1) throw new Error('Data asset not found');
  
  mockDataAssets.splice(index, 1);
}

// Data Classifications
export async function getDataClassifications(organizationId: string): Promise<DataClassification[]> {
  return mockDataClassifications.filter(classification => classification.organization_id === organizationId);
}

export async function getDataClassification(id: string, organizationId: string): Promise<DataClassification | null> {
  return mockDataClassifications.find(classification => classification.id === id && classification.organization_id === organizationId) || null;
}

export async function createDataClassification(organizationId: string, dataClassification: CreateDataClassificationRequest): Promise<DataClassification> {
  if (!validateCreateDataClassificationRequest(dataClassification)) {
    throw new Error('Invalid data classification data');
  }
  
  const newDataClassification: DataClassification = {
    id: `mock-classification-${Date.now()}`,
    organization_id: organizationId,
    ...dataClassification,
    reviewed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataClassifications.push(newDataClassification);
  return newDataClassification;
}


export async function deleteDataClassification(id: string, organizationId: string): Promise<void> {
  const index = mockDataClassifications.findIndex(classification => classification.id === id && classification.organization_id === organizationId);
  if (index === -1) throw new Error('Data classification not found');
  
  mockDataClassifications.splice(index, 1);
}

export async function updateDataClassification(id: string, organizationId: string, updates: UpdateDataClassificationRequest): Promise<DataClassification> {
  if (!validateUpdateDataClassificationRequest(updates)) {
    throw new Error('Invalid data classification update data');
  }
  
  const index = mockDataClassifications.findIndex(classification => classification.id === id && classification.organization_id === organizationId);
  if (index === -1) throw new Error('Data classification not found');
  
  mockDataClassifications[index] = {
    ...mockDataClassifications[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return mockDataClassifications[index];
}

// Data Flows
export async function getDataFlows(organizationId: string): Promise<DataFlow[]> {
  return mockDataFlows.filter(flow => flow.organization_id === organizationId);
}

export async function getDataFlow(id: string, organizationId: string): Promise<DataFlow | null> {
  return mockDataFlows.find(flow => flow.id === id && flow.organization_id === organizationId) || null;
}

export async function createDataFlow(organizationId: string, dataFlow: CreateDataFlowRequest): Promise<DataFlow> {
  if (!validateCreateDataFlowRequest(dataFlow)) {
    throw new Error('Invalid data flow data');
  }
  
  const newDataFlow: DataFlow = {
    id: `mock-flow-${Date.now()}`,
    organization_id: organizationId,
    ...dataFlow,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataFlows.push(newDataFlow);
  return newDataFlow;
}

export async function updateDataFlow(id: string, organizationId: string, updates: UpdateDataFlowRequest): Promise<DataFlow> {
  if (!validateUpdateDataFlowRequest(updates)) {
    throw new Error('Invalid data flow update data');
  }
  
  const index = mockDataFlows.findIndex(flow => flow.id === id && flow.organization_id === organizationId);
  if (index === -1) throw new Error('Data flow not found');
  
  mockDataFlows[index] = {
    ...mockDataFlows[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return mockDataFlows[index];
}

export async function deleteDataFlow(id: string, organizationId: string): Promise<void> {
  const index = mockDataFlows.findIndex(flow => flow.id === id && flow.organization_id === organizationId);
  if (index === -1) throw new Error('Data flow not found');
  
  mockDataFlows.splice(index, 1);
}

// Audit Logs
export async function getAuditLogs(organizationId: string, limit: number = 50): Promise<AuditLog[]> {
  return mockAuditLogs
    .filter(log => log.organization_id === organizationId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export async function getAuditLog(id: string, organizationId: string): Promise<AuditLog | null> {
  return mockAuditLogs.find(log => log.id === id && log.organization_id === organizationId) || null;
}

export async function createAuditLog(organizationId: string, auditLog: Omit<AuditLog, 'id' | 'organization_id' | 'created_at'>): Promise<AuditLog> {
  const newAuditLog: AuditLog = {
    id: `mock-audit-${Date.now()}`,
    organization_id: organizationId,
    ...auditLog,
    created_at: new Date().toISOString()
  };
  mockAuditLogs.push(newAuditLog);
  return newAuditLog;
}

// Helper functions for data mapping visualization
export async function getDataFlowGraph(organizationId: string) {
  // Get all data assets for the organization
  const assets = await getDataAssets(organizationId);
  
  // Get all data flows for the organization
  const flows = await getDataFlows(organizationId);
  
  // Create a graph structure for visualization
  return {
    nodes: assets.map(asset => ({
      id: asset.id,
      name: asset.name,
      type: asset.type,
      category: asset.category
    })),
    edges: flows.map(flow => ({
      id: flow.id,
      source: flow.source_asset_id,
      target: flow.destination_asset_id,
      purpose: flow.purpose,
      frequency: flow.frequency
    }))
  };
}
