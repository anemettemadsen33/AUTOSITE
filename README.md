
# AUTOSITE 🚗

> **Premium Automotive Marketplace Platform** - A modern, multilingual vehicle marketplace inspired by mobile.de, autoscout24, and autotrader.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

## 🌟 Overview

AUTOSITE is an enterprise-grade automotive marketplace platform built with a modern, decoupled architecture. The platform features a powerful Laravel backend with Filament admin panel and a blazing-fast Next.js frontend with full internationalization and multi-currency support.

### ✨ Key Features

- 🌍 **Multi-Language Support** - 8 EU languages (EN, DE, FR, ES, IT, PT, RO, PL)
- 💱 **Multi-Currency** - Live exchange rates from ECB (EUR, USD, RON, GBP, etc.)
- 🔍 **Advanced Search** - 14 filter parameters for precise vehicle discovery
- 📸 **Image Management** - Multiple images with automatic optimization
- 🔐 **Secure Authentication** - Laravel Sanctum token-based auth
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **High Performance** - SSR, caching, optimized queries
- 🎨 **Modern UI** - TailwindCSS with dark mode support
- 🛠️ **Admin Panel** - Filament v4 for content management
- 📊 **SEO Optimized** - Meta tags, sitemaps, structured data

## 🏗️ Architecture

This project follows a **separated architecture** pattern:

```
AUTOSITE/
├── backend/          # Laravel 11 API + Filament Admin
├── frontend/         # Next.js 15/16 SSR Application
└── docs/            # Project Documentation
```

### Technology Stack

#### Backend
- **Framework**: Laravel 11
- **Admin Panel**: Filament v4
- **Authentication**: Laravel Sanctum
- **Database**: MySQL / SQLite
- **API Docs**: L5 Swagger (OpenAPI)
- **Media**: Spatie Media Library
- **Translations**: Spatie Translatable
- **Money**: Spatie Laravel Money

#### Frontend
- **Framework**: Next.js 15/16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand
- **i18n**: next-intl
- **Forms**: react-hook-form
- **SEO**: next-seo, next-sitemap
- **HTTP**: Axios

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- [**Architecture**](./docs/ARCHITECTURE.md) - System design and architecture patterns
- [**Database Schema**](./docs/DATABASE_SCHEMA.md) - ERD and data models
- [**API Endpoints**](./docs/API_ENDPOINTS.md) - Complete API documentation
- [**Technical Specifications**](./docs/TECHNICAL_SPECS.md) - Detailed technical specs

## 🚀 Quick Start

### Prerequisites

- PHP 8.2+
- Node.js 18+
- Composer 2+
- MySQL 8+ (or SQLite for development)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations and seeders
php artisan migrate --seed

# Create storage symlink
php artisan storage:link

# Start development server
php artisan serve
# Backend will be available at http://localhost:8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure API URL in .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start development server
npm run dev
# Frontend will be available at http://localhost:3000
```

### Admin Panel Access

After seeding, access the Filament admin panel at:
- URL: `http://localhost:8000/admin`
- Email: `admin@autosite.com`
- Password: `password`

## 🗓️ Development Roadmap

The project is developed in **5 phases** over ~15 weeks:

### ✅ Phase 1: Analysis & Design (1-2 weeks)
- [x] Architecture definition
- [x] Database schema design
- [x] API endpoint planning
- [x] Technical specifications

### 🔨 Phase 2: Backend Development (3-4 weeks)
- [ ] Laravel 11 setup
- [ ] Sanctum authentication
- [ ] Database models & migrations
- [ ] Filament v4 admin panel
- [ ] API endpoints with filters
- [ ] Media library integration
- [ ] Exchange rate fetching
- [ ] Swagger documentation

### 💻 Phase 3: Frontend Development (3-5 weeks)
- [ ] Next.js 16 setup
- [ ] Global layout & components
- [ ] Public pages (home, vehicle details)
- [ ] Authentication pages
- [ ] User dashboard
- [ ] Multi-language implementation
- [ ] Multi-currency integration
- [ ] SEO optimization

### 🔗 Phase 4: Integration (1-2 weeks)
- [ ] API integration testing
- [ ] End-to-end flows
- [ ] Image upload testing
- [ ] Currency conversion testing
- [ ] i18n verification
- [ ] CRUD operations testing

### 🧪 Phase 5: QA & Deployment (2 weeks)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Lighthouse audit (≥90 score)
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Final documentation

## 🌐 Supported Languages

1. 🇬🇧 English (en)
2. 🇩🇪 German (de)
3. 🇫🇷 French (fr)
4. 🇪🇸 Spanish (es)
5. 🇮🇹 Italian (it)
6. 🇵🇹 Portuguese (pt)
7. 🇷🇴 Romanian (ro)
8. 🇵🇱 Polish (pl)

## 💰 Supported Currencies

- EUR (Euro) - Default
- USD (US Dollar)
- RON (Romanian Leu)
- GBP (British Pound)
- *More currencies can be added*

Exchange rates are automatically updated daily from the European Central Bank (ECB).

## 🔐 Security

- HTTPS enforcement in production
- CSRF protection
- XSS prevention
- SQL injection prevention (Eloquent ORM)
- Rate limiting on API endpoints
- Secure password hashing (bcrypt)
- Token-based authentication
- Input validation and sanitization

## 📊 Performance

Target Lighthouse scores:
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

Optimization techniques:
- Server-side rendering (SSR)
- Image optimization (WebP, AVIF)
- Code splitting & lazy loading
- Database query optimization
- Response caching
- CDN for static assets

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
php artisan test --coverage
```

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:e2e
```

## 📦 Deployment

### Backend (Laravel Forge / VPS)
1. Configure production environment
2. Setup MySQL database
3. Configure HTTPS/SSL
4. Setup cron jobs for scheduled tasks
5. Configure queue workers
6. Deploy code

### Frontend (Vercel / Netlify)
1. Connect Git repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy

## 🤝 Contributing

This is a private project. For internal team members:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

- **Project Manager**: TBD
- **Backend Developer**: TBD
- **Frontend Developer**: TBD
- **UI/UX Designer**: TBD
- **QA Engineer**: TBD

## 📞 Support

For questions or support, please contact the development team.

## 🎯 Project Status

**Current Phase**: Phase 1 - Analysis & Design ✅  
**Next Phase**: Phase 2 - Backend Development 🔨  
**Overall Progress**: ~7% (1/15 weeks)

---

**Built with ❤️ for the automotive industry**
