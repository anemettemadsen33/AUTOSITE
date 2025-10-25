# AUTOSITE Testing Guide

Complete testing strategy for AUTOSITE application.

## Table of Contents
1. [Testing Philosophy](#testing-philosophy)
2. [Backend Testing](#backend-testing)
3. [Frontend Testing](#frontend-testing)
4. [Integration Testing](#integration-testing)
5. [Performance Testing](#performance-testing)
6. [Security Testing](#security-testing)
7. [Accessibility Testing](#accessibility-testing)
8. [CI/CD Integration](#cicd-integration)

## Testing Philosophy

### Test Pyramid
```
           /\
          /E2E\       ← Few, critical user flows
         /------\
        /  API  \    ← More, business logic tests
       /----------\
      / Unit Tests \  ← Many, isolated component tests
     /--------------\
```

### Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Key workflows
- **E2E Tests**: Critical user journeys
- **Performance**: Lighthouse score 90+

## Backend Testing

### Setup

```bash
cd backend

# Install dev dependencies (if not already)
composer install

# Run tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter=VehicleTest

# Run tests in parallel
php artisan test --parallel
```

### Unit Tests

#### Example: Model Test
```php
// tests/Unit/Models/VehicleTest.php
<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Vehicle;
use App\Models\Dealer;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_belongs_to_a_dealer()
    {
        $dealer = Dealer::factory()->create();
        $vehicle = Vehicle::factory()->create(['dealer_id' => $dealer->id]);

        $this->assertInstanceOf(Dealer::class, $vehicle->dealer);
        $this->assertEquals($dealer->id, $vehicle->dealer->id);
    }

    /** @test */
    public function it_can_format_price_with_currency()
    {
        $vehicle = Vehicle::factory()->create([
            'price_amount' => 25000,
            'price_currency' => 'EUR',
        ]);

        $this->assertEquals('€25,000.00', $vehicle->formatted_price);
    }

    /** @test */
    public function it_generates_slug_from_make_and_model()
    {
        $vehicle = Vehicle::factory()->create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2024,
        ]);

        $this->assertStringContainsString('toyota-camry', $vehicle->slug);
    }
}
```

#### Example: Service Test
```php
// tests/Unit/Services/ExchangeRateServiceTest.php
<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\ExchangeRateService;
use App\Models\ExchangeRate;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExchangeRateServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_convert_currency()
    {
        ExchangeRate::create([
            'base_currency' => 'EUR',
            'target_currency' => 'USD',
            'rate' => 1.10,
        ]);

        $service = new ExchangeRateService();
        $converted = $service->convert(100, 'EUR', 'USD');

        $this->assertEquals(110, $converted);
    }
}
```

### Feature Tests

#### Example: API Test
```php
// tests/Feature/Api/VehicleApiTest.php
<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use App\Models\Vehicle;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VehicleApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_vehicles()
    {
        Vehicle::factory(10)->create();

        $response = $this->getJson('/api/v1/vehicles');

        $response->assertOk()
            ->assertJsonCount(10, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'make', 'model', 'year', 'price']
                ]
            ]);
    }

    /** @test */
    public function it_can_create_vehicle_when_authenticated()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $vehicleData = [
            'make' => 'Toyota',
            'model' => 'Camry',
            'year' => 2024,
            'price_amount' => 25000,
            'price_currency' => 'EUR',
            'mileage' => 15000,
        ];

        $response = $this->postJson('/api/v1/vehicles', $vehicleData);

        $response->assertCreated()
            ->assertJson(['data' => ['make' => 'Toyota']]);

        $this->assertDatabaseHas('vehicles', ['make' => 'Toyota']);
    }

    /** @test */
    public function it_requires_authentication_to_create_vehicle()
    {
        $response = $this->postJson('/api/v1/vehicles', []);

        $response->assertUnauthorized();
    }

    /** @test */
    public function it_validates_vehicle_data()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/v1/vehicles', [
            'make' => '', // Required
            'year' => 1800, // Too old
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['make', 'year']);
    }

    /** @test */
    public function it_can_filter_vehicles_by_make()
    {
        Vehicle::factory()->create(['make' => 'Toyota']);
        Vehicle::factory()->create(['make' => 'Honda']);

        $response = $this->getJson('/api/v1/vehicles?make=Toyota');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJson([
                'data' => [
                    ['make' => 'Toyota']
                ]
            ]);
    }
}
```

#### Example: Authentication Test
```php
// tests/Feature/Api/AuthTest.php
<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson('/api/v1/auth/register', $userData);

        $response->assertCreated()
            ->assertJsonStructure(['user', 'token']);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com'
        ]);
    }

    /** @test */
    public function user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['user', 'token']);
    }

    /** @test */
    public function login_fails_with_invalid_credentials()
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrong',
        ]);

        $response->assertUnauthorized();
    }
}
```

### Database Testing

```bash
# Run migrations in test database
php artisan test --filter=DatabaseTest

# Use in-memory SQLite for faster tests
# phpunit.xml already configured
```

### Running Tests

```bash
# All tests
php artisan test

# Specific suite
php artisan test --testsuite=Feature

# With coverage
php artisan test --coverage --min=80

# Stop on failure
php artisan test --stop-on-failure

# Parallel execution
php artisan test --parallel
```

## Frontend Testing

### Setup

```bash
cd autosite-frontend

# Install dependencies
npm install

# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run e2e

# Run E2E in UI mode
npm run e2e:ui
```

### Unit Tests (Jest + React Testing Library)

#### Example: Component Test
```typescript
// __tests__/VehicleCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import VehicleCard from '@/components/vehicles/VehicleCard';

describe('VehicleCard', () => {
  const mockVehicle = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 25000,
    currency: 'EUR',
    image: '/images/camry.jpg',
  };

  it('renders vehicle information', () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText(/25,000/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<VehicleCard vehicle={mockVehicle} onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('vehicle-card'));

    expect(handleClick).toHaveBeenCalledWith(mockVehicle.id);
  });
});
```

#### Example: Hook Test
```typescript
// __tests__/useVehicles.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useVehicles } from '@/hooks/useVehicles';

describe('useVehicles', () => {
  it('fetches vehicles on mount', async () => {
    const { result } = renderHook(() => useVehicles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.vehicles).toHaveLength(10);
    });
  });

  it('handles errors', async () => {
    // Mock API error
    const { result } = renderHook(() => useVehicles({ shouldFail: true }));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
```

### E2E Tests (Playwright)

#### Example: User Flow Test
```typescript
// e2e/vehicle-search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Vehicle Search', () => {
  test('user can search for vehicles', async ({ page }) => {
    await page.goto('/en');

    // Enter search criteria
    await page.selectOption('select[name="make"]', 'Toyota');
    await page.fill('input[name="year_min"]', '2020');
    await page.fill('input[name="price_max"]', '30000');

    // Submit search
    await page.click('button[type="submit"]');

    // Wait for results
    await page.waitForSelector('[data-testid="vehicle-card"]');

    // Verify results
    const vehicles = await page.locator('[data-testid="vehicle-card"]').count();
    expect(vehicles).toBeGreaterThan(0);

    // Verify filters applied
    const firstVehicle = page.locator('[data-testid="vehicle-card"]').first();
    await expect(firstVehicle).toContainText('Toyota');
  });

  test('user can view vehicle details', async ({ page }) => {
    await page.goto('/en');

    // Click first vehicle
    await page.click('[data-testid="vehicle-card"]');

    // Verify detail page
    await expect(page).toHaveURL(/\/vehicle\/.+/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="vehicle-price"]')).toBeVisible();
  });
});
```

#### Example: Authentication Flow
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can register', async ({ page }) => {
    await page.goto('/en/auth/register');

    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="password_confirmation"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('user can login and logout', async ({ page }) => {
    // Login
    await page.goto('/en/auth/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');

    await expect(page).toHaveURL('/en');
  });
});
```

### Visual Regression Testing

```bash
# Take baseline screenshots
npx playwright test --update-snapshots

# Compare against baseline
npx playwright test
```

## Performance Testing

### Lighthouse CI

```bash
# Install
npm install -g @lhci/cli

# Run
lhci autorun --config=lighthouserc.json
```

#### Configuration
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    }
  }
}
```

### Load Testing

```bash
# Install k6
brew install k6  # macOS
# or download from k6.io

# Run load test
k6 run load-test.js
```

#### Example Load Test
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
};

export default function () {
  // Test vehicle listing
  const res = http.get('https://api.autosite.example.com/api/v1/vehicles');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

## Accessibility Testing

### Automated Testing

```bash
# Install axe-core
npm install --save-dev @axe-core/playwright

# Run in tests
```

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/en');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('vehicle detail page should be accessible', async ({ page }) => {
    await page.goto('/en/vehicle/toyota-camry-2024');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
```

### Manual Testing

- [ ] Keyboard navigation
- [ ] Screen reader compatibility (NVDA, JAWS)
- [ ] Color contrast (WCAG AA minimum)
- [ ] Focus indicators
- [ ] Alt text for images
- [ ] ARIA labels
- [ ] Form labels

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.2
          
      - name: Install dependencies
        working-directory: backend
        run: composer install
        
      - name: Run tests
        working-directory: backend
        run: php artisan test --coverage
        
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20
          
      - name: Install dependencies
        working-directory: autosite-frontend
        run: npm ci
        
      - name: Run unit tests
        working-directory: autosite-frontend
        run: npm test
        
      - name: Run E2E tests
        working-directory: autosite-frontend
        run: npx playwright test
```

## Test Coverage Goals

| Component | Target | Current |
|-----------|--------|---------|
| Backend Models | 90% | TBD |
| Backend Controllers | 80% | TBD |
| Backend Services | 85% | TBD |
| Frontend Components | 80% | TBD |
| Frontend Hooks | 85% | TBD |
| E2E Critical Paths | 100% | TBD |

## Best Practices

1. **Write Tests First** (TDD when possible)
2. **Keep Tests Fast** (use database transactions, mock external services)
3. **One Assertion Per Test** (makes failures easier to diagnose)
4. **Use Descriptive Names** (`it_validates_vehicle_price_is_positive`)
5. **Test Edge Cases** (empty data, max values, null values)
6. **Mock External Services** (APIs, payment gateways)
7. **Use Factories** (for consistent test data)
8. **Clean Up After Tests** (RefreshDatabase, tearDown)

## Running All Tests

```bash
# Backend
cd backend && php artisan test --coverage

# Frontend unit
cd autosite-frontend && npm test

# Frontend E2E
cd autosite-frontend && npm run e2e

# Performance
npm run lighthouse

# Accessibility
npx playwright test accessibility.spec.ts
```

---

**Last Updated**: 2025-10-25  
**Maintained by**: AUTOSITE QA Team
