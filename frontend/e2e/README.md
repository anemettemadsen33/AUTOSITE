# E2E Tests - Playwright

This directory contains end-to-end tests for the AUTOSITE frontend application.

## Test Structure

```
e2e/
├── homepage.spec.ts       # Homepage functionality tests
├── vehicles.spec.ts       # Vehicle listing and detail tests
├── auth.spec.ts           # Authentication flow tests
├── navigation.spec.ts     # Navigation and routing tests
└── accessibility.spec.ts  # Accessibility compliance tests
```

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

### Test Commands

```bash
# Run all tests (headless)
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests with browser visible
npm run test:e2e:headed

# Run specific test file
npx playwright test homepage.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests on mobile
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Show test report
npm run test:e2e:report
```

### Development Mode

For test development, use UI mode:
```bash
npm run test:e2e:ui
```

This opens an interactive UI where you can:
- Run tests step by step
- See live browser preview
- Debug failures
- Edit tests and see results immediately

## Test Categories

### 1. Homepage Tests (`homepage.spec.ts`)
Tests basic homepage functionality:
- Page loads successfully
- Navigation elements visible
- Responsive design on mobile
- Interactive elements functional

### 2. Vehicle Tests (`vehicles.spec.ts`)
Tests vehicle-related features:
- Navigate to vehicle listings
- Display vehicle cards
- Filter functionality
- Vehicle detail page
- Image galleries

### 3. Authentication Tests (`auth.spec.ts`)
Tests user authentication:
- Login page access
- Login form validation
- Registration page
- Password security
- Protected routes

### 4. Navigation Tests (`navigation.spec.ts`)
Tests site navigation:
- Navigation menu functionality
- Page-to-page navigation
- Mobile menu
- Footer links
- 404 page handling
- Search functionality

### 5. Accessibility Tests (`accessibility.spec.ts`)
Tests accessibility compliance:
- Page structure (headings, landmarks)
- Image alt tags
- Keyboard navigation
- Form labels
- Color contrast

## Writing New Tests

### Basic Test Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate to page
    await page.goto('/');
    
    // Interact with elements
    await page.click('button');
    
    // Make assertions
    await expect(page.locator('h1')).toHaveText('Expected Text');
  });
});
```

### Best Practices

1. **Use Data Test IDs**
   ```html
   <button data-testid="submit-button">Submit</button>
   ```
   ```typescript
   await page.locator('[data-testid="submit-button"]').click();
   ```

2. **Wait for Network Idle**
   ```typescript
   await page.goto('/');
   await page.waitForLoadState('networkidle');
   ```

3. **Use Explicit Waits**
   ```typescript
   await expect(page.locator('h1')).toBeVisible();
   await page.waitForSelector('[data-testid="content"]');
   ```

4. **Test Isolation**
   - Each test should be independent
   - Don't rely on test execution order
   - Clean up after tests if needed

5. **Meaningful Descriptions**
   ```typescript
   test('should display error message when login fails', async ({ page }) => {
     // Test implementation
   });
   ```

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Daily at 2 AM UTC (scheduled)

### Workflow File
`.github/workflows/e2e-tests.yml`

### Artifacts
On test failure:
- Screenshots: `frontend/test-results/`
- Videos: `frontend/test-results/`
- HTML Report: `frontend/playwright-report/`

These are automatically uploaded to GitHub Actions artifacts.

## Configuration

### Playwright Config
`playwright.config.ts`

Key settings:
- **Base URL**: http://localhost:5173
- **Timeout**: 30 seconds per test
- **Retries**: 2 (CI only)
- **Workers**: 1 (CI), undefined (local)
- **Screenshots**: On failure
- **Videos**: On failure
- **Trace**: On first retry

### Browsers Tested
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit (Safari Desktop)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Debugging

### View Test Results
```bash
npm run test:e2e:report
```

### Debug Specific Test
```bash
npx playwright test homepage.spec.ts --debug
```

### Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Screenshots and Videos
After test run, check:
- `test-results/` - Screenshots and videos
- `playwright-report/` - HTML report

### Playwright Inspector
```bash
PWDEBUG=1 npx playwright test
```

## Troubleshooting

### Tests Timing Out
- Increase timeout in playwright.config.ts
- Check if application is running
- Verify network conditions

### Elements Not Found
- Use `page.waitForSelector()` before interacting
- Check if element is visible: `await expect(locator).toBeVisible()`
- Verify selector is correct

### Flaky Tests
- Add explicit waits
- Wait for network idle: `await page.waitForLoadState('networkidle')`
- Increase retry count
- Check for race conditions

### CI Tests Failing
- Run tests locally with same configuration
- Check GitHub Actions logs
- Verify environment variables
- Ensure backend is running in CI

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API](https://playwright.dev/docs/api/class-playwright)
- [Test Selectors](https://playwright.dev/docs/selectors)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

## Support

For issues or questions:
1. Check this README
2. Consult Playwright documentation
3. Review test examples in this directory
4. Ask the development team

---

**Last Updated**: October 30, 2025  
**Playwright Version**: 1.56.1  
**Test Count**: 20+ tests across 5 files
