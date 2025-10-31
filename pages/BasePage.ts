import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  public readonly commonLocators: {
    cartBadge: Locator;
    shoppingCartLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.commonLocators = this.initializeCommonLocators();
  }

  private initializeCommonLocators() {
    return {
      cartBadge: this.page.locator(".shopping_cart_badge"),
      shoppingCartLink: this.page.locator('[data-test="shopping-cart-link"]'),
    };
  }

  async getCartItemsCount(): Promise<string> {
    try {
      const badgeText = await this.commonLocators.cartBadge.textContent({ timeout: 5000 });
      return badgeText || '0';
    } catch {
      return '0';
    }
  }
}