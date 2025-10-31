import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';


let loginPage: LoginPage,
  inventoryPage: InventoryPage,
  cartPage: CartPage,
  checkoutPage: CheckoutPage;
  
const password = "secret_sauce"; // normally would store in env variable or config file

test.describe("Saucedemo Purchase Flow Tests", () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto("/");
  });

  test("Complete purchase flow with item removal - as a standard_user", async ({
    page,
  }) => {
    await test.step("Log in as a standard user", async () => {
      await loginPage.login("standard_user", password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Add all items to the cart", async () => {
      await inventoryPage.addAllItemsToCart();

      const cartItemsCount = await inventoryPage.getCartItemsCount();
      expect(cartItemsCount).toBe("6");
    });

    await test.step("Go to the cart", async () => {
      await inventoryPage.commonLocators.shoppingCartLink.click();
      await expect(page).toHaveURL(/cart/);
    });

    await test.step("Find third item and remove it from the cart", async () => {
      await cartPage.removeItemByIndex(2); // Remove third item (index 2)
      const itemsCountAfterRemoval = await cartPage.locators.cartItems.count();
      expect(itemsCountAfterRemoval).toBe(5);
    });

    await test.step("Proceed to checkout", async () => {
      await cartPage.locators.checkoutButton.click();
      await expect(page).toHaveURL(/checkout-step-one/);
    });

    await test.step("Fill shipping information", async () => {
      await checkoutPage.fillShippingInformation();
      await expect(page).toHaveURL(/checkout-step-two/);
    });

    await test.step("Validate checkout overview contains correct items and total", async () => {
      const overviewItems = await checkoutPage.locators.inventoryItemNames.allTextContents();
      const overviewItemsCount = await checkoutPage.locators.cartItems.count();
      const totalAmount = await checkoutPage.locators.summaryTotalLabel.textContent() || '';

      expect(overviewItemsCount).toBe(5);
      expect(overviewItems.length).toBe(5);
      expect(totalAmount).toContain("Total:");
    });

    await test.step("Finish the purchase", async () => {
        await checkoutPage.locators.finishButton.click();
        await expect(page).toHaveURL(/checkout-complete/);
    });

    await test.step("Validate that the website confirms the order", async () => {
      const isConfirmationDisplayed =
        await checkoutPage.locators.orderConfirmationText.isVisible();
      const confirmationMessage = await checkoutPage.locators.orderConfirmationText.textContent() || '';

      expect(isConfirmationDisplayed).toBe(true);
      expect(confirmationMessage).toBe("Thank you for your order!");
    });
  });

    // This test is marked as fixme due to known issues with problem_user on the page. 
    //I would investigate and report the issue to developers before re-enabling the test.
  test.fixme("Add single item to cart - as a problem_user", async ({ page }) => {
    await test.step("Log in as a problem user", async () => {
      await loginPage.login("problem_user", password);

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step("Find one item by name and click on it", async () => {
      await inventoryPage.findAndClickItemByName("Sauce Labs Onesie");
      await expect(page).toHaveURL(/inventory-item/);
    });

    await test.step("Add item to cart from item page", async () => {
      await page.locator('[data-test="add-to-cart"]').click();
      const cartItemsCount = await inventoryPage.getCartItemsCount();
      await expect(cartItemsCount).toBe("1");
    });

    await test.step("Go to the cart", async () => {
      await inventoryPage.commonLocators.shoppingCartLink.click();
      await expect(page).toHaveURL(/cart/);
    });

    await test.step("Validate that item was added", async () => {
      const isItemInCart = await cartPage.locators.itemNames.filter({ hasText: "Sauce Labs Backpack" }).isVisible();
      const cartItemsCount = await cartPage.locators.cartItems.count();

      expect(isItemInCart).toBe(true);
      expect(cartItemsCount).toBe(1);
    });
  });
});