# AUTOSITE - Architecture Documentation

## Overview
AUTOSITE is an automotive marketplace platform inspired by mobile.de, autoscout24, and autotrader. The platform features a separate backend and frontend architecture with multi-language and multi-currency support.

## Technology Stack

### Backend
- **Framework**: Laravel 11
- **Admin Panel**: Filament v4
- **Authentication**: Laravel Sanctum
- **API Documentation**: L5 Swagger (OpenAPI)
- **Database**: SQLite (development) / MySQL (production)
- **Media**: Spatie Media Library
- **Translations**: Spatie Laravel Translatable
- **Money Handling**: Spatie Laravel Money

### Frontend
- **Framework**: Next.js 15/16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Internationalization**: next-intl (8 languages)
- **Forms**: react-hook-form
- **HTTP Client**: axios
- **SEO**: next-seo, next-sitemap
- **Notifications**: react-hot-toast

## Architecture Pattern

### Separation of Concerns
1. **Backend (Laravel)**: 
   - RESTful API
   - Business logic
   - Data persistence
   - Admin panel (Filament)
   - Authentication & Authorization

2. **Frontend (Next.js)**:
   - User interface
   - Client-side routing
   - SEO optimization
   - Internationalization
   - State management

### Communication
- Frontend communicates with Backend via REST API
- Authentication via Sanctum tokens
- CORS configured for cross-origin requests

## Core Features

### 1. Multi-Language Support (i18n)
- **Supported Languages**: 8 EU languages
  - English (en)
  - German (de)
  - French (fr)
  - Spanish (es)
  - Italian (it)
  - Portuguese (pt)
  - Romanian (ro)
  - Polish (pl)
- Backend: Translatable content fields
- Frontend: next-intl with locale routing

### 2. Multi-Currency Support
- **Supported Currencies**: EUR, USD, RON (+ others)
- Daily exchange rate updates from ECB (European Central Bank)
- Real-time price conversion
- Cached rates for performance

### 3. User Roles
- **Guest**: Browse vehicles, search, view details
- **User**: Create account, manage own vehicles
- **Dealer**: Manage dealership and vehicles
- **Admin**: Full system access via Filament

### 4. Vehicle Management
- Complete CRUD operations
- Image upload (multiple images per vehicle)
- Advanced search and filtering (14 parameters)
- Multi-language descriptions
- Price display in multiple currencies

## System Components

### Backend Modules

#### 1. Authentication Module
- User registration
- User login/logout
- Token-based authentication
- Password reset
- Email verification

#### 2. Vehicle Module
- Vehicle CRUD operations
- Image management
- Advanced filtering
- Search functionality
- Slug-based routing

#### 3. Dealer Module
- Dealer profiles
- Dealer verification
- Contact information
- Vehicle associations

#### 4. Settings Module
- System configuration
- Email settings
- Default currency
- Application settings
- Public API for settings

#### 5. Exchange Rate Module
- Daily rate fetching from ECB
- Rate caching
- Currency conversion helper
- Historical rate tracking

### Frontend Modules

#### 1. Public Pages
- Homepage with search
- Vehicle listing with filters
- Vehicle details page
- Dealer pages
- Static pages (about, contact)

#### 2. Authentication Pages
- Login page
- Registration page
- Password recovery

#### 3. User Dashboard
- Profile management
- My vehicles
- Create/Edit vehicle
- Vehicle statistics

#### 4. Common Components
- Header (navigation, language selector, currency selector, dark mode)
- Footer
- Vehicle card
- Image carousel
- Filter panel
- Loading states
- Toast notifications

## Data Flow

### Vehicle Search Flow
1. User applies filters on frontend
2. Frontend sends API request with filter parameters
3. Backend processes filters and queries database
4. Backend returns paginated results
5. Frontend displays vehicles with infinite scroll
6. Prices converted to user's selected currency

### Authentication Flow
1. User submits credentials
2. Frontend sends login request
3. Backend validates credentials
4. Backend returns Sanctum token
5. Frontend stores token in state/localStorage
6. Token included in subsequent API requests
7. Backend validates token on protected routes

### Vehicle Creation Flow
1. User accesses dashboard
2. User fills vehicle form
3. User uploads images
4. Frontend validates data
5. Frontend sends multipart request
6. Backend validates and stores vehicle
7. Backend processes and stores images
8. Backend returns created vehicle
9. Frontend redirects to vehicle details

## Security Considerations

### Backend
- CSRF protection
- SQL injection prevention (Eloquent ORM)
- XSS prevention (input sanitization)
- Rate limiting on API endpoints
- Sanctum token authentication
- CORS configuration

### Frontend
- Environment variables for sensitive data
- Client-side validation
- Secure token storage
- HTTPS enforcement (production)
- Content Security Policy headers

## Performance Optimization

### Backend
- Database indexing on searchable fields
- Query optimization (eager loading)
- Response caching
- Exchange rate caching
- API pagination

### Frontend
- Server-side rendering (SSR)
- Static generation for public pages
- Image optimization (next/image)
- Code splitting
- Lazy loading
- Infinite scroll pagination
- Prefetching critical resources

## SEO Strategy

### Technical SEO
- Server-side rendering
- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data (Vehicle, Dealer)
- XML sitemap
- robots.txt
- Canonical URLs

### Content SEO
- Multi-language sitemap
- Locale-specific URLs
- Descriptive slugs
- Alt text for images
- Semantic HTML

## Development Workflow

### Version Control
- Git for version control
- Separate branches for features
- Code review process
- Conventional commits

### Environment Management
- Local development (SQLite, localhost)
- Staging environment
- Production environment
- Environment-specific configuration

### Testing Strategy
- Backend: PHPUnit tests
- Frontend: Jest + React Testing Library
- E2E: Playwright (optional)
- API testing: Swagger UI + Postman

## Deployment Strategy

### Backend Deployment
- Laravel Forge or VPS
- MySQL database
- HTTPS/SSL certificate
- Cron jobs for scheduled tasks
- Queue workers for async jobs
- Redis for caching (optional)

### Frontend Deployment
- Vercel or Netlify
- Environment variables configuration
- CDN for assets
- Automatic deployments from Git

## Monitoring & Maintenance

### Analytics
- Google Analytics
- Google Search Console
- Error tracking (Sentry optional)

### Maintenance
- Regular security updates
- Database backups
- Log monitoring
- Performance monitoring

## Future Enhancements (v1.1+)
- Favorites system
- Dealer messaging
- Premium listing plans
- Advanced analytics
- Comparison tool
- Vehicle history reports
- Payment integration
- Mobile applications
