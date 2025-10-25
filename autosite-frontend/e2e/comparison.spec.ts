import { test, expect } from '@playwright/test';

test.describe('Vehicle Comparison Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/en/auth/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.goto('/en/vehicles');
  });

  test('can add vehicles to comparison', async ({ page }) => {
    // Add first vehicle to comparison
    const compareBtn1 = page.locator('[data-testid="compare-btn"]').first();
    await compareBtn1.click();

    // Verify comparison counter updates
    const compareCount = page.locator('[data-testid="compare-count"]');
    await expect(compareCount).toHaveText('1');

    // Add second vehicle
    const compareBtn2 = page.locator('[data-testid="compare-btn"]').nth(1);
    await compareBtn2.click();

    await expect(compareCount).toHaveText('2');
  });

  test('can view comparison page', async ({ page }) => {
    // Add 2 vehicles to comparison
    await page.locator('[data-testid="compare-btn"]').first().click();
    await page.locator('[data-testid="compare-btn"]').nth(1).click();

    // Navigate to comparison page
    await page.click('[data-testid="view-comparison"]');

    // Verify comparison page loads
    await expect(page).toHaveURL(/.*compare/);

    // Verify 2 vehicles are displayed
    const vehicles = page.locator('[data-testid="comparison-vehicle"]');
    await expect(vehicles).toHaveCount(2);
  });

  test('can remove vehicle from comparison', async ({ page }) => {
    // Add vehicle
    await page.locator('[data-testid="compare-btn"]').first().click();

    // Go to comparison page
    await page.click('[data-testid="view-comparison"]');

    // Remove vehicle
    await page.click('[data-testid="remove-from-comparison"]');

    // Verify empty state
    await expect(page.locator('text=/no vehicles to compare/i')).toBeVisible();
  });

  test('comparison limited to 4 vehicles', async ({ page }) => {
    // Try to add 5 vehicles
    for (let i = 0; i < 5; i++) {
      const btn = page.locator('[data-testid="compare-btn"]').nth(i);
      await btn.click();
    }

    // Verify only 4 are added
    const compareCount = page.locator('[data-testid="compare-count"]');
    await expect(compareCount).toHaveText('4');

    // Verify error message for 5th vehicle
    await expect(page.locator('text=/maximum 4 vehicles/i')).toBeVisible();
  });
});
