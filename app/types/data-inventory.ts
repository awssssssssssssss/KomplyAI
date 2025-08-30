// Data Inventory Types

export interface DataSource {
  id: string;
  organization_id: string;
  name: string;
  type: 'database' | 'file_system' | 'api' | 'cloud_storage' | 'other';
  connection_details?: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
  last_scanned_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DataAsset {
  id: string;
  organization_id: string;
  data_source_id?: string;
  name: string;
  path?: string;
  type: 'table' | 'collection' | 'file' | 'field' | 'folder' | 'bucket' | 'other';
  category?: 'personal' | 'sensitive' | 'financial' | 'operational' | 'other';
  description?: string;
  size_bytes?: number;
  row_count?: number;
  last_accessed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DataClassification {
  id: string;
  organization_id: string;
  data_asset_id: string;
  classification_type: 'pii' | 'sensitive_personal' | 'financial' | 'health' | 'other';
  confidence_score?: number;
  detected_fields?: Record<string, any>;
  reviewed: boolean;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DataFlow {
  id: string;
  organization_id: string;
  source_asset_id: string;
  destination_asset_id: string;
  purpose?: string;
  frequency?: 'real_time' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'on_demand' | 'other';
  transfer_method?: 'api' | 'file_transfer' | 'database_sync' | 'manual' | 'other';
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'CLASSIFY' | 'SCAN' | 'EXPORT' | 'IMPORT';
  entity_type: 'DataSource' | 'DataAsset' | 'DataClassification' | 'DataFlow' | 'Policy' | 'Consent';
  entity_id: string;
  user_id: string;
  organization_id: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Request/Response Types

export interface CreateDataSourceRequest {
  name: string;
  type: DataSource['type'];
  connection_details?: Record<string, any>;
}

export interface UpdateDataSourceRequest {
  name?: string;
  status?: DataSource['status'];
  connection_details?: Record<string, any>;
}

export interface CreateDataAssetRequest {
  data_source_id?: string;
  name: string;
  type: DataAsset['type'];
  category?: DataAsset['category'];
  description?: string;
}

export interface UpdateDataAssetRequest {
  name?: string;
  category?: DataAsset['category'];
  description?: string;
}

export interface CreateDataClassificationRequest {
  data_asset_id: string;
  classification_type: DataClassification['classification_type'];
  confidence_score?: number;
  detected_fields?: Record<string, any>;
}

export interface UpdateDataClassificationRequest {
  classification_type?: DataClassification['classification_type'];
  confidence_score?: number;
  detected_fields?: Record<string, any>;
  reviewed?: boolean;
}

export interface CreateDataFlowRequest {
  source_asset_id: string;
  destination_asset_id: string;
  purpose?: string;
  frequency?: DataFlow['frequency'];
  transfer_method?: DataFlow['transfer_method'];
}

export interface UpdateDataFlowRequest {
  purpose?: string;
  frequency?: DataFlow['frequency'];
  transfer_method?: DataFlow['transfer_method'];
}
