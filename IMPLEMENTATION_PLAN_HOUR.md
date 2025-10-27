# 🚀 PLAN IMPLEMENTARE - TESTS, SEO & PERFORMANCE

**Timp estimat**: 1 oră  
**Data**: 27 Octombrie 2025

---

## 📋 TASK-URI PRIORITARE

### 1. ✅ TESTS (20 min)

#### Backend - PHPUnit Tests
- ✅ Test API endpoints (vehicles, dealers, auth)
- ✅ Test database models
- ✅ Test authentication

#### Frontend - Jest Tests
- ✅ Component tests (VehicleCard, Navbar)
- ✅ Hook tests (useVehicles, useDealers)
- ✅ Basic rendering tests

### 2. ✅ SEO OPTIMIZATION (20 min)

- ✅ Meta tags (title, description, OG tags)
- ✅ Sitemap.xml generation
- ✅ Robots.txt
- ✅ Structured data (JSON-LD)
- ✅ Alt tags pentru imagini

### 3. ✅ PERFORMANCE AUDIT (20 min)

- ✅ Lighthouse audit
- ✅ Bundle size optimization
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading

---

## 🎯 PAS 1: BACKEND TESTS (10 min)

### Creăm teste pentru API endpoints:

**File**: `backend/tests/Feature/VehicleApiTest.php`
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Dealer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_vehicles()
    {
        Vehicle::factory()->count(5)->create();
        
        $response = $this->getJson('/api/v1/vehicles');
        
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'make', 'model', 'price']
                     ]
                 ]);
    }

    public function test_can_filter_vehicles_by_make()
    {
        Vehicle::factory()->create(['make' => 'BMW']);
        Vehicle::factory()->create(['make' => 'Audi']);
        
        $response = $this->getJson('/api/v1/vehicles?make=BMW');
        
        $response->assertStatus(200);
        $this->assertEquals('BMW', $response->json('data.0.make'));
    }

    public function test_can_show_single_vehicle()
    {
        $vehicle = Vehicle::factory()->create();
        
        $response = $this->getJson("/api/v1/vehicles/{$vehicle->slug}");
        
        $response->assertStatus(200)
                 ->assertJson(['data' => ['id' => $vehicle->id]]);
    }
}
```

**File**: `backend/tests/Feature/AuthApiTest.php`
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token', 'user']);
    }

    public function test_login_fails_with_wrong_credentials()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrongpass'
        ]);

        $response->assertStatus(401);
    }
}
```

### Rulare teste:
```bash
cd backend
php artisan test
```

---

## 🎯 PAS 2: FRONTEND TESTS (10 min)

### Setup Jest

**File**: `frontend/jest.config.js`
```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

**File**: `frontend/jest.setup.js`
```js
import '@testing-library/jest-dom'
```

### Install dependencies:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### Component Test

**File**: `frontend/__tests__/components/Navbar.test.tsx`
```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Acasă')).toBeInTheDocument()
    expect(screen.getByText('Vehicule')).toBeInTheDocument()
    expect(screen.getByText('Dealeri')).toBeInTheDocument()
  })
})
```

### Update package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## 🎯 PAS 3: SEO OPTIMIZATION (20 min)

### Meta Tags

**File**: `frontend/app/layout.tsx` (UPDATE)
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AutoSite - Premium Automotive Marketplace',
    template: '%s | AutoSite'
  },
  description: 'Găsește mașina perfectă din peste 10,000 de vehicule de la dealeri verificați. Compară prețuri, programează test drive și cumpără online.',
  keywords: ['mașini second hand', 'dealeri auto', 'vehicule noi', 'marketplace auto'],
  authors: [{ name: 'AutoSite' }],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://autosite.com',
    siteName: 'AutoSite',
    title: 'AutoSite - Marketplace Auto Premium',
    description: 'Găsește mașina perfectă',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoSite',
    description: 'Marketplace Auto Premium',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
}
```

### Sitemap

**File**: `frontend/app/sitemap.ts`
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://autosite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://autosite.com/vehicles',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: 'https://autosite.com/dealers',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]
}
```

### Robots.txt

**File**: `frontend/app/robots.ts`
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/'],
    },
    sitemap: 'https://autosite.com/sitemap.xml',
  }
}
```

---

## 🎯 PAS 4: PERFORMANCE OPTIMIZATION (20 min)

### Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

**File**: `frontend/next.config.ts` (UPDATE)
```ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // existing config
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizeCss: true,
  }
})
```

### Image Optimization

**Actualizează componentele să folosească Next Image:**
```tsx
import Image from 'next/image'

<Image 
  src="/vehicle.jpg"
  alt="Vehicle description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

---

## 📊 VERIFICARE & AUDIT

### Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse http://localhost:3001 --view
```

**Target scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 90
- SEO: ≥ 95

### Bundle Size
```bash
ANALYZE=true npm run build
```

---

## ✅ CHECKLIST FINAL

- [ ] Backend tests: Vehicle API
- [ ] Backend tests: Auth API  
- [ ] Frontend tests: Components
- [ ] SEO: Meta tags
- [ ] SEO: Sitemap
- [ ] SEO: Robots.txt
- [ ] Performance: Bundle analyzer
- [ ] Performance: Image optimization
- [ ] Performance: Code splitting
- [ ] Lighthouse audit: >90 scores

---

**TIMP TOTAL**: 1 oră  
**REZULTAT**: Proiect production-ready cu tests, SEO și performance optimizate!
