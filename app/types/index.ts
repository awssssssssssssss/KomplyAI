// TypeScript interfaces and types

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  address: string;
  contact_email: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationUser {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
}

export interface DataProcess {
  id: string;
  organization_id: string;
  name: string;
  purpose: string;
  data_categories: any;
  data_subjects: any;
  retention_period: string;
  legal_basis: string;
  third_parties: any;
  security_measures: string;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  organization_id: string;
  title: string;
  content: string;
  version: string;
  effective_date: string;
  created_at: string;
  updated_at: string;
}

export interface DataSubjectRequest {
  id: string;
  organization_id: string;
  request_type: 'access' | 'rectification' | 'erasure' | 'portability';
  requester_email: string;
  requester_name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  details: string;
  response: string;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
