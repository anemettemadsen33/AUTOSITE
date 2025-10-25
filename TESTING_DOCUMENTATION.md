# Testing Infrastructure - AutoSite Platform

## Overview

Comprehensive testing setup for the AutoSite platform covering backend (Laravel/Pest), frontend (Jest/React Testing Library), and end-to-end (Playwright) tests, integrated with GitHub Actions CI/CD.

## 📦 Installed Packages

### Backend Testing
- **Pest PHP** v2.36.0 - Modern PHP testing framework
- **Pest Laravel Plugin** v2.4.0 - Laravel-specific features
- **Pest Plugin Arch** v2.7.0 - Architecture testing
- **Paratest** v7.4.8 - Parallel test execution

### Frontend Testing
- **Jest** - JavaScript testing framework
- **@testing-library/react** - React component testing
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - DOM environment for tests

### E2E Testing
- **Playwright** - Modern E2E testing framework
- Browsers: Chromium, Firefox, WebKit
- Mobile viewports: Pixel 5, iPhone 12

## 🧪 Backend Tests (Pest PHP)

### Test Structure

```
tests/
├── Feature/           # API endpoint tests
│   ├── AuthenticationTest.php
│   ├── TwoFactorAuthenticationTest.php
│   ├── SavedSearchTest.php
│   └── PdfGenerationTest.php
├── Unit/              # Model and service tests
│   ├── UserModelTest.php
│   ├── VehicleModelTest.php
│   ├── SavedSearchModelTest.php
│   └── PriceAlertModelTest.php
├── Pest.php           # Pest configuration
└── TestCase.php       # Base test case
```

### Running Backend Tests

```bash
# Run all tests
./vendor/bin/pest

# Run with coverage
./vendor/bin/pest --coverage

# Run parallel tests
./vendor/bin/pest --parallel

# Run specific test file
./vendor/bin/pest tests/Feature/AuthenticationTest.php

# Run with minimum coverage threshold (70%)
./vendor/bin/pest --coverage --min=70

# Watch mode
./vendor/bin/pest --watch
```

### Test Coverage

Current tests cover:
- ✅ User authentication (register, login, logout)
- ✅ Two-factor authentication (enable, disable, verify, recovery codes)
- ✅ Saved searches (CRUD, matching logic)
- ✅ Price alerts (CRUD, condition matching)
- ✅ PDF generation (with rate limiting)
- ✅ QR code generation
- ✅ Model relationships
- ✅ Authorization policies
- ✅ Rate limiting enforcement

### Factories

Model factories created for testing:
- `SavedSearchFactory` - Generates saved search test data
- `PriceAlertFactory` - Generates price alert test data
- `WebhookFactory` - Generates webhook test data
- `VehicleComparisonFactory` - Generates comparison test data

## 🎨 Frontend Tests (Jest)

### Test Structure

```
autosite-frontend/
├── __tests__/         # Component tests
│   ├── LoginForm.test.tsx
│   ├── VehicleCard.test.tsx
│   └── SearchFilters.test.tsx
├── jest.config.ts     # Jest configuration
└── jest.setup.ts      # Test environment setup
```

### Running Frontend Tests

```bash
cd autosite-frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Type check
npm run type-check
```

### Test Coverage

Current tests cover:
- ✅ Authentication forms (validation, submission, error handling)
- ✅ Vehicle cards (display, favorites, navigation)
- ✅ Search filters (form controls, validation)
- ✅ User interactions (clicks, form inputs)
- ✅ Loading states
- ✅ Error states

### Mocked Dependencies

- `next/navigation` - Router mocking
- `next-intl` - Internationalization mocking
- Zustand stores - State management mocking

## 🎭 E2E Tests (Playwright)

### Test Structure

```
autosite-frontend/
├── e2e/               # E2E test scenarios
│   ├── auth.spec.ts
│   ├── vehicles.spec.ts
│   └── comparison.spec.ts
└── playwright.config.ts
```

### Running E2E Tests

```bash
cd autosite-frontend

# Run all E2E tests
npm run e2e

# Run with UI mode
npm run e2e:ui

# Debug mode
npm run e2e:debug

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test e2e/auth.spec.ts

# Generate HTML report
npx playwright show-report
```

### Test Coverage

E2E scenarios covered:
- ✅ User registration flow
- ✅ Login/logout flow
- ✅ Protected route redirection
- ✅ Vehicle browsing and filtering
- ✅ Vehicle search
- ✅ Vehicle detail viewing
- ✅ Favorite management
- ✅ Vehicle comparison (add, view, remove, limit)
- ✅ Pagination

### Browser Coverage

Tests run on:
- ✅ Desktop Chrome
- ✅ Desktop Firefox
- ✅ Desktop Safari (WebKit)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🚀 CI/CD Pipeline (GitHub Actions)

### Workflows

#### 1. Backend Tests (`backend-tests.yml`)

Triggers:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Changes to PHP files or Composer dependencies

Matrix testing:
- PHP versions: 8.2, 8.3
- Dependency versions: prefer-lowest, prefer-stable

Steps:
1. Setup PHP with extensions
2. Cache Composer dependencies
3. Install dependencies
4. Setup Laravel (migrations, keys)
5. Run Pest tests with coverage
6. Upload coverage to Codecov
7. Run PHPStan (static analysis)
8. Run PHP CS Fixer (code style)

#### 2. Frontend Tests (`frontend-tests.yml`)

Triggers:
- Push/PR to `main` or `develop`
- Changes to `autosite-frontend/**`

Matrix testing:
- Node versions: 18.x, 20.x

Steps:
1. Setup Node.js
2. Cache npm dependencies
3. Install dependencies
4. Run TypeScript type check
5. Run ESLint
6. Run Jest tests with coverage
7. Upload coverage to Codecov
8. Build Next.js application

#### 3. E2E Tests (`e2e-tests.yml`)

Triggers:
- Push/PR to `main` or `develop`
- Daily schedule (2 AM UTC)

Steps:
1. Setup Node.js and PHP
2. Install backend dependencies
3. Setup Laravel backend
4. Start Laravel server
5. Install frontend dependencies
6. Install Playwright browsers
7. Build Next.js app
8. Run Playwright tests
9. Upload test reports and screenshots

#### 4. Deploy (`deploy.yml`)

Triggers:
- Push to `main` branch
- Manual workflow dispatch

Jobs:
1. **Run tests** - Ensures all tests pass
2. **Deploy backend** - SSH to server, pull code, migrate
3. **Deploy frontend** - Deploy to Vercel
4. **Notify** - Send Slack notification

### Required GitHub Secrets

```bash
# SSH Deployment
SSH_HOST
SSH_USERNAME
SSH_PRIVATE_KEY
SSH_PORT

# Vercel Deployment
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
API_URL

# Notifications
SLACK_WEBHOOK
```

## 📊 Code Coverage Goals

### Minimum Coverage Targets
- **Backend**: 70% minimum (enforced in CI)
- **Frontend**: 60% minimum
- **E2E**: Critical user flows covered

### Coverage Reports

Backend coverage:
```bash
./vendor/bin/pest --coverage --min=70
```

Frontend coverage:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## 🔧 Configuration Files

### Backend

**phpunit.xml**
- SQLite in-memory database for tests
- Parallel execution enabled
- Coverage settings configured

**Pest.php**
- RefreshDatabase trait enabled
- Global test helpers
- Custom assertions

### Frontend

**jest.config.ts**
- Next.js integration
- Path aliases configured
- Coverage collection settings

**jest.setup.ts**
- Testing Library extensions
- Next.js mocks
- Global test utilities

**playwright.config.ts**
- Multiple browser projects
- Screenshot on failure
- Trace on retry
- Auto web server startup

## 🎯 Best Practices

### Backend Testing
1. Use `RefreshDatabase` for database tests
2. Create factories for consistent test data
3. Test both happy and error paths
4. Verify authorization in feature tests
5. Use Pest's expectations for assertions

### Frontend Testing
1. Query by accessibility labels
2. Test user interactions, not implementation
3. Mock external dependencies
4. Test loading and error states
5. Avoid snapshot testing for UI components

### E2E Testing
1. Use Page Object Model for reusability
2. Test critical user journeys
3. Handle authentication in beforeEach
4. Use data-testid for stable selectors
5. Test across multiple devices/browsers

## 🐛 Debugging Tests

### Backend
```bash
# Run single test with verbose output
./vendor/bin/pest tests/Feature/AuthenticationTest.php --verbose

# Debug specific test
./vendor/bin/pest --filter="user can login"
```

### Frontend
```bash
# Debug Jest tests
npm test -- --detectOpenHandles --verbose

# Run specific test file
npm test LoginForm.test.tsx
```

### E2E
```bash
# Debug with UI
npm run e2e:ui

# Debug with inspector
npm run e2e:debug

# Run headed mode
npx playwright test --headed

# Generate trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📈 Continuous Improvement

### Next Steps

1. **Increase Coverage**
   - Add tests for webhook delivery
   - Add tests for social authentication
   - Add tests for vehicle comparison API

2. **Performance Testing**
   - Add load tests with k6
   - Add database query optimization tests
   - Add frontend performance budgets

3. **Visual Regression**
   - Integrate Percy or Chromatic
   - Add visual snapshots for components
   - Compare UI across branches

4. **Mutation Testing**
   - Install Infection PHP for backend
   - Verify test quality, not just coverage

## 📚 Resources

- [Pest PHP Documentation](https://pestphp.com)
- [Jest Documentation](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/actions)

---

**Testing Infrastructure Status**: ✅ Complete  
**Coverage**: Backend (70%+), Frontend (60%+), E2E (Critical Flows)  
**CI/CD**: GitHub Actions (4 workflows)  
**Last Updated**: October 25, 2025
