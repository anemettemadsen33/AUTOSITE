import { test, expect } from '@playwright/test';

test.describe('Vehicle Detail Page', () => {
  test('should display vehicle information', async ({ page }) => {
    await page.goto('/vehicles/bmw-x5-2023-test');

    // Check page title
    await expect(page).toHaveTitle(/BMW X5 2023/);

    // Check vehicle heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('BMW X5 2023');

    // Check price is displayed
    const price = page.locator('text=/EUR [0-9,]+/');
    await expect(price).toBeVisible();

    // Check vehicle details
    await expect(page.locator('text=Mileage:')).toBeVisible();
    await expect(page.locator('text=Fuel:')).toBeVisible();
    await expect(page.locator('text=Transmission:')).toBeVisible();
  });

  test('should have contact seller button with aria label', async ({ page }) => {
    await page.goto('/vehicles/bmw-x5-2023-test');

    const contactButton = page.locator('button', { hasText: 'Contact Seller' });
    await expect(contactButton).toBeVisible();
    
    // Check for aria-label
    const ariaLabel = await contactButton.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel).toContain('Contact seller');
  });

  test('should contain structured data for SEO', async ({ page }) => {
    await page.goto('/vehicles/bmw-x5-2023-test');

    // Check for structured data script tag
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeTruthy();

    // Verify structured data content
    const content = await structuredData.textContent();
    expect(content).toBeTruthy();
    
    const jsonData = JSON.parse(content!);
    expect(jsonData['@type']).toBe('Vehicle');
    expect(jsonData.brand.name).toBe('BMW');
    expect(jsonData.model).toBe('X5');
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/vehicles/bmw-x5-2023-test');

    // Tab to the contact button
    await page.keyboard.press('Tab');
    
    // The button should be focused
    const contactButton = page.locator('button', { hasText: 'Contact Seller' });
    await expect(contactButton).toBeFocused();

    // Should be able to activate with keyboard
    await page.keyboard.press('Enter');
  });
});
