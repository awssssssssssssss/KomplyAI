# Testing Documentation

This document provides comprehensive information about the testing framework and procedures for X-Komply-AI.

## Testing Framework

The project uses Jest as the testing framework with TypeScript support. Tests are organized in the `tests/unit` directory.

### Test Structure

- `auth.test.ts` - Tests for authentication utilities
- `db.test.ts` - Tests for database utilities
- `ai.test.ts` - Tests for AI service utilities
- `privacy-policy-api.test.ts` - Tests for privacy policy API route

## Running Tests

### All Tests

```bash
npm run test
```

### Unit Tests

```bash
npm run test:unit
```

### Test Runner Script

```bash
npm run test:run
```

## Test Coverage

### Authentication Utilities

Tests cover all authentication utility functions:

- `getServerSession()` - Verifies mock session data
- `getCurrentUser()` - Ensures mock user object is returned
- `requireUser()` - Confirms always returns true for local dev
- `requireOrganizationAccess()` - Verifies always allows access
- `checkRateLimit()` - Ensures no rate limiting in local mode

### Database Utilities

Tests cover the mock Supabase client and helper functions:

- Mock Supabase client functionality
- `organization_users` table queries
- `organizations` table queries
- `data_processes` table queries
- `policies` table insert operations
- Helper functions (`getUser`, `getOrganization`, `getDataProcesses`)

### AI Service Utilities

Tests cover all AI service utility functions:

- `generatePrivacyPolicy()` - Verifies mock policy generation
- `analyzeCompliance()` - Ensures mock compliance analysis
- `generateDocument()` - Confirms mock document creation
- `aiService` object methods and rate limiting

### Privacy Policy API Route

Tests cover the privacy policy generation API endpoint:

- Valid input processing - Verifies successful policy generation
- Invalid input handling - Ensures proper error responses
- Response structure - Confirms correct JSON format

## Writing New Tests

1. Create a new test file in `tests/unit/` directory
2. Follow the existing naming convention (`[feature].test.ts`)
3. Use Jest's `describe` and `it` blocks for organization
4. Test both success and error cases
5. Use `expect` assertions to verify behavior
6. Run tests to ensure they pass

## Mock Data

All tests use mock data that matches the structure of real data. This ensures:

- Tests run without external dependencies
- Consistent test results
- Fast test execution
- No data pollution

## Continuous Integration

Tests are automatically run on every push to the repository. All tests must pass before merging code.
