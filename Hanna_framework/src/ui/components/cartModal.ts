import { expect } from '@playwright/test';
import { Component } from '../core/Component';

/**
 * Modal that appears after adding a product to the cart.
 * Present on both the Products page and Product Detail page.
 */
export class CartModal extends Component {
  readonly modal = this.locator('#cartModal');
  readonly continueShoppingButton = this.modal.getByRole('button', {
    name: 'Continue Shopping',
  });
  readonly viewCartLink = this.modal.getByRole('link', { name: 'View Cart' });

  async expectLoaded(): Promise<void> {
    await expect(this.modal).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await expect(this.modal).toBeHidden();
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }
}
