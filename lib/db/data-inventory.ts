// Data Inventory Database Service

import { createClient } from '@/lib/db';
import { DataSource, DataAsset, DataClassification, DataFlow } from '@/app/types/data-inventory';

const supabase = createClient();

// Data Sources
export async function getDataSources(organizationId: string): Promise<DataSource[]> {
  const { data, error } = await supabase
    .from('data_sources')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as DataSource[];
}

export async function getDataSource(id: string, organizationId: string): Promise<DataSource | null> {
  const { data, error } = await supabase
    .from('data_sources')
    .select('*')
    .eq('id', id)
    .eq('organization_id', organizationId)
    .single();

  if (error) throw new Error(error.message);
  return data as DataSource;
}

export async function createDataSource(organizationId: string, dataSource: any): Promise<DataSource> {
  const { data, error } = await supabase
    .from('data_sources')
    .insert({
      ...dataSource,
      organization_id: organizationId
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataSource;
}

export async function updateDataSource(id: string, organizationId: string, updates: any): Promise<DataSource> {
  const { data, error } = await supabase
    .from('data_sources')
    .update(updates)
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataSource;
}

export async function deleteDataSource(id: string, organizationId: string): Promise<void> {
  const { error } = await supabase
    .from('data_sources')
    .delete()
    .eq('id', id)
    .eq('organization_id', organizationId);

  if (error) throw new Error(error.message);
}

// Data Assets
export async function getDataAssets(organizationId: string): Promise<DataAsset[]> {
  const { data, error } = await supabase
    .from('data_assets')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as DataAsset[];
}

export async function getDataAsset(id: string, organizationId: string): Promise<DataAsset | null> {
  const { data, error } = await supabase
    .from('data_assets')
    .select('*')
    .eq('id', id)
    .eq('organization_id', organizationId)
    .single();

  if (error) throw new Error(error.message);
  return data as DataAsset;
}

export async function createDataAsset(organizationId: string, dataAsset: any): Promise<DataAsset> {
  const { data, error } = await supabase
    .from('data_assets')
    .insert({
      ...dataAsset,
      organization_id: organizationId
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataAsset;
}

export async function updateDataAsset(id: string, organizationId: string, updates: any): Promise<DataAsset> {
  const { data, error } = await supabase
    .from('data_assets')
    .update(updates)
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataAsset;
}

export async function deleteDataAsset(id: string, organizationId: string): Promise<void> {
  const { error } = await supabase
    .from('data_assets')
    .delete()
    .eq('id', id)
    .eq('organization_id', organizationId);

  if (error) throw new Error(error.message);
}

// Data Classifications
export async function getDataClassifications(organizationId: string): Promise<DataClassification[]> {
  const { data, error } = await supabase
    .from('data_classifications')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as DataClassification[];
}

export async function getDataClassification(id: string, organizationId: string): Promise<DataClassification | null> {
  const { data, error } = await supabase
    .from('data_classifications')
    .select('*')
    .eq('id', id)
    .eq('organization_id', organizationId)
    .single();

  if (error) throw new Error(error.message);
  return data as DataClassification;
}

export async function createDataClassification(organizationId: string, dataClassification: any): Promise<DataClassification> {
  const { data, error } = await supabase
    .from('data_classifications')
    .insert({
      ...dataClassification,
      organization_id: organizationId
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataClassification;
}

export async function updateDataClassification(id: string, organizationId: string, updates: any): Promise<DataClassification> {
  const { data, error } = await supabase
    .from('data_classifications')
    .update(updates)
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataClassification;
}

export async function deleteDataClassification(id: string, organizationId: string): Promise<void> {
  const { error } = await supabase
    .from('data_classifications')
    .delete()
    .eq('id', id)
    .eq('organization_id', organizationId);

  if (error) throw new Error(error.message);
}

// Data Flows
export async function getDataFlows(organizationId: string): Promise<DataFlow[]> {
  const { data, error } = await supabase
    .from('data_flows')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as DataFlow[];
}

export async function getDataFlow(id: string, organizationId: string): Promise<DataFlow | null> {
  const { data, error } = await supabase
    .from('data_flows')
    .select('*')
    .eq('id', id)
    .eq('organization_id', organizationId)
    .single();

  if (error) throw new Error(error.message);
  return data as DataFlow;
}

export async function createDataFlow(organizationId: string, dataFlow: any): Promise<DataFlow> {
  const { data, error } = await supabase
    .from('data_flows')
    .insert({
      ...dataFlow,
      organization_id: organizationId
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataFlow;
}

export async function updateDataFlow(id: string, organizationId: string, updates: any): Promise<DataFlow> {
  const { data, error } = await supabase
    .from('data_flows')
    .update(updates)
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as DataFlow;
}

export async function deleteDataFlow(id: string, organizationId: string): Promise<void> {
  const { error } = await supabase
    .from('data_flows')
    .delete()
    .eq('id', id)
    .eq('organization_id', organizationId);

  if (error) throw new Error(error.message);
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
