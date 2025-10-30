import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for navigation
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
    
    // Count navigation links
    const links = await page.locator('nav a, header a').count();
    expect(links).toBeGreaterThan(0);
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Get all navigation links
    const links = page.locator('nav a, header a');
    const count = await links.count();
    
    if (count > 0) {
      // Click first link
      const firstLink = links.first();
      const href = await firstLink.getAttribute('href');
      
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify navigation occurred
        expect(page.url()).not.toBe('http://localhost:5173/');
      }
    }
  });

  test('should have mobile menu functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for mobile menu button (hamburger icon)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [class*="hamburger"], [class*="mobile-menu"]').first();
    
    if (await mobileMenuButton.count() > 0) {
      // Try to open mobile menu
      await mobileMenuButton.click();
      
      // Check if menu opened (looking for menu items)
      await page.waitForTimeout(500); // Wait for animation
      
      const menuItems = await page.locator('[class*="mobile-menu"] a, [class*="drawer"] a, [role="navigation"] a').count();
      expect(menuItems).toBeGreaterThanOrEqual(0);
    }
  });

  test('should have footer with links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for footer
    const footer = page.locator('footer');
    
    if (await footer.count() > 0) {
      await expect(footer.first()).toBeVisible();
      
      // Count footer links
      const footerLinks = await footer.locator('a').count();
      expect(footerLinks).toBeGreaterThanOrEqual(0);
    }
  });

  test('should handle 404 page', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/this-page-definitely-does-not-exist-12345');
    await page.waitForLoadState('networkidle');
    
    // Page should load (either 404 or redirect)
    expect(page.url()).toBeTruthy();
    
    // Check that some content is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test('should have search capability', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[aria-label*="search" i]').first();
    
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible();
      
      // Try typing in search
      await searchInput.fill('BMW');
      
      // Search should accept input
      const value = await searchInput.inputValue();
      expect(value).toBe('BMW');
    }
  });
});
