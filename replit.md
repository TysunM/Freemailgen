# Cold Email Generator Application

## Overview

This is a full-stack web application that generates AI-powered cold email sequences for sales and marketing purposes. The application uses OpenAI's GPT models to create personalized, multi-stage email campaigns with deliverability analysis and A/B testing suggestions. Built with a modern tech stack including React, Express, TypeScript, and PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom dark theme and neon accent colors
- **State Management**: TanStack Query for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for email generation and data retrieval
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Storage Abstraction**: Interface-based storage layer with in-memory fallback for development
- **Data Models**: Users, email generations with JSON fields for complex data structures

### AI Integration
- **Provider**: Google Gemini 2.5 Pro for email content generation
- **Service Layer**: Dedicated EmailGeneratorService for AI operations
- **Features**: Multi-stage email sequences, deliverability analysis, A/B test suggestions
- **Input Validation**: Zod schemas for type-safe API inputs

### Development & Build
- **Development Server**: Vite with HMR and React Fast Refresh
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

### Security & Environment
- **Environment Variables**: Secure API key management for Gemini AI integration
- **CORS**: Express middleware for cross-origin resource sharing
- **Input Sanitization**: Zod validation on all API endpoints
- **Error Boundaries**: Graceful error handling throughout the application

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **AI Service**: Google Gemini API (requires GEMINI_API_KEY configuration)
- **Development Platform**: Replit integration for cloud development

### Key Libraries
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS for utility-first styling approach
- **Data Fetching**: TanStack Query for robust server state management
- **Validation**: Zod for runtime type validation and schema definition
- **Date Handling**: date-fns for date manipulation utilities
- **Carousel**: Embla Carousel for image/content carousels

### Development Tools
- **Build System**: Vite with TypeScript support and React plugin
- **Code Bundling**: esbuild for fast TypeScript compilation
- **Error Overlay**: Replit's runtime error modal for development debugging
- **Hot Reload**: Vite's HMR system for instant development feedback