import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';

test.describe('OrangeHRM login flow - TDD example', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    // Given the login page is open
    await expect(page).toHaveURL(/auth\/login/);

    // When I login with valid credentials
    await login.login('Admin', 'admin123');

    // Then I should see the dashboard heading
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
  });
});
