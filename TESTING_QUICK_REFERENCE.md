# 🧪 Testing Quick Reference

## Run Tests

### Backend
```bash
./vendor/bin/pest                    # All tests
./vendor/bin/pest --coverage         # With coverage
./vendor/bin/pest --parallel         # Parallel
./vendor/bin/pest --filter=login     # Specific test
```

### Frontend
```bash
cd autosite-frontend
npm test                             # All tests
npm run test:coverage                # With coverage
npm run test:watch                   # Watch mode
```

### E2E
```bash
cd autosite-frontend
npm run e2e                          # All browsers
npm run e2e:ui                       # Interactive UI
npx playwright test --project=chromium   # Single browser
```

## Test Files Created

### Backend (43 tests)
- `tests/Unit/UserModelTest.php` (7 tests)
- `tests/Unit/VehicleModelTest.php` (7 tests)
- `tests/Unit/SavedSearchModelTest.php` (4 tests)
- `tests/Unit/PriceAlertModelTest.php` (4 tests)
- `tests/Feature/AuthenticationTest.php` (6 tests)
- `tests/Feature/TwoFactorAuthenticationTest.php` (5 tests)
- `tests/Feature/SavedSearchTest.php` (6 tests)
- `tests/Feature/PdfGenerationTest.php` (4 tests)

### Frontend (14 tests)
- `__tests__/LoginForm.test.tsx` (5 tests)
- `__tests__/VehicleCard.test.tsx` (5 tests)
- `__tests__/SearchFilters.test.tsx` (4 tests)

### E2E (15 scenarios)
- `e2e/auth.spec.ts` (5 scenarios)
- `e2e/vehicles.spec.ts` (6 scenarios)
- `e2e/comparison.spec.ts` (4 scenarios)

## CI/CD Workflows

- `.github/workflows/backend-tests.yml` - Backend testing (PHP 8.2/8.3)
- `.github/workflows/frontend-tests.yml` - Frontend testing (Node 18/20)
- `.github/workflows/e2e-tests.yml` - E2E testing (all browsers)
- `.github/workflows/deploy.yml` - Production deployment

## Coverage Goals

- Backend: 70% minimum ✅
- Frontend: 60% minimum ✅
- E2E: Critical flows ✅

## Total: 72 Tests Across All Layers

---
**Status**: ✅ All testing infrastructure complete and production-ready
