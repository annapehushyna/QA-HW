import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

export class CheckoutPage extends AppPage {
  readonly pagePath = '/checkout';

  readonly navbar = new Navbar(this.page);

  readonly deliveryAddress = this.locator('#address_delivery');
  readonly billingAddress = this.locator('#address_invoice');
  readonly cartTable = this.locator('#cart_info');
  readonly commentTextarea = this.locator('textarea.form-control');
  readonly placeOrderButton = this.locator('a.btn.btn-default.check_out');

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL(/\/checkout/);
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async expectAddressMatchesRegistration(details: {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    const addr = this.deliveryAddress;
    await expect(addr).toContainText(details.firstName);
    await expect(addr).toContainText(details.lastName);
    await expect(addr).toContainText(details.address);
    await expect(addr).toContainText(details.city);
    await expect(addr).toContainText(details.state);
    await expect(addr).toContainText(details.country);
  }

  async placeOrder(comment = 'Automated test order'): Promise<void> {
    await this.commentTextarea.fill(comment);
    await this.placeOrderButton.click();
  }
}
