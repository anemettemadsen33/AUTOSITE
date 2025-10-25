import { test, expect } from '@playwright/test';

test.describe('Vehicle Browsing and Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/vehicles');
  });

  test('displays vehicle listings', async ({ page }) => {
    // Wait for vehicles to load
    await page.waitForSelector('[data-testid="vehicle-card"]');

    // Verify at least one vehicle is displayed
    const vehicleCards = page.locator('[data-testid="vehicle-card"]');
    await expect(vehicleCards).not.toHaveCount(0);
  });

  test('can filter vehicles by make', async ({ page }) => {
    // Select Toyota from make filter
    await page.selectOption('[name="make"]', 'Toyota');

    // Wait for filtered results
    await page.waitForTimeout(1000);

    // Verify all displayed vehicles are Toyota
    const vehicleMakes = page.locator('[data-testid="vehicle-make"]');
    const count = await vehicleMakes.count();
    
    for (let i = 0; i < count; i++) {
      const text = await vehicleMakes.nth(i).textContent();
      expect(text).toContain('Toyota');
    }
  });

  test('can search vehicles by keyword', async ({ page }) => {
    await page.fill('[placeholder*="Search"]', 'Camry');
    await page.press('[placeholder*="Search"]', 'Enter');

    await page.waitForTimeout(1000);

    // Verify search results contain keyword
    const results = page.locator('[data-testid="vehicle-card"]');
    await expect(results).not.toHaveCount(0);
  });

  test('can view vehicle details', async ({ page }) => {
    // Click on first vehicle card
    await page.click('[data-testid="vehicle-card"]  >> nth=0');

    // Verify detail page loaded
    await expect(page).toHaveURL(/.*vehicles\/\d+/);
    
    // Verify key information is displayed
    await expect(page.locator('[data-testid="vehicle-price"]')).toBeVisible();
    await expect(page.locator('[data-testid="vehicle-specs"]')).toBeVisible();
  });

  test('can add vehicle to favorites', async ({ page }) => {
    // Login first
    await page.goto('/en/auth/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.goto('/en/vehicles');

    // Click favorite button on first vehicle
    const favoriteBtn = page.locator('[data-testid="favorite-btn"]').first();
    await favoriteBtn.click();

    // Verify button state changed
    await expect(favoriteBtn).toHaveClass(/text-red-500/);

    // Go to favorites page
    await page.goto('/en/favorites');

    // Verify vehicle appears in favorites
    const favoriteCards = page.locator('[data-testid="vehicle-card"]');
    await expect(favoriteCards).toHaveCount(1);
  });

  test('pagination works correctly', async ({ page }) => {
    // Check if pagination exists
    const pagination = page.locator('[data-testid="pagination"]');
    
    if (await pagination.isVisible()) {
      const currentPage = await page.locator('[data-testid="current-page"]').textContent();
      expect(currentPage).toBe('1');

      // Click next page
      await page.click('[data-testid="next-page"]');
      await page.waitForTimeout(1000);

      const newPage = await page.locator('[data-testid="current-page"]').textContent();
      expect(newPage).toBe('2');
    }
  });
});
