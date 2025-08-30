# X-Komply-AI

AI-powered DSGVO (GDPR) compliance tool for German SMEs.

## Overview

X-Komply-AI is a comprehensive solution designed to help German small and medium-sized enterprises achieve and maintain DSGVO compliance with minimal effort and maximum automation. The platform leverages AI and Large Language Models to automate and simplify DSGVO compliance processes.

## Features

- **Privacy Policy Generator**: AI-powered generation of DSGVO-compliant privacy policies
- **Data Processing Inventory**: Automated discovery and classification of personal data
- **Compliance Monitoring**: Continuous monitoring of DSGVO compliance status
- **Data Subject Request Management**: Automated handling of DSARs
- **Compliance Documentation**: Automated generation of compliance documentation

## Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (Database, Authentication, Storage)
- **AI/LLM**: DeepSeek API for privacy policy generation and compliance analysis
- **Database**: Supabase PostgreSQL
- **Authentication**: NextAuth.js with Supabase adapter
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in the required values
4. Run the development server: `npm run dev`

## Documentation

- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Coding Guidelines](CODING_GUIDELINES.md)

## Deployment

The application is designed to be deployed on Vercel with Supabase as the backend.

## Contributing

Please read [Coding Guidelines](CODING_GUIDELINES.md) before contributing.
