import { test, expect } from '@playwright/test';
import LoginPage from '../src/pages/LoginPage';

test('shows error message on invalid login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  await login.login('invalid', 'wrong');

  // The demo app shows an error message on failed login
  await expect(page.getByText(/Invalid credentials/i)).toBeVisible({ timeout: 5000 });
});
