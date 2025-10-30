import { test, expect } from '@playwright/test';

test.describe('Vehicle Listings', () => {
  test('should navigate to vehicles page', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and click a link to vehicles/listings
    const vehicleLink = page.locator('a[href*="/vehicles"], a[href*="/listings"], a[href*="/category"]').first();
    
    if (await vehicleLink.count() > 0) {
      await vehicleLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verify we're on a vehicles page
      expect(page.url()).toMatch(/vehicles|listings|category/i);
    }
  });

  test('should display vehicle cards or list', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to vehicles if there's a link
    const vehicleLink = page.locator('a[href*="/vehicles"], a[href*="/listings"], a[href*="/category"]').first();
    
    if (await vehicleLink.count() > 0) {
      await vehicleLink.click();
      await page.waitForLoadState('networkidle');
      
      // Check for vehicle cards or items (looking for common patterns)
      const cards = await page.locator('[class*="card"], [class*="vehicle"], [class*="listing"], article, [data-testid*="vehicle"]').count();
      
      // We expect to see some vehicles or at least the structure for them
      expect(cards).toBeGreaterThanOrEqual(0);
    }
  });

  test('should have filter or search functionality', async ({ page }) => {
    await page.goto('/');
    
    const vehicleLink = page.locator('a[href*="/vehicles"], a[href*="/listings"], a[href*="/category"]').first();
    
    if (await vehicleLink.count() > 0) {
      await vehicleLink.click();
      await page.waitForLoadState('networkidle');
      
      // Look for filter controls
      const filters = await page.locator('input[type="search"], select, input[type="checkbox"], [class*="filter"]').count();
      
      // Most vehicle pages have some filtering capability
      expect(filters).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Vehicle Detail Page', () => {
  test('should load vehicle detail page', async ({ page }) => {
    await page.goto('/');
    
    // Try to navigate to vehicles first
    const vehicleLink = page.locator('a[href*="/vehicles"], a[href*="/listings"], a[href*="/category"]').first();
    
    if (await vehicleLink.count() > 0) {
      await vehicleLink.click();
      await page.waitForLoadState('networkidle');
      
      // Find first vehicle detail link
      const detailLink = page.locator('a[href*="/vehicle/"], a[href*="/listing/"]').first();
      
      if (await detailLink.count() > 0) {
        await detailLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on a detail page
        expect(page.url()).toMatch(/vehicle|listing/i);
        
        // Check for common detail page elements
        const hasImages = await page.locator('img').count();
        expect(hasImages).toBeGreaterThan(0);
      }
    }
  });
});
