# 🧪 AUTOSITE Backend - Testing Guide

**Created**: 29 October 2025  
**Status**: Day 1 - Testing Infrastructure Setup

---

## 📋 Overview

This guide covers the testing infrastructure for the AUTOSITE backend, including setup, running tests, and writing new tests.

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Composer 2.x
- SQLite (for testing database)

### Initial Setup

```bash
# 1. Install dependencies
composer install

# 2. Copy environment file
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Run migrations (optional for development)
php artisan migrate

# 5. Run tests
php artisan test
```

---

## 🏗️ Testing Infrastructure

### Test Database Configuration

The test suite uses an in-memory SQLite database configured in `phpunit.xml`:

```xml
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
```

This ensures:
- ✅ Fast test execution
- ✅ No pollution of development database
- ✅ Clean state for each test run
- ✅ No need for test database setup

### Test Environment Variables

All test-specific environment variables are in `phpunit.xml`:

- `APP_ENV=testing` - Testing environment
- `CACHE_STORE=array` - In-memory cache
- `MAIL_MAILER=array` - Email testing
- `QUEUE_CONNECTION=sync` - Synchronous queue execution
- `SESSION_DRIVER=array` - In-memory sessions

---

## 📁 Test Structure

```
tests/
├── Feature/              # Feature/Integration tests
│   ├── AuthApiTest.php
│   ├── VehicleApiTest.php
│   ├── RolePermissionTest.php
│   └── ...
├── Unit/                 # Unit tests
│   ├── ExampleTest.php
│   └── ...
├── Pest.php             # Pest configuration (if using Pest)
└── TestCase.php         # Base test case
```

### Test Types

#### 1. Feature Tests (API/Integration Tests)
Test complete API endpoints and user flows:

```php
test('admin can create vehicle', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    
    actingAs($admin, 'sanctum');
    
    $response = postJson('/api/v1/vehicles', [
        'title' => ['en' => 'Test BMW X5'],
        'make' => 'BMW',
        'price' => 65000,
    ]);
    
    $response->assertStatus(201);
});
```

#### 2. Unit Tests (Model/Service Tests)
Test individual components:

```php
test('vehicle model generates correct slug', function () {
    $vehicle = Vehicle::factory()->create([
        'make' => 'BMW',
        'model' => 'X5'
    ]);
    
    expect($vehicle->slug)->toContain('bmw-x5');
});
```

---

## 🧪 Running Tests

### All Tests
```bash
php artisan test
```

### Specific Test Suite
```bash
# Feature tests only
php artisan test tests/Feature

# Unit tests only
php artisan test tests/Unit
```

### Specific Test File
```bash
php artisan test tests/Feature/VehicleApiTest.php
```

### Specific Test
```bash
php artisan test --filter=admin_can_create_vehicle
```

### With Coverage
```bash
# Requires Xdebug or PCOV
php artisan test --coverage

# Coverage with minimum threshold
php artisan test --coverage --min=70
```

### Test Output Formats

```bash
# Detailed output
php artisan test --testdox

# Stop on first failure
php artisan test --stop-on-failure

# Parallel execution (if available)
php artisan test --parallel
```

---

## ✍️ Writing Tests

### Using Pest (Recommended)

```php
<?php

use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('vehicles can be filtered by make', function () {
    Vehicle::factory()->create(['make' => 'BMW']);
    Vehicle::factory()->create(['make' => 'Audi']);
    
    $response = getJson('/api/v1/vehicles?make=BMW');
    
    $response->assertStatus(200)
        ->assertJsonCount(1, 'data');
});
```

### Using PHPUnit

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VehicleFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_vehicles_can_be_filtered_by_make(): void
    {
        Vehicle::factory()->create(['make' => 'BMW']);
        Vehicle::factory()->create(['make' => 'Audi']);
        
        $response = $this->getJson('/api/v1/vehicles?make=BMW');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }
}
```

---

## 🎯 Test Patterns & Best Practices

### 1. Use Database Factories

```php
// Good - Flexible and maintainable
$vehicle = Vehicle::factory()->create([
    'price' => 50000
]);

// Avoid - Hard-coded data
$vehicle = Vehicle::create([
    'make' => 'BMW',
    'model' => 'X5',
    // ... many fields
]);
```

### 2. Arrange-Act-Assert Pattern

```php
test('dealer can update own vehicle', function () {
    // Arrange
    $dealer = User::factory()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $dealer->id]);
    
    // Act
    actingAs($dealer, 'sanctum');
    $response = putJson("/api/v1/vehicles/{$vehicle->id}", [
        'price' => 60000
    ]);
    
    // Assert
    $response->assertStatus(200);
    expect($vehicle->fresh()->price)->toBe(60000);
});
```

### 3. Test Both Success and Failure Cases

```php
test('authenticated user can create vehicle', function () {
    $user = User::factory()->create();
    actingAs($user, 'sanctum');
    
    $response = postJson('/api/v1/vehicles', $validData);
    
    $response->assertStatus(201);
});

test('unauthenticated user cannot create vehicle', function () {
    $response = postJson('/api/v1/vehicles', $validData);
    
    $response->assertStatus(401);
});
```

### 4. Use Descriptive Test Names

```php
// Good
test('admin can delete any vehicle')
test('dealer cannot delete other dealers vehicles')
test('vehicle price can be filtered by range')

// Avoid
test('test delete')
test('filter test')
```

---

## 📊 Coverage Goals

### Minimum Coverage Targets

- **Overall**: 70%
- **Controllers**: 80%
- **Models**: 90%
- **Services**: 85%

### Checking Coverage

```bash
# Generate coverage report
php artisan test --coverage

# Generate HTML coverage report
php artisan test --coverage-html coverage-report

# View HTML report
open coverage-report/index.html
```

---

## 🔧 Continuous Integration

### GitHub Actions Workflow

The project includes CI workflows in `.github/workflows/`:

- `backend-tests.yml` - Runs test suite on push/PR
- `backend-ci.yml` - Linting and code quality checks

### Local Pre-commit Testing

```bash
# Before committing, run:
composer test
composer lint
composer fix  # Auto-fix code style issues
```

---

## 🐛 Debugging Tests

### Enable Debug Mode

```php
// In your test
$this->withoutExceptionHandling();

// See all SQL queries
DB::enableQueryLog();
// ... run code
dd(DB::getQueryLog());
```

### Common Issues

#### 1. Database State Issues
```bash
# Solution: Use RefreshDatabase trait
uses(RefreshDatabase::class);
```

#### 2. Authentication Issues
```bash
# Solution: Use actingAs() helper
actingAs($user, 'sanctum');
```

#### 3. JSON Response Assertions
```php
// Check response structure
$response->assertJsonStructure([
    'data' => [
        '*' => ['id', 'make', 'model']
    ]
]);

// Check exact values
$response->assertJson([
    'data' => [
        ['make' => 'BMW']
    ]
]);
```

---

## 📝 Test Checklist for New Features

When adding a new feature, ensure you test:

- [ ] Happy path (success case)
- [ ] Validation errors (invalid input)
- [ ] Authentication (logged in vs guest)
- [ ] Authorization (permissions/roles)
- [ ] Edge cases (empty data, large data, etc.)
- [ ] Database transactions (data is saved correctly)
- [ ] API response structure
- [ ] HTTP status codes

---

## 🎓 Example: Complete Test for New Endpoint

```php
<?php

use App\Models\User;
use App\Models\TestDrive;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Test Drive Booking API', function () {
    
    test('authenticated user can book test drive', function () {
        $user = User::factory()->create();
        $vehicle = Vehicle::factory()->create();
        
        actingAs($user, 'sanctum');
        
        $response = postJson('/api/v1/test-drives', [
            'vehicle_id' => $vehicle->id,
            'preferred_date' => now()->addDays(3)->toDateString(),
            'preferred_time' => '14:00',
            'notes' => 'Looking forward to the test drive'
        ]);
        
        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'vehicle_id',
                    'user_id',
                    'preferred_date',
                    'status'
                ]
            ]);
            
        expect(TestDrive::count())->toBe(1);
    });
    
    test('guest cannot book test drive', function () {
        $vehicle = Vehicle::factory()->create();
        
        $response = postJson('/api/v1/test-drives', [
            'vehicle_id' => $vehicle->id,
            'preferred_date' => now()->addDays(3)->toDateString(),
        ]);
        
        $response->assertStatus(401);
    });
    
    test('booking requires valid vehicle', function () {
        $user = User::factory()->create();
        
        actingAs($user, 'sanctum');
        
        $response = postJson('/api/v1/test-drives', [
            'vehicle_id' => 99999, // Non-existent
            'preferred_date' => now()->addDays(3)->toDateString(),
        ]);
        
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['vehicle_id']);
    });
});
```

---

## 📚 Resources

- [Laravel Testing Documentation](https://laravel.com/docs/testing)
- [Pest PHP Documentation](https://pestphp.com/)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [Laravel HTTP Tests](https://laravel.com/docs/http-tests)

---

## 🚀 Next Steps

1. ✅ Review this guide
2. ✅ Run existing tests: `php artisan test`
3. ✅ Write tests for new features
4. ✅ Aim for >70% coverage
5. ✅ Run tests before committing

---

**Status**: ✅ Testing Infrastructure Ready  
**Coverage**: Target >70%  
**Last Updated**: 29 October 2025

---

*Part of AUTOSITE Week 1 Implementation - Day 1*
