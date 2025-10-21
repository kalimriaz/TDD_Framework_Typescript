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
    // Navigate and wait for the DOM to be interactive
    await this.page.goto('/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    // Wait for the username input to be visible before proceeding
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(username: string, password: string) {
    // Ensure inputs are present before interacting
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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
