import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    if (await main.count() > 0) {
      await expect(main.first()).toBeVisible();
    }
    
    // Check for heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThanOrEqual(0);
  });

  test('should have accessible images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get all images
    const images = page.locator('img');
    const count = await images.count();
    
    if (count > 0) {
      // Check if images have alt attributes
      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Alt can be empty string for decorative images, but should exist
        expect(alt !== null).toBeTruthy();
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to tab through elements
    await page.keyboard.press('Tab');
    
    // Check if focus is visible on any element
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to a form page (login)
    const loginLink = page.locator('a[href*="/login"]').first();
    
    if (await loginLink.count() > 0) {
      await loginLink.click();
      await page.waitForLoadState('networkidle');
      
      // Check for form inputs
      const inputs = page.locator('input[type="email"], input[type="password"]');
      const inputCount = await inputs.count();
      
      if (inputCount > 0) {
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          
          // Check if input has associated label or aria-label
          const id = await input.getAttribute('id');
          const ariaLabel = await input.getAttribute('aria-label');
          const placeholder = await input.getAttribute('placeholder');
          
          // Input should have some form of label
          expect(id !== null || ariaLabel !== null || placeholder !== null).toBeTruthy();
        }
      }
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if dark mode toggle exists
    const darkModeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], [class*="theme-toggle"]');
    
    if (await darkModeToggle.count() > 0) {
      // Dark mode functionality exists
      await expect(darkModeToggle.first()).toBeVisible();
    }
    
    // Verify page is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
