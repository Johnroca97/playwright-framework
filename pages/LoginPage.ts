import { Page, Locator } from '@playwright/test';
import { UserData, URLS, API } from '../test-data/users';

class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator('[value="Login"]');
  }

  async goto() {
    await this.page.goto(URLS.LOGIN);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillEmail(email: string) {
    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(user: UserData) {
    await this.fillEmail(user.userEmail);
    await this.fillPassword(user.userPassword);
  }

  async loginAndCaptureResponse(user: UserData): Promise<number> {
    const responsePromise = this.page.waitForResponse(
      (res) =>
        res.url().includes(API.LOGIN) &&
        res.request().method() === 'POST'
    );

    await this.login(user);
    await this.clickLogin();

    const response = await responsePromise;
    return response.status();
  }
}

export default LoginPage;
