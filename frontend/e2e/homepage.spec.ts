import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check page title
    await expect(page).toHaveTitle(/AutoSite|AUTOSITE/i);
  });

  test('should display main navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation elements
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that page loads on mobile viewport
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have functional search or CTA elements', async ({ page }) => {
    await page.goto('/');
    
    // Look for common interactive elements
    const hasButton = await page.locator('button').count();
    const hasLink = await page.locator('a').count();
    
    expect(hasButton + hasLink).toBeGreaterThan(0);
  });
});
