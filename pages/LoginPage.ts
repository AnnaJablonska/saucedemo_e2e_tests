import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  public readonly locators: {
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      usernameInput: this.page.getByPlaceholder("Username"),
      passwordInput: this.page.getByPlaceholder("Password"),
      loginButton: this.page.getByRole("button", { name: "Login" }),
    };
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }
}