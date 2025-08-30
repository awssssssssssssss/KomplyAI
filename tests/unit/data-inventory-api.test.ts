// Data Inventory API Tests

import { NextRequest } from 'next/server';
import * as dataInventoryRoutes from '@/app/api/data-inventory/sources/route';
import * as dataAssetsRoutes from '@/app/api/data-inventory/assets/route';
import * as dataClassificationsRoutes from '@/app/api/data-inventory/classifications/route';
import * as dataFlowsRoutes from '@/app/api/data-inventory/flows/route';
import { getServerSession } from 'next-auth/next';

// Mock next-auth
jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}));

// Mock the database service functions
jest.mock('@/lib/db/data-inventory', () => ({
  getDataSources: jest.fn(),
  getDataSource: jest.fn(),
  createDataSource: jest.fn(),
  updateDataSource: jest.fn(),
  deleteDataSource: jest.fn(),
  getDataAssets: jest.fn(),
  getDataAsset: jest.fn(),
  createDataAsset: jest.fn(),
  updateDataAsset: jest.fn(),
  deleteDataAsset: jest.fn(),
  getDataClassifications: jest.fn(),
  getDataClassification: jest.fn(),
  createDataClassification: jest.fn(),
  updateDataClassification: jest.fn(),
  deleteDataClassification: jest.fn(),
  getDataFlows: jest.fn(),
  getDataFlow: jest.fn(),
  createDataFlow: jest.fn(),
  updateDataFlow: jest.fn(),
  deleteDataFlow: jest.fn(),
  getDataFlowGraph: jest.fn(),
}));

// Mock auth utilities
jest.mock('@/lib/auth', () => ({
  validateOrganizationAccess: jest.fn().mockResolvedValue(true),
}));

// Import the mocked functions
const { getDataSources, getDataSource, createDataSource, updateDataSource, deleteDataSource } = require('@/lib/db/data-inventory');
const { getDataAssets, getDataAsset, createDataAsset, updateDataAsset, deleteDataAsset } = require('@/lib/db/data-inventory');
const { getDataClassifications, getDataClassification, createDataClassification, updateDataClassification, deleteDataClassification } = require('@/lib/db/data-inventory');
const { getDataFlows, getDataFlow, createDataFlow, updateDataFlow, deleteDataFlow, getDataFlowGraph } = require('@/lib/db/data-inventory');
const { validateOrganizationAccess } = require('@/lib/auth');

const mockSession = {
  user: {
    email: 'test@example.com',
    name: 'Test User',
  },
};

const mockOrganizationId = 'org-123';
const mockDataSource = {
  id: 'ds-123',
  organization_id: mockOrganizationId,
  name: 'Test Data Source',
  type: 'database',
  status: 'active',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockDataAsset = {
  id: 'da-123',
  organization_id: mockOrganizationId,
  data_source_id: 'ds-123',
  name: 'Test Data Asset',
  type: 'table',
  category: 'personal',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockDataClassification = {
  id: 'dc-123',
  organization_id: mockOrganizationId,
  data_asset_id: 'da-123',
  classification_type: 'pii',
  confidence_score: 0.95,
  reviewed: false,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockDataFlow = {
  id: 'df-123',
  organization_id: mockOrganizationId,
  source_asset_id: 'da-123',
  destination_asset_id: 'da-456',
  purpose: 'Data synchronization',
  frequency: 'daily',
  transfer_method: 'api',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

const mockGraphData = {
  nodes: [
    { id: 'da-123', name: 'Users Table', type: 'table', category: 'personal' },
    { id: 'da-456', name: 'Backup Table', type: 'table', category: 'personal' },
  ],
  edges: [
    { id: 'df-123', source: 'da-123', target: 'da-456', purpose: 'Backup', frequency: 'daily' },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
  (getServerSession as jest.Mock).mockResolvedValue(mockSession);
});

describe('Data Sources API', () => {
  describe('GET /api/data-inventory/sources', () => {
    it('should return data sources for an organization', async () => {
      (getDataSources as jest.Mock).mockResolvedValue([mockDataSource]);
      
      const url = new URL('http://localhost:3000/api/data-inventory/sources');
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString());
      const response = await dataInventoryRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual([mockDataSource]);
      expect(getDataSources).toHaveBeenCalledWith(mockOrganizationId);
    });
    
    it('should return 400 if organizationId is missing', async () => {
      const url = new URL('http://localhost:3000/api/data-inventory/sources');
      const request = new NextRequest(url.toString());
      const response = await dataInventoryRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Organization ID is required');
    });
    
    it('should return 401 if user is not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      
      const url = new URL('http://localhost:3000/api/data-inventory/sources');
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString());
      const response = await dataInventoryRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });
  });
  
  describe('POST /api/data-inventory/sources', () => {
    it('should create a new data source', async () => {
      (createDataSource as jest.Mock).mockResolvedValue(mockDataSource);
      
      const requestBody = {
        organizationId: mockOrganizationId,
        name: 'New Data Source',
        type: 'database',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/sources', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataInventoryRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual(mockDataSource);
      expect(createDataSource).toHaveBeenCalledWith(mockOrganizationId, {
        name: 'New Data Source',
        type: 'database',
      });
    });
    
    it('should return 400 if organizationId is missing', async () => {
      const requestBody = {
        name: 'New Data Source',
        type: 'database',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/sources', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataInventoryRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Organization ID is required');
    });
    
    it('should return 401 if user is not authenticated', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);
      
      const requestBody = {
        organizationId: mockOrganizationId,
        name: 'New Data Source',
        type: 'database',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/sources', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataInventoryRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });
  });
  
  describe('PUT /api/data-inventory/sources', () => {
    it('should update an existing data source', async () => {
      const updatedDataSource = { ...mockDataSource, name: 'Updated Data Source' };
      (updateDataSource as jest.Mock).mockResolvedValue(updatedDataSource);
      
      const requestBody = {
        id: mockDataSource.id,
        organizationId: mockOrganizationId,
        name: 'Updated Data Source',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/sources', {
        method: 'PUT',
        body: JSON.stringify(requestBody),
      });
      const response = await dataInventoryRoutes.PUT(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(updatedDataSource);
      expect(updateDataSource).toHaveBeenCalledWith(mockDataSource.id, mockOrganizationId, {
        name: 'Updated Data Source',
      });
    });
    
    it('should return 400 if id or organizationId is missing', async () => {
      const requestBody = {
        name: 'Updated Data Source',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/sources', {
        method: 'PUT',
        body: JSON.stringify(requestBody),
      });
      const response = await dataInventoryRoutes.PUT(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('ID and Organization ID are required');
    });
  });
  
  describe('DELETE /api/data-inventory/sources', () => {
    it('should delete a data source', async () => {
      (deleteDataSource as jest.Mock).mockResolvedValue(undefined);
      
      const url = new URL('http://localhost:3000/api/data-inventory/sources');
      url.searchParams.set('id', mockDataSource.id);
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString(), { method: 'DELETE' });
      const response = await dataInventoryRoutes.DELETE(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toBe('Data source deleted successfully');
      expect(deleteDataSource).toHaveBeenCalledWith(mockDataSource.id, mockOrganizationId);
    });
    
    it('should return 400 if id or organizationId is missing', async () => {
      const url = new URL('http://localhost:3000/api/data-inventory/sources');
      url.searchParams.set('id', mockDataSource.id);
      
      const request = new NextRequest(url.toString(), { method: 'DELETE' });
      const response = await dataInventoryRoutes.DELETE(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('ID and Organization ID are required');
    });
  });
});

describe('Data Assets API', () => {
  describe('GET /api/data-inventory/assets', () => {
    it('should return data assets for an organization', async () => {
      (getDataAssets as jest.Mock).mockResolvedValue([mockDataAsset]);
      
      const url = new URL('http://localhost:3000/api/data-inventory/assets');
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString());
      const response = await dataAssetsRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual([mockDataAsset]);
      expect(getDataAssets).toHaveBeenCalledWith(mockOrganizationId);
    });
    
    it('should filter data assets by data source', async () => {
      const mockAssets = [mockDataAsset];
      
      // Mock the Supabase client directly for this test
      const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockAssets, error: null }),
      };
      
      // Mock the default export from '@/lib/db'
      jest.mock('@/lib/db', () => ({
        __esModule: true,
        default: mockSupabase,
      }));
      
      const url = new URL('http://localhost:3000/api/data-inventory/assets');
      url.searchParams.set('organizationId', mockOrganizationId);
      url.searchParams.set('dataSourceId', 'ds-123');
      
      const request = new NextRequest(url.toString());
      const response = await dataAssetsRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockAssets);
    });
  });
  
  describe('POST /api/data-inventory/assets', () => {
    it('should create a new data asset', async () => {
      (createDataAsset as jest.Mock).mockResolvedValue(mockDataAsset);
      
      const requestBody = {
        organizationId: mockOrganizationId,
        data_source_id: 'ds-123',
        name: 'New Data Asset',
        type: 'table',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/assets', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataAssetsRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual(mockDataAsset);
      expect(createDataAsset).toHaveBeenCalledWith(mockOrganizationId, {
        data_source_id: 'ds-123',
        name: 'New Data Asset',
        type: 'table',
      });
    });
  });
});

describe('Data Classifications API', () => {
  describe('GET /api/data-inventory/classifications', () => {
    it('should return data classifications for an organization', async () => {
      (getDataClassifications as jest.Mock).mockResolvedValue([mockDataClassification]);
      
      const url = new URL('http://localhost:3000/api/data-inventory/classifications');
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString());
      const response = await dataClassificationsRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual([mockDataClassification]);
      expect(getDataClassifications).toHaveBeenCalledWith(mockOrganizationId);
    });
  });
  
  describe('POST /api/data-inventory/classifications', () => {
    it('should create a new data classification', async () => {
      (createDataClassification as jest.Mock).mockResolvedValue(mockDataClassification);
      
      const requestBody = {
        organizationId: mockOrganizationId,
        data_asset_id: 'da-123',
        classification_type: 'pii',
        confidence_score: 0.95,
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/classifications', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataClassificationsRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual(mockDataClassification);
      expect(createDataClassification).toHaveBeenCalledWith(mockOrganizationId, {
        data_asset_id: 'da-123',
        classification_type: 'pii',
        confidence_score: 0.95,
      });
    });
  });
});

describe('Data Flows API', () => {
  describe('GET /api/data-inventory/flows', () => {
    it('should return data flows for an organization', async () => {
      (getDataFlows as jest.Mock).mockResolvedValue([mockDataFlow]);
      
      const url = new URL('http://localhost:3000/api/data-inventory/flows');
      url.searchParams.set('organizationId', mockOrganizationId);
      
      const request = new NextRequest(url.toString());
      const response = await dataFlowsRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual([mockDataFlow]);
      expect(getDataFlows).toHaveBeenCalledWith(mockOrganizationId);
    });
    
    it('should return graph data when graph parameter is true', async () => {
      (getDataFlowGraph as jest.Mock).mockResolvedValue(mockGraphData);
      
      const url = new URL('http://localhost:3000/api/data-inventory/flows');
      url.searchParams.set('organizationId', mockOrganizationId);
      url.searchParams.set('graph', 'true');
      
      const request = new NextRequest(url.toString());
      const response = await dataFlowsRoutes.GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual(mockGraphData);
      expect(getDataFlowGraph).toHaveBeenCalledWith(mockOrganizationId);
    });
  });
  
  describe('POST /api/data-inventory/flows', () => {
    it('should create a new data flow', async () => {
      (createDataFlow as jest.Mock).mockResolvedValue(mockDataFlow);
      
      const requestBody = {
        organizationId: mockOrganizationId,
        source_asset_id: 'da-123',
        destination_asset_id: 'da-456',
        purpose: 'Data synchronization',
        frequency: 'daily',
      };
      
      const request = new NextRequest('http://localhost:3000/api/data-inventory/flows', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      const response = await dataFlowsRoutes.POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(201);
      expect(data).toEqual(mockDataFlow);
      expect(createDataFlow).toHaveBeenCalledWith(mockOrganizationId, {
        source_asset_id: 'da-123',
        destination_asset_id: 'da-456',
        purpose: 'Data synchronization',
        frequency: 'daily',
      });
    });
  });
});
