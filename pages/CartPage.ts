import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  public readonly locators: {
    cartItems: Locator;
    removeButtons: Locator;
    checkoutButton: Locator;
    itemNames: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      cartItems: this.page.locator(".cart_item"),
      removeButtons: this.page.getByRole("button", { name: /remove/i }),
      checkoutButton: this.page.getByRole("button", { name: "Checkout" }),
      itemNames: this.page.locator(".inventory_item_name"),
    };
  }

  async removeItemByIndex(itemIndex: number) {
    const removeButtons = await this.locators.removeButtons.all();
    if (removeButtons.length > itemIndex && itemIndex >= 0) {
      await removeButtons[itemIndex].click();
    }
  }
}