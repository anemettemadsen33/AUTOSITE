# AUTOSITE - Frontend

> **Next.js 16 Application** for the AUTOSITE automotive marketplace platform.

## Overview

This is the frontend application for AUTOSITE, built with Next.js 16, TypeScript, and TailwindCSS. It provides a modern, multilingual interface for browsing and managing vehicle listings.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **State Management**: Zustand
- **Internationalization**: next-intl
- **Forms**: react-hook-form
- **SEO**: next-seo, next-sitemap
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: v20+)
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure API URL in .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Run TypeScript type check
npm run type-check
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   └── vehicles/         # Vehicle-specific components
├── lib/                  # Utilities and helpers
├── stores/               # Zustand state stores
├── public/               # Static assets
└── messages/             # i18n translations

```

## Features

### Multi-Language Support (8 Languages)
- 🇬🇧 English (en)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)
- 🇷🇴 Romanian (ro)
- 🇵🇱 Polish (pl)

### Multi-Currency Support
- EUR (Euro) - Default
- USD (US Dollar)
- RON (Romanian Leu)
- GBP (British Pound)

### Key Functionality
- Advanced vehicle search with 14 filter parameters
- Responsive design (mobile-first)
- Server-side rendering (SSR)
- SEO optimized
- Dark mode support
- Image optimization

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=AUTOSITE

# Default Settings
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_DEFAULT_CURRENCY=EUR
```

## Development Status

**Phase**: Phase 3 - Frontend Development  
**Status**: Initial Setup Complete 🚀  
**Next Steps**: Component development and API integration

See the [main project README](../README.md) for the complete development roadmap.

## Related Documentation

- [Architecture](../docs/ARCHITECTURE.md)
- [API Endpoints](../docs/API_ENDPOINTS.md)
- [Technical Specifications](../docs/TECHNICAL_SPECS.md)
- [Implementation Roadmap](../IMPLEMENTATION_ROADMAP.md)

## Support

For questions or issues related to the frontend, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for the automotive industry**
