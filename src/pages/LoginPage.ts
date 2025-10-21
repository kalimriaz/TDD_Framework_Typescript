import { Page, Locator } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    // Click and wait for dashboard navigation - more reliable for tests
    await Promise.all([
      this.page.waitForURL(/.*dashboard.*/i, { timeout: 5000 }).catch(() => {}),
      this.loginButton.click()
    ]);
  }

  async isLoggedIn(): Promise<boolean> {
    // After successful login the dashboard header appears with 'Dashboard' text
    try {
      await this.page.getByText('Dashboard').waitFor({ timeout: 3000 });
      return true;
    } catch (e) {
      return false;
    }
  }
}
