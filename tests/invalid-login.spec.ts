import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';

// Load credentials from CSV (simple CommonJS loader)
// @ts-ignore: require used for a small test helper
const { loadCredentials } = require('../src/utils/credentials');
const creds = loadCredentials();
const invalid = (creds as any).find((c: any) => c.label === 'invalid');

test('shows error message on invalid login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  await login.login(invalid.username, invalid.password);

  // The demo app shows an error message on failed login
  await expect(page.getByText(/Invalid credentials/i)).toBeVisible({ timeout: 5000 });
});
