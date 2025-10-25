# AUTOSITE - Technical Specifications

## Project Overview
AUTOSITE is a modern, multilingual automotive marketplace platform designed for buying and selling vehicles across Europe. The platform is built with a decoupled architecture separating backend (Laravel) and frontend (Next.js).

---

## 1. System Requirements

### Development Environment
- **PHP**: 8.2 or higher
- **Node.js**: 18.x or higher
- **Composer**: 2.x
- **npm/yarn**: Latest stable
- **Database**: SQLite (dev) / MySQL 8.0+ (prod)
- **Git**: Latest stable

### Production Environment
- **Web Server**: Nginx or Apache with HTTPS
- **PHP**: 8.2+ with extensions: PDO, mbstring, openssl, tokenizer, xml, ctype, json, bcmath, fileinfo, gd
- **Database**: MySQL 8.0+ or MariaDB 10.3+
- **Node.js**: 18.x+ (for Next.js)
- **SSL Certificate**: Required
- **Cron**: For scheduled tasks

---

## 2. Backend Specifications (Laravel 11)

### Framework & Packages
```json
{
  "laravel/framework": "^11.0",
  "laravel/sanctum": "^4.0",
  "filament/filament": "^4.0",
  "spatie/laravel-medialibrary": "^11.0",
  "spatie/laravel-translatable": "^6.0",
  "spatie/laravel-money": "^4.0",
  "darkaonline/l5-swagger": "^8.5",
  "guzzlehttp/guzzle": "^7.8"
}
```

### Directory Structure
```
backend/
├── app/
│   ├── Filament/              # Filament admin resources
│   │   ├── Resources/
│   │   │   ├── UserResource.php
│   │   │   ├── DealerResource.php
│   │   │   ├── VehicleResource.php
│   │   │   ├── SettingResource.php
│   │   │   └── ExchangeRateResource.php
│   │   └── Pages/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── VehicleController.php
│   │   │   ├── DealerController.php
│   │   │   ├── SettingController.php
│   │   │   └── ExchangeRateController.php
│   │   ├── Middleware/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Dealer.php
│   │   ├── Vehicle.php
│   │   ├── Setting.php
│   │   └── ExchangeRate.php
│   ├── Services/
│   │   ├── ExchangeRateService.php
│   │   ├── VehicleService.php
│   │   └── SettingService.php
│   ├── Jobs/
│   │   └── FetchExchangeRates.php
│   └── Helpers/
│       └── helpers.php (setting() function)
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   ├── web.php
│   └── console.php
├── config/
├── storage/
│   └── app/
│       └── public/
│           └── vehicles/
└── tests/
```

### Database Configuration
```php
// SQLite for development
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite

// MySQL for production
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autosite
DB_USERNAME=autosite_user
DB_PASSWORD=secure_password
```

### API Authentication (Sanctum)
- Token-based authentication
- Stateful SPA authentication
- Token abilities for permissions
- Token expiration (optional)

### File Upload Configuration
```php
// Maximum upload size: 10MB per image
'max_file_size' => 10240,

// Allowed formats: jpg, jpeg, png, webp
'allowed_extensions' => ['jpg', 'jpeg', 'png', 'webp'],

// Image conversions
'conversions' => [
    'thumb' => [300, 200],
    'medium' => [800, 600],
    'large' => [1200, 900]
]
```

### Scheduled Tasks (Cron)
```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Fetch exchange rates daily at 2 AM
    $schedule->job(new FetchExchangeRates)->dailyAt('02:00');
    
    // Clean old media files weekly
    $schedule->command('media-library:clean')->weekly();
}
```

### API Rate Limiting
```php
// Public routes: 60 requests/minute
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->ip());
});

// Authenticated routes: 120 requests/minute
RateLimiter::for('api-auth', function (Request $request) {
    return Limit::perMinute(120)->by($request->user()?->id ?: $request->ip());
});
```

### CORS Configuration
```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

---

## 3. Frontend Specifications (Next.js 15/16)

### Framework & Packages
```json
{
  "next": "^15.0.0",
  "react": "^18.3.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "axios": "^1.6.0",
  "zustand": "^4.5.0",
  "next-intl": "^3.0.0",
  "next-seo": "^6.5.0",
  "next-sitemap": "^4.2.0",
  "react-hot-toast": "^2.4.0",
  "react-hook-form": "^7.50.0",
  "next-themes": "^0.2.1",
  "@headlessui/react": "^1.7.0",
  "@heroicons/react": "^2.1.0"
}
```

### Directory Structure
```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── (public)/
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── vehicle/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Vehicle details
│   │   │   └── dealers/
│   │   │       └── [id]/
│   │   │           └── page.tsx      # Dealer profile
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (user)/
│   │   │   └── dashboard/
│   │   │       ├── page.tsx
│   │   │       ├── vehicles/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── new/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       └── profile/
│   │   │           └── page.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── api/                          # Optional API routes
│   └── robots.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Checkbox.tsx
│   │   └── Card.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── CurrencySelector.tsx
│   ├── vehicles/
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleGrid.tsx
│   │   ├── VehicleFilters.tsx
│   │   ├── VehicleForm.tsx
│   │   └── ImageCarousel.tsx
│   ├── ProtectedRoute.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── api.ts                        # Axios instance
│   ├── auth.ts                       # Auth utilities
│   ├── vehicles.ts                   # Vehicle API calls
│   ├── settings.ts                   # Settings API calls
│   └── utils.ts                      # Helper functions
├── stores/
│   ├── authStore.ts                  # Zustand auth store
│   ├── settingsStore.ts              # Zustand settings store
│   └── currencyStore.ts              # Zustand currency store
├── messages/
│   ├── en.json
│   ├── de.json
│   ├── fr.json
│   ├── es.json
│   ├── it.json
│   ├── pt.json
│   ├── ro.json
│   └── pl.json
├── public/
│   ├── images/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── types/
│   ├── vehicle.ts
│   ├── user.ts
│   └── api.ts
├── middleware.ts                     # Next.js middleware for i18n
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,de,fr,es,it,pt,ro,pl
NEXT_PUBLIC_DEFAULT_CURRENCY=EUR
```

### Next.js Configuration
```javascript
// next.config.js
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  images: {
    domains: ['localhost', 'api.autosite.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  output: 'standalone', // For Docker deployment
});
```

### Internationalization (i18n)
```javascript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### State Management (Zustand)
```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// stores/settingsStore.ts
interface SettingsState {
  settings: Settings | null;
  currency: string;
  locale: string;
  fetchSettings: () => Promise<void>;
  setCurrency: (currency: string) => void;
}
```

### SEO Configuration
```typescript
// Default SEO config
export const defaultSEO = {
  title: 'AUTOSITE - Premium Automotive Marketplace',
  description: 'Find your perfect vehicle from thousands of listings',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autosite.com',
    siteName: 'AUTOSITE',
  },
  twitter: {
    handle: '@autosite',
    site: '@autosite',
    cardType: 'summary_large_image',
  },
};

// Dynamic vehicle page SEO
export function getVehicleSEO(vehicle: Vehicle) {
  return {
    title: `${vehicle.make} ${vehicle.model} ${vehicle.year} - AUTOSITE`,
    description: vehicle.description[locale],
    openGraph: {
      images: [{ url: vehicle.images[0]?.url }],
    },
  };
}
```

---

## 4. Internationalization (i18n)

### Supported Languages
1. **English (en)** - Primary
2. **German (de)**
3. **French (fr)**
4. **Spanish (es)**
5. **Italian (it)**
6. **Portuguese (pt)**
7. **Romanian (ro)**
8. **Polish (pl)**

### Translation Keys Structure
```json
{
  "common": {
    "search": "Search",
    "filter": "Filter",
    "reset": "Reset",
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "navigation": {
    "home": "Home",
    "vehicles": "Vehicles",
    "dealers": "Dealers",
    "login": "Login",
    "register": "Register"
  },
  "vehicle": {
    "title": "Vehicle Title",
    "make": "Make",
    "model": "Model",
    "year": "Year",
    "price": "Price",
    "contact_dealer": "Contact Dealer"
  }
}
```

---

## 5. Multi-Currency System

### Supported Currencies
- **EUR** (Euro) - Default
- **USD** (US Dollar)
- **RON** (Romanian Leu)
- **GBP** (British Pound)
- Additional currencies can be added

### Exchange Rate Updates
- Source: European Central Bank (ECB) API
- Frequency: Daily at 2:00 AM
- Caching: Redis (production) / File cache (development)
- Fallback: Database stored rates

### Currency Conversion
```typescript
// Frontend helper
function convertPrice(price: number, from: string, to: string, rates: ExchangeRates): number {
  if (from === to) return price;
  const rate = rates[to] / rates[from];
  return Math.round(price * rate * 100) / 100;
}

// Display format
function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}
```

---

## 6. Search & Filter System

### Filter Parameters (14 total)
1. **Make** (dropdown/autocomplete)
2. **Model** (dropdown, dependent on make)
3. **Year Range** (min-max slider)
4. **Price Range** (min-max slider)
5. **Mileage Max** (slider)
6. **Fuel Type** (checkboxes)
7. **Transmission** (checkboxes)
8. **Body Type** (checkboxes)
9. **Condition** (checkboxes: new, used, certified)
10. **Location Country** (dropdown)
11. **Location City** (dropdown/autocomplete)
12. **Doors** (dropdown)
13. **Seats** (dropdown)
14. **Features** (checkboxes)

### Search Implementation
```typescript
// Frontend: Build query params
const buildSearchParams = (filters: VehicleFilters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.make) params.append('make', filters.make);
  if (filters.model) params.append('model', filters.model);
  if (filters.yearMin) params.append('year_min', filters.yearMin.toString());
  if (filters.yearMax) params.append('year_max', filters.yearMax.toString());
  // ... etc
  
  return params;
};

// Backend: Apply filters to query
$query = Vehicle::query()
  ->when($request->make, fn($q) => $q->where('make', $request->make))
  ->when($request->year_min, fn($q) => $q->where('year', '>=', $request->year_min))
  ->when($request->price_max, fn($q) => $q->where('price', '<=', $request->price_max))
  // ... etc
  ->paginate(15);
```

---

## 7. Image Management

### Upload Specifications
- **Max file size**: 10MB per image
- **Allowed formats**: JPG, JPEG, PNG, WebP
- **Max images per vehicle**: 20
- **Required images**: Minimum 1

### Image Processing (Spatie Media Library)
```php
// Conversions
$vehicle->addMedia($file)
    ->withResponsiveImages()
    ->toMediaCollection('images');

// Registered conversions
'thumb' => [300, 200],      // For grid cards
'medium' => [800, 600],     // For detail page
'large' => [1200, 900]      // For lightbox
```

### Frontend Image Display
```tsx
import Image from 'next/image';

<Image
  src={vehicle.images[0].url}
  alt={vehicle.title}
  width={800}
  height={600}
  priority={isMainImage}
  placeholder="blur"
/>
```

---

## 8. Performance Targets

### Backend Performance
- API response time: < 200ms (avg)
- Database queries: < 50ms (avg)
- Image upload: < 5s for 5MB file
- Exchange rate fetch: < 10s

### Frontend Performance (Lighthouse)
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 95

### Optimization Techniques
- Server-side rendering (SSR)
- Static generation for public pages
- Image optimization (WebP, AVIF)
- Code splitting
- Lazy loading
- Response caching
- Database indexing
- CDN for assets

---

## 9. Security Specifications

### Authentication & Authorization
- Password hashing: bcrypt
- Token-based auth: Sanctum
- CSRF protection
- XSS prevention
- SQL injection prevention (Eloquent)

### Data Validation
- Backend: Form Request validation
- Frontend: react-hook-form with Zod/Yup
- File upload validation
- Rate limiting

### Environment Security
- Secrets in .env files
- .env files not committed to Git
- Production .env with strong passwords
- HTTPS enforced in production

---

## 10. Testing Requirements

### Backend Tests (PHPUnit)
- Unit tests for services
- Feature tests for API endpoints
- Database factory seeders
- Test coverage: ≥ 70%

### Frontend Tests
- Component tests (Jest + RTL)
- Integration tests
- E2E tests (Playwright - optional)

### Testing Commands
```bash
# Backend
php artisan test
php artisan test --coverage

# Frontend
npm run test
npm run test:e2e
```

---

## 11. Deployment Specifications

### Backend Deployment (Laravel Forge / VPS)
```bash
# Production environment
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link
php artisan queue:work --daemon
```

### Frontend Deployment (Vercel)
```bash
# Build command
npm run build

# Output directory
.next

# Environment variables
NEXT_PUBLIC_API_URL=https://api.autosite.com/api
```

### Cron Jobs
```cron
# Fetch exchange rates daily
0 2 * * * cd /path/to/backend && php artisan schedule:run
```

---

## 12. Documentation Deliverables

1. **Architecture Document** ✓
2. **Database Schema (ERD)** ✓
3. **API Documentation (Swagger)** ✓
4. **Technical Specifications** ✓ (This document)
5. **Deployment Guide**
6. **User Manual**
7. **Developer Onboarding**
8. **Handover Package**

---

## 13. Success Criteria

### Functional Requirements
- ✅ User registration and authentication
- ✅ Vehicle CRUD operations
- ✅ Image upload and management
- ✅ Advanced search with 14 filters
- ✅ Multi-language support (8 languages)
- ✅ Multi-currency with live rates
- ✅ Dealer profiles
- ✅ Admin panel (Filament)
- ✅ RESTful API (documented)
- ✅ SEO optimization
- ✅ Responsive design

### Non-Functional Requirements
- ✅ Performance: Lighthouse ≥ 90
- ✅ Security: HTTPS, token auth, validation
- ✅ Scalability: Optimized queries, caching
- ✅ Maintainability: Clean code, documentation
- ✅ Accessibility: WCAG 2.1 AA compliance
- ✅ Browser compatibility: Modern browsers
- ✅ Mobile responsive: Mobile-first design

---

## Version History
- **v1.0** (2025-10-24): Initial specifications
