# AUTOSITE - Implementation Guide

This document outlines the comprehensive improvements made to the AUTOSITE platform, including automated testing, image optimization, SEO enhancements, security features, and CI/CD pipeline.

## Table of Contents

1. [Automated Testing](#automated-testing)
2. [Image Upload Pipeline](#image-upload-pipeline)
3. [SEO-Friendly URLs](#seo-friendly-urls)
4. [Structured Data (Schema.org)](#structured-data)
5. [API Rate Limiting](#api-rate-limiting)
6. [Frontend Form Validation](#frontend-form-validation)
7. [Accessibility Improvements](#accessibility-improvements)
8. [CI/CD Pipeline](#cicd-pipeline)

---

## 1. Automated Testing

### Backend Tests (PHPUnit)

**Location:** `backend/tests/`

**Test Coverage:**
- **Authentication API Tests** (`tests/Feature/AuthApiTest.php`)
  - User registration
  - User login/logout
  - Profile management
  - Invalid credentials handling
  - 6 test cases

- **Vehicle API Tests** (`tests/Feature/VehicleApiTest.php`)
  - CRUD operations
  - Filtering by make, model, price range
  - Authorization checks
  - Soft deletion
  - 9 test cases

- **Rate Limiting Tests** (`tests/Feature/RateLimitingTest.php`)
  - Login endpoint rate limiting
  - Search endpoint rate limiting
  - Authenticated vs public limits
  - 3 test cases

- **Image Service Tests** (`tests/Unit/ImageServiceTest.php`)
  - Image validation
  - WebP conversion
  - Multiple size generation
  - File size limits
  - 5 test cases

**Running Tests:**
```bash
cd backend
php artisan test
php artisan test --coverage
```

### Frontend Tests (Jest)

**Location:** `frontend/lib/validations/__tests__/`

**Test Coverage:**
- **Form Validation Tests** (`forms.test.ts`)
  - Login schema validation
  - Registration schema validation
  - Vehicle search schema validation
  - Contact form validation
  - 13 test cases

**Running Tests:**
```bash
cd frontend
npm test
npm run test:coverage
```

### E2E Tests (Playwright)

**Location:** `frontend/e2e/`

**Test Coverage:**
- **Vehicle Page Tests** (`vehicle-page.spec.ts`)
  - Vehicle information display
  - Accessibility (ARIA labels, keyboard navigation)
  - Structured data verification
  - 4 test scenarios

**Running Tests:**
```bash
cd frontend
npm run test:e2e
npm run test:e2e:ui  # Interactive mode
```

**Total Test Count:** 25 backend + 13 frontend = **38 automated tests**

---

## 2. Image Upload Pipeline

### ImageService Class

**Location:** `backend/app/Services/ImageService.php`

**Features:**
- ✅ **Extension Validation:** jpg, jpeg, png, webp
- ✅ **File Size Limit:** Maximum 10MB
- ✅ **MIME Type Validation:** Prevents file type spoofing
- ✅ **WebP Conversion:** Automatic conversion to WebP for 85% quality
- ✅ **Multiple Sizes:** Generates thumb (300x200), medium (800x600), large (1200x900)
- ✅ **Original Format Preservation:** Keeps original format for compatibility

**Dependencies:**
```json
{
  "intervention/image": "^3.11"
}
```

**Usage Example:**
```php
use App\Services\ImageService;

$imageService = new ImageService();

// Validate image
if ($imageService->validateImage($uploadedFile)) {
    // Process and optimize
    $paths = $imageService->processImage($uploadedFile, 'vehicles');
    
    // $paths contains:
    // - 'thumb' => 'vehicles/thumb/xxx.webp'
    // - 'medium' => 'vehicles/medium/xxx.webp'
    // - 'large' => 'vehicles/large/xxx.webp'
    // - 'thumb_original' => 'vehicles/thumb/xxx.jpg'
    // etc.
}
```

**Allowed Extensions:**
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

**Image Sizes Generated:**
| Size   | Dimensions  | Use Case        |
|--------|-------------|-----------------|
| Thumb  | 300x200     | List thumbnails |
| Medium | 800x600     | Detail preview  |
| Large  | 1200x900    | Full view       |

---

## 3. SEO-Friendly URLs

### Slug-Based Routing

**Backend:**
- Vehicle model uses `slug` field as route key
- Automatic slug generation on vehicle creation
- Format: `{make}-{model}-{year}-{unique-id}`

**Frontend:**
- Dynamic route: `app/vehicles/[slug]/page.tsx`
- Clean URLs: `/vehicles/bmw-x5-2023-abc123`

**Example:**
```typescript
// Vehicle route
/vehicles/bmw-x5-2023-test

// Dynamic parameter extraction
const { slug } = params;
const vehicle = await getVehicle(slug);
```

---

## 4. Structured Data (Schema.org)

### VehicleSchema Component

**Location:** `frontend/components/seo/VehicleSchema.tsx`

**Features:**
- ✅ Implements Schema.org Vehicle type
- ✅ JSON-LD format for search engines
- ✅ Rich snippets in search results
- ✅ Complete vehicle metadata

**Schema Properties:**
- `@type`: Vehicle
- `name`: Vehicle full name
- `brand`: Manufacturer
- `model`: Model name
- `vehicleModelDate`: Year
- `mileageFromOdometer`: Mileage with unit
- `fuelType`: Fuel type
- `vehicleTransmission`: Transmission type
- `offers`: Price and availability
- `image`: Vehicle images

**Usage:**
```tsx
import VehicleSchema from '@/components/seo/VehicleSchema';

<VehicleSchema vehicle={vehicleData} />
```

**SEO Benefits:**
- Rich snippets in Google search
- Enhanced visibility
- Better click-through rates
- Structured vehicle information

---

## 5. API Rate Limiting

### Implementation

**Location:** `backend/routes/api.php`

**Rate Limits:**

| Endpoint Type | Rate Limit | Scope |
|--------------|------------|-------|
| Auth (login/register) | 5 requests/minute | Per IP |
| Vehicle search (public) | 60 requests/minute | Per IP |
| Authenticated routes | 120 requests/minute | Per user |
| Other public routes | Default | Per IP |

**Configuration:**
```php
// Strict rate limiting for auth
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
});

// Moderate rate limiting for search
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/vehicles', [VehicleController::class, 'index']);
});

// Higher limits for authenticated users
Route::middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
    // Protected routes
});
```

**Response Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1635789600
```

**429 Too Many Requests Response:**
```json
{
  "message": "Too Many Attempts."
}
```

---

## 6. Frontend Form Validation

### Zod Schemas

**Location:** `frontend/lib/validations/forms.ts`

**Schemas:**

1. **Login Schema**
   - Email (required, valid format)
   - Password (min 8 chars)

2. **Registration Schema**
   - Name (2-100 chars)
   - Email (required, valid format)
   - Password (min 8 chars, uppercase, lowercase, number)
   - Password confirmation (must match)

3. **Vehicle Search Schema**
   - Query (optional)
   - Make, model, year range
   - Price range
   - Mileage max
   - Fuel type (enum)
   - Transmission (enum)
   - Body type (enum)
   - Condition (enum)
   - Location (country code, city)
   - Custom refinements for range validation

4. **Contact Form Schema**
   - Name (2-100 chars)
   - Email (required, valid format)
   - Phone (optional, 10-20 chars)
   - Message (10-1000 chars)

**Integration with react-hook-form:**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validations/forms';

const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

**Validation Benefits:**
- Type-safe forms
- Client-side validation
- Consistent error messages
- Reusable schemas
- Backend-aligned validation rules

---

## 7. Accessibility Improvements

### Implemented Features

**Skip to Content Link:**
- Location: `frontend/app/layout.tsx`
- Hidden by default, visible on focus
- Keyboard accessible (Tab key)
- Jumps to main content (#main-content)

```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only"
  aria-label="Skip to main content"
>
  Skip to main content
</a>
```

**ARIA Labels:**
- All interactive elements have descriptive labels
- Navigation links clearly labeled
- Buttons include context (e.g., "Contact seller about BMW X5")

**Keyboard Navigation:**
- Tab order follows logical flow
- Focus indicators visible
- Enter/Space activate buttons
- All interactive elements keyboard accessible

**Focus Management:**
- Clear focus indicators (ring-2 ring-blue-500)
- Focus not trapped in modals
- Skip links for quick navigation

**Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- `<nav>` for navigation
- `<main>` for main content
- `<article>` for vehicle cards

**CSS Utilities:**
```css
.sr-only {
  /* Screen reader only - visually hidden but accessible */
}

.focus\:not-sr-only:focus {
  /* Make visible when focused */
}
```

**Lighthouse Accessibility Score Target:** ≥ 95

---

## 8. CI/CD Pipeline

### GitHub Actions Workflows

**Location:** `.github/workflows/`

### 1. Backend Tests Workflow

**File:** `backend-tests.yml`

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Only when backend files change

**Steps:**
1. Setup PHP 8.2 with extensions
2. Cache Composer dependencies
3. Install dependencies
4. Setup environment (.env, key generation)
5. Create SQLite database
6. Run migrations
7. Execute PHPUnit tests
8. Upload coverage to Codecov

**Matrix Strategy:** Single PHP version (8.2)

### 2. Frontend Tests Workflow

**File:** `frontend-tests.yml`

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Only when frontend files change

**Jobs:**

**Test Job:**
1. Setup Node.js 18
2. Cache npm dependencies
3. Install dependencies
4. Run TypeScript type checking
5. Run ESLint
6. Run Jest tests with coverage
7. Build application
8. Upload coverage to Codecov

**E2E Tests Job:**
1. Setup Node.js 18
2. Install dependencies
3. Install Playwright browsers
4. Run Playwright E2E tests
5. Upload test reports as artifacts

### 3. Comprehensive CI/CD Workflow

**File:** `ci-cd.yml`

**Triggers:**
- Push to `main`
- Pull requests to `main`

**Jobs:**

1. **backend-lint-and-test**
   - Code style check (Laravel Pint)
   - PHPUnit tests
   - Fast fail on errors

2. **frontend-lint-and-test**
   - TypeScript checking
   - ESLint
   - Jest tests
   - Build verification

3. **security-scan** (PR only)
   - Trivy vulnerability scanner
   - Upload results to GitHub Security

4. **deploy** (main branch only)
   - Depends on successful tests
   - Placeholder for deployment commands
   - Can be configured for:
     - Backend: Laravel Forge, Docker, VPS
     - Frontend: Vercel, Netlify, custom

**Optimization:**
- Dependency caching for faster builds
- Parallel job execution
- Path-based triggers (only run when relevant files change)

### Environment Variables

**Backend (.env.example):**
```env
APP_NAME=AUTOSITE
APP_ENV=production
APP_KEY=
APP_DEBUG=false
DB_CONNECTION=mysql
# ... other variables
```

**Frontend (.env.example):**
```env
NEXT_PUBLIC_API_URL=https://api.autosite.com
NEXT_PUBLIC_SITE_URL=https://autosite.com
```

---

## Testing Commands Summary

### Backend
```bash
cd backend

# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit

# Run with coverage
php artisan test --coverage

# Run specific test file
php artisan test tests/Feature/AuthApiTest.php

# Code style check
./vendor/bin/pint --test

# Code style fix
./vendor/bin/pint
```

### Frontend
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint

# E2E tests
npm run test:e2e

# E2E tests (interactive UI)
npm run test:e2e:ui

# Build
npm run build
```

---

## Performance Optimizations

### Backend
- Image optimization with WebP conversion
- Database query optimization (eager loading)
- API response caching
- Rate limiting to prevent abuse

### Frontend
- Server-Side Rendering (SSR)
- Static generation for public pages
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- WebP image format support

---

## Security Features

1. **Rate Limiting:** Prevents brute force and DoS attacks
2. **Input Validation:** Zod schemas + Laravel validation
3. **Image Validation:** File type, size, and MIME type checks
4. **CSRF Protection:** Laravel built-in
5. **XSS Prevention:** React automatic escaping
6. **SQL Injection Prevention:** Eloquent ORM
7. **Authentication:** Laravel Sanctum with secure tokens
8. **HTTPS Enforcement:** Required in production

---

## Next Steps

### Recommended Improvements

1. **Testing:**
   - Increase coverage to 80%+
   - Add integration tests
   - Performance testing

2. **Features:**
   - Real-time notifications
   - Advanced image gallery
   - Vehicle comparison tool
   - Favorites/Wishlist

3. **Infrastructure:**
   - Redis caching
   - CDN for images
   - Database replication
   - Load balancing

4. **Monitoring:**
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics integration
   - Uptime monitoring

---

## Support

For questions or issues:
- Open an issue on GitHub
- Check documentation in `/docs`
- Review test examples in `/tests`

**Last Updated:** October 25, 2025
**Version:** 2.0.0
**Maintained By:** AUTOSITE Development Team
