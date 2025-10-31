import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Product Name Sorting Tests", () => {
  let loginPage: LoginPage;

  const password = "secret_sauce"; // normally would store in env variable or config file

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("Sort products by name (A to Z) - as a standard_user", async ({
    page,
  }) => {
    await test.step("Log in as a standard user", async () => {
      await loginPage.login("standard_user", password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Sort products by name (A to Z)", async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption("az");
    });

    await test.step("Validate that items are sorted as expected", async () => {
      // Get all product names
      const productNames = await page
        .locator(".inventory_item_name")
        .allTextContents();

      const expectedSorted = [...productNames].sort();
      expect(productNames).toEqual(expectedSorted);

      expect(productNames[0]).toBe("Sauce Labs Backpack");
      expect(productNames[productNames.length - 1]).toBe(
        "Test.allTheThings() T-Shirt (Red)"
      );
    });
  });

  test("Sort products by name (Z to A) - as a standard_user", async ({
    page,
  }) => {
    await test.step("Log in as a standard user", async () => {
      await loginPage.login("standard_user", password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Sort products by name (Z to A)", async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption("za");
    });

    await test.step("Validate that items are sorted as expected", async () => {
      // Get all product names
      const productNames = await page
        .locator(".inventory_item_name")
        .allTextContents();

      const expectedSorted = [...productNames].sort().reverse();
      expect(productNames).toEqual(expectedSorted);
      expect(productNames[0]).toBe("Test.allTheThings() T-Shirt (Red)");
      expect(productNames[productNames.length - 1]).toBe("Sauce Labs Backpack");
    });
  });

  test("Verify default sorting is Name (A to Z)", async ({ page }) => {
    await test.step("Log in as a standard user", async () => {
      await loginPage.login("standard_user", password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Validate default sorting is Name (A to Z)", async () => {
      const sortDropdown = page.locator('[data-test="product-sort-container"]');
      const selectedValue = await sortDropdown.inputValue();

      expect(selectedValue).toBe("az");
      const productNames = await page
        .locator(".inventory_item_name")
        .allTextContents();
      const expectedSorted = [...productNames].sort();

      expect(productNames).toEqual(expectedSorted);
    });
  });
});