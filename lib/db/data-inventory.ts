// Data Inventory Database Service (Mock Implementation)

import { DataSource, DataAsset, DataClassification, DataFlow } from '@/app/types/data-inventory';

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
    description: 'Contains customer personal information',
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
    description: 'Contains order and payment information',
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
  }
];

// Data Sources
export async function getDataSources(organizationId: string): Promise<DataSource[]> {
  return mockDataSources.filter(source => source.organization_id === organizationId);
}

export async function getDataSource(id: string, organizationId: string): Promise<DataSource | null> {
  return mockDataSources.find(source => source.id === id && source.organization_id === organizationId) || null;
}

export async function createDataSource(organizationId: string, dataSource: any): Promise<DataSource> {
  const newDataSource: DataSource = {
    id: `mock-source-${Date.now()}`,
    organization_id: organizationId,
    ...dataSource,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataSources.push(newDataSource);
  return newDataSource;
}

export async function updateDataSource(id: string, organizationId: string, updates: any): Promise<DataSource> {
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

export async function createDataAsset(organizationId: string, dataAsset: any): Promise<DataAsset> {
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

export async function updateDataAsset(id: string, organizationId: string, updates: any): Promise<DataAsset> {
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

export async function createDataClassification(organizationId: string, dataClassification: any): Promise<DataClassification> {
  const newDataClassification: DataClassification = {
    id: `mock-classification-${Date.now()}`,
    organization_id: organizationId,
    ...dataClassification,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDataClassifications.push(newDataClassification);
  return newDataClassification;
}

export async function updateDataClassification(id: string, organizationId: string, updates: any): Promise<DataClassification> {
  const index = mockDataClassifications.findIndex(classification => classification.id === id && classification.organization_id === organizationId);
  if (index === -1) throw new Error('Data classification not found');
  
  mockDataClassifications[index] = {
    ...mockDataClassifications[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  return mockDataClassifications[index];
}

export async function deleteDataClassification(id: string, organizationId: string): Promise<void> {
  const index = mockDataClassifications.findIndex(classification => classification.id === id && classification.organization_id === organizationId);
  if (index === -1) throw new Error('Data classification not found');
  
  mockDataClassifications.splice(index, 1);
}

// Data Flows
export async function getDataFlows(organizationId: string): Promise<DataFlow[]> {
  return mockDataFlows.filter(flow => flow.organization_id === organizationId);
}

export async function getDataFlow(id: string, organizationId: string): Promise<DataFlow | null> {
  return mockDataFlows.find(flow => flow.id === id && flow.organization_id === organizationId) || null;
}

export async function createDataFlow(organizationId: string, dataFlow: any): Promise<DataFlow> {
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

export async function updateDataFlow(id: string, organizationId: string, updates: any): Promise<DataFlow> {
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
