import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('user can register a new account', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Sign Up');
    await expect(page).toHaveURL(/.*register/);

    // Fill registration form
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="password_confirmation"]', 'password123');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('user can login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Sign In');
    await expect(page).toHaveURL(/.*login/);

    // Fill login form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify successful login
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('user cannot login with invalid credentials', async ({ page }) => {
    await page.click('text=Sign In');
    
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=/invalid credentials/i')).toBeVisible();
    await expect(page).not.toHaveURL(/.*dashboard/);
  });

  test('user can logout', async ({ page, context }) => {
    // Login first
    await page.goto('/en/auth/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/.*dashboard/);

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');

    // Verify redirect to home
    await expect(page).toHaveURL('/en');
    
    // Verify user menu is gone
    await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible();
  });

  test('protected pages redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/en/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });
});
