-- Data Inventory Schema

-- Data Sources Table
create table data_sources (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) not null,
  name varchar(255) not null,
  type varchar(50) not null, -- database, file_system, api, etc.
  connection_details jsonb,
  status varchar(20) default 'active', -- active, inactive, error
  last_scanned_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Data Assets Table
create table data_assets (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) not null,
  data_source_id uuid references data_sources(id),
  name varchar(255) not null,
  path text,
  type varchar(50) not null, -- table, collection, file, field, etc.
  category varchar(100), -- personal, sensitive, financial, etc.
  description text,
  size_bytes bigint,
  row_count bigint,
  last_accessed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Data Classifications Table
create table data_classifications (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) not null,
  data_asset_id uuid references data_assets(id) not null,
  classification_type varchar(100) not null, -- pii, sensitive, etc.
  confidence_score decimal(5,4),
  detected_fields jsonb, -- list of fields that were classified
  reviewed boolean default false,
  reviewed_by uuid references users(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Data Flows Table
create table data_flows (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) not null,
  source_asset_id uuid references data_assets(id) not null,
  destination_asset_id uuid references data_assets(id) not null,
  purpose text,
  frequency varchar(50), -- real_time, daily, weekly, etc.
  transfer_method varchar(100), -- api, file_transfer, etc.
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index idx_data_sources_org on data_sources(organization_id);
create index idx_data_assets_org on data_assets(organization_id);
create index idx_data_assets_source on data_assets(data_source_id);
create index idx_data_classifications_org on data_classifications(organization_id);
create index idx_data_classifications_asset on data_classifications(data_asset_id);
create index idx_data_flows_org on data_flows(organization_id);
create index idx_data_flows_source on data_flows(source_asset_id);
create index idx_data_flows_destination on data_flows(destination_asset_id);
