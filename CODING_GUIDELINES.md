# X-Komply-AI Coding Guidelines

## Technology Stack Standards

### TypeScript
- Strict mode enabled (strict: true in tsconfig.json)
- Explicit typing for all variables, parameters, and return types
- Use of interfaces for object shapes
- Type aliases for primitives and unions
- Avoid using 'any' type - use 'unknown' instead when type is truly unknown

### Next.js
- Use App Router (Next.js 14) for all new pages
- Server Components by default, Client Components only when necessary
- Use Next.js built-in optimizations (Image, Link, Script)
- Follow Next.js data fetching patterns (Server Actions, API Routes)

### React
- Functional components with TypeScript interfaces
- Hooks for state and side effects
- Component composition over inheritance
- Reusable components in the components/ directory

### Tailwind CSS
- Utility-first approach
- Custom classes only in globals.css or component-specific CSS modules
- Responsive design with Tailwind's breakpoints
- Dark mode support where appropriate

## Code Structure

### File Naming
- Use kebab-case for file names
- Use PascalCase for React components
- Use camelCase for utility functions
- Use UPPER_SNAKE_CASE for environment variables

### Directory Structure
```
app/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/           # Layout components
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── api/              # API clients
│   ├── auth/             # Authentication utilities
│   ├── db/               # Database utilities
│   ├── ai/               # AI service integrations
│   └── utils/            # General utilities
├── types/                # TypeScript types and interfaces
└── [page]/               # Page-specific code
```

## Coding Standards

### TypeScript Interfaces
```typescript
// Good
interface User {
  id: string;
  email: string;
  name: string | null;
}

// Avoid
type User = {
  id: string;
  email: string;
  name: string | null;
}
```

### Component Structure
```typescript
// Component with props interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### API Routes
```typescript
// API route with proper error handling
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Business logic here
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
```

### Error Handling
- Always handle errors in try/catch blocks
- Log errors with context
- Return appropriate HTTP status codes
- Provide user-friendly error messages

### Environment Variables
- Prefix with NEXT_PUBLIC_ for client-side variables
- Use .env.local for local development secrets
- Document all environment variables in .env.example

## Database Integration

### Supabase Client
```typescript
// lib/db.ts
// Mock Supabase client for local development

export const supabase = {
  from: (table: string) => ({
    select: (fields: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: getMockData(table)[0], error: null }),
        // For data_processes table which returns array
      }),
      // For data_processes table which returns array directly
    }),
    insert: (data: any) => ({
      select: () => ({
        single: async () => ({ data: { ...data, id: 'mock-id' }, error: null }),
      }),
    }),
  }),
};

// Mock data generation functions
function getMockData(table: string) {
  // Implementation details...
}
```

### Type Safety
- Define TypeScript interfaces for all database tables
- Use Zod for request validation
- Validate data before database operations

## AI Integration

### AI Service Mocks
```typescript
// lib/ai.ts
// Mock AI service for local development

export const aiService = {
  generatePrivacyPolicy: async (organization: any, dataProcesses: any[]) => {
    // Mock implementation that returns sample privacy policy
    return `Sample Privacy Policy for ${organization.name}`;
  },
  
  analyzeCompliance: async (organization: any, dataProcesses: any[]) => {
    // Mock implementation that returns sample compliance analysis
    return {
      score: 85,
      recommendations: ['Recommendation 1', 'Recommendation 2'],
      risks: ['Risk 1', 'Risk 2'],
    };
  },
  
  generateDocument: async (type: string, data: any) => {
    // Mock implementation that returns sample document
    return `Sample ${type} Document`;
  },
  
  checkRateLimit: () => false, // No rate limiting in local development
};

export async function generatePrivacyPolicy(organization: any, dataProcesses: any[]) {
  return aiService.generatePrivacyPolicy(organization, dataProcesses);
}

export async function analyzeCompliance(organization: any, dataProcesses: any[]) {
  return aiService.analyzeCompliance(organization, dataProcesses);
}

export async function generateDocument(type: string, data: any) {
  return aiService.generateDocument(type, data);
}

export function checkRateLimit() {
  return aiService.checkRateLimit();
}
```

### Rate Limiting
- Implement rate limiting for AI API calls
- Cache responses where appropriate
- Handle API quotas and limits

## Testing

### Unit Tests
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });
});
```

### API Route Tests
```typescript
// __tests__/api/policies.test.ts
import { GET } from '@/app/api/policies/route';

describe('Policies API', () => {
  it('returns unauthorized without session', async () => {
    const request = new Request('http://localhost:3000/api/policies');
    const response = await GET(request);
    
    expect(response.status).toBe(401);
  });
});
```

## Security

### Authentication
- Use custom mock authentication for local development
- Implement proper session management (mocked)
- Validate permissions for all actions (mocked)
- Always allow access in local development mode

### Data Validation
- Validate all user inputs
- Use Zod for schema validation
- Sanitize data before database operations

### API Security
- Implement rate limiting
- Use proper HTTP methods
- Validate request headers
- Implement CORS policies

## Performance

### Code Splitting
- Use dynamic imports for heavy components
- Implement lazy loading for non-critical resources
- Optimize bundle size

### Caching
- Use Next.js caching mechanisms
- Implement Redis for session storage
- Cache API responses where appropriate

### Database Optimization
- Use database indexes
- Optimize queries
- Implement pagination for large datasets

## Documentation

### Component Documentation
```typescript
/**
 * Button component for user interactions
 * 
 * @param children - Content to display inside the button
 * @param variant - Visual style of the button
 * @param onClick - Function to call when button is clicked
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  // Implementation
}
```

### API Documentation
- Document all API endpoints
- Include request/response examples
- Specify required permissions
- List possible error responses

## Git Workflow

### Branch Naming
- feature/[feature-name]
- bugfix/[issue-description]
- hotfix/[critical-issue]

### Commit Messages
- Use conventional commits
- Start with type(scope): description
- Types: feat, fix, chore, docs, style, refactor, test, perf

### Pull Requests
- Include description of changes
- Link to related issues
- Request code review from team members
- Ensure all tests pass

## Deployment

### Environment Configuration
- Use environment-specific .env files
- Document all environment variables
- Use Vercel environment variables for production
- Local development requires no environment variables

### CI/CD
- Automated testing on pull requests
- Deploy previews for feature branches
- Production deployment on main branch
- Local development testing with npm run test
