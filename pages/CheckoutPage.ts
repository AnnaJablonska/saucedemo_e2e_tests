import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  public readonly locators: {
    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    finishButton: Locator;
    inventoryItemNames: Locator;
    cartItems: Locator;
    summaryTotalLabel: Locator;
    orderConfirmationText: Locator;
  };

  constructor(page: Page) {
    super(page);
    this.locators = this.initializeLocators();
  }

  private initializeLocators() {
    return {
      firstNameInput: this.page.getByPlaceholder("First Name"),
      lastNameInput: this.page.getByPlaceholder("Last Name"),
      postalCodeInput: this.page.getByPlaceholder("ZIP/Postal Code"),
      continueButton: this.page.getByRole("button", { name: "Continue" }),
      finishButton: this.page.getByRole("button", { name: "Finish" }),
      inventoryItemNames: this.page.locator(".inventory_item_name"),
      cartItems: this.page.locator(".cart_item"),
      summaryTotalLabel: this.page.locator(".summary_total_label"),
      orderConfirmationText: this.page.getByText("Thank you for your order!"),
    };
  }

  async fillShippingInformation(firstName: string = 'John', lastName: string = 'Doe', postalCode: string = '12345') {
    await this.locators.firstNameInput.fill(firstName);
    await this.locators.lastNameInput.fill(lastName);
    await this.locators.postalCodeInput.fill(postalCode);
    await this.locators.continueButton.click();
  }
}