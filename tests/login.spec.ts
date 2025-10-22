import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';
// Load credentials from CSV (simple CommonJS loader)
// @ts-ignore: require used for a small test helper
const { loadCredentials } = require('../src/utils/credentials');

const creds = loadCredentials();
const valid = (creds as any).find((c: any) => c.label === 'valid');

test.describe('OrangeHRM login flow - TDD example', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    // Given the login page is open
    await expect(page).toHaveURL(/auth\/login/);

  // When I login with valid credentials (loaded from data/credentials.csv)
  await login.login(valid.username, valid.password);

    // Then I should see the dashboard heading
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
  });
});
