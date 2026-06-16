import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

export class CartPage extends AppPage {
  readonly pagePath = '/view_cart';

  readonly navbar = new Navbar(this.page);

  readonly cartInfo = this.locator('#cart_info');
  readonly cartRows = this.locator('#cart_info tbody tr');

  readonly proceedToCheckoutButton = this.locator(
    '.btn.btn-default.check_out',
  );

  readonly checkoutModal = this.locator('#checkoutModal');
  readonly checkoutRegisterLoginLink = this.checkoutModal.getByRole('link', {
    name: 'Register / Login',
  });

  readonly subscriptionEmailInput = this.page.locator(
    'input#susbscribe_email',
  );
  readonly subscribeButton = this.page.locator('button#subscribe');
  readonly subscriptionSuccessAlert = this.page.locator(
    'div#success-subscribe',
  );

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL(/\/view_cart/);
    await expect(this.cartInfo).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.cartRows.count();
  }

  async removeItem(index: number): Promise<void> {
    const row = this.cartRows.nth(index);
    await row.locator('.cart_quantity_delete').click();
    await row.waitFor({ state: 'detached' });
  }

  async getItemName(index: number): Promise<string> {
    return (
      (await this.cartRows.nth(index).locator('.cart_description h4 a').textContent()) ?? ''
    );
  }

  async getItemQuantity(index: number): Promise<string> {
    return (
      (await this.cartRows
        .nth(index)
        .locator('.cart_quantity button')
        .textContent()) ?? ''
    );
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async proceedToCheckoutAsGuest(): Promise<void> {
    await this.proceedToCheckoutButton.click();
    await expect(this.checkoutModal).toBeVisible();
    await this.checkoutRegisterLoginLink.click();
  }

  async subscribe(email: string): Promise<void> {
    await this.subscriptionEmailInput.scrollIntoViewIfNeeded();
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }
}
