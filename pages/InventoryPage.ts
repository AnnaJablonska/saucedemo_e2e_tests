import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  public readonly locators: {
    addToCartButton: Locator;
    itemNames: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      addToCartButton: this.page.getByRole("button", { name: "Add to cart" }),
      itemNames: this.page.locator(".inventory_item_name"),
    };
  }

  async addAllItemsToCart() {
    // Get all inventory items and ensure they're all added to cart
    const inventoryItems = await this.page.locator('.inventory_item').all();
    
    for (const item of inventoryItems) {
      // Check if item has "Add to cart" button (not yet in cart)
      const addButton = item.locator('[data-test^="add-to-cart"]');
      if (await addButton.isVisible()) {
        await addButton.click();
      }
    }
  }

  async findAndClickItemByName(itemName: string) {
    await this.locators.itemNames.filter({ hasText: itemName }).first().click();
  }
}