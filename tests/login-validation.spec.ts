import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

  let loginPage: LoginPage;
  const password = "secret_sauce"; // normally would store in env variable or config file
test.describe("Login Validation Tests", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("Login failure validation - as a locked_out_user", async ({ page }) => {
    await loginPage.login("locked_out_user", password);
    await expect(page.getByText(
      "Epic sadface: Sorry, this user has been locked out"
    )).toBeVisible();
  });
});
