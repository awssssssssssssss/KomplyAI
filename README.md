# X-Komply-AI

AI-powered DSGVO (GDPR) compliance tool for German SMEs.


## Features

- AI-powered privacy policy generation
- Automated compliance assessments
- Data processing activity management
- Audit trail and logging
- Multi-organization support
- User authentication and authorization

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL) - Mocked for local development
- **Authentication**: Custom mock authentication for local development
- **AI Services**: Mock AI services for local development
- **Rate Limiting**: Upstash Redis (disabled for local development)
- **Testing**: Jest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Local Development Setup

This project is configured for local development and proof of concept testing without requiring real API calls or authentication. All external dependencies have been mocked:

- **Authentication**: Uses mock authentication that always allows access
- **Database**: Uses mock Supabase client with sample data
- **AI Services**: Uses mock AI services that return sample responses
- **Rate Limiting**: Disabled for local development

No environment variables are required for local development. The application will work completely offline.

### Running Tests

To run the comprehensive test suite:

```bash
npm run test
```

Or to run unit tests specifically:

```bash
npm run test:unit
```

## Documentation

- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Testing Documentation](TESTING.md)
- [API Documentation](docs/api.md)
- [Database Schema](docs/schema.md)
- [Coding Guidelines](CODING_GUIDELINES.md) - Development standards and best practices

## Project Status

✅ Build successful
✅ Core dependencies installed
✅ Basic API routes implemented

## Deployment

The application is designed to be deployed on Vercel with Supabase as the backend.

## Contributing

Please read [Coding Guidelines](CODING_GUIDELINES.md) before contributing.
