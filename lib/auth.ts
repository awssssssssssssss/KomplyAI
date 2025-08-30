// Authentication utilities for local development
// No real authentication required for proof of concept

// Mock session for local development
export const authOptions = {
  providers: [],
  callbacks: {},
};

export async function getCurrentUser() {
  // Return a mock user for local development
  return {
    id: 'mock-user-id',
    email: 'test@example.com',
    name: 'Test User',
  };
}

export async function requireUser() {
  // For local development, always allow access
  return true;
}

export async function requireOrganizationAccess(organizationId: string) {
  // For local development, always allow access
  return true;
}

export async function checkRateLimit(key: string) {
  // For local development, no rate limiting
  return true;
}

// Mock getServerSession for local development
export async function getServerSession() {
  return {
    user: {
      id: 'mock-user-id',
      email: 'test@example.com',
      name: 'Test User',
    },
  };
}
