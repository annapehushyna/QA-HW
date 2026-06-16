import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

export type PaymentDetails = {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export class PaymentPage extends AppPage {
  readonly pagePath = '/payment';

  readonly navbar = new Navbar(this.page);

  readonly nameOnCardInput = this.page.getByTestId('name-on-card');
  readonly cardNumberInput = this.page.getByTestId('card-number');
  readonly cvcInput = this.page.getByTestId('cvc');
  readonly expiryMonthInput = this.page.getByTestId('expiry-month');
  readonly expiryYearInput = this.page.getByTestId('expiry-year');
  readonly payButton = this.page.getByTestId('pay-button');

  // Actual heading shown after successful payment: "Order Placed!"
  readonly orderPlacedHeading = this.page.getByRole('heading', {
    name: 'Order Placed!',
  });
  // Actual paragraph: "Congratulations! Your order has been confirmed!"
  readonly orderConfirmedMessage = this.page.getByText(
    'Congratulations! Your order has been confirmed!',
  );
  readonly downloadInvoiceButton = this.page.getByRole('link', {
    name: 'Download Invoice',
  });
  readonly continueButton = this.page.getByRole('link', { name: 'Continue' });

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL(/\/payment/);
    await expect(this.nameOnCardInput).toBeVisible();
  }

  async fillPaymentDetails(details: PaymentDetails): Promise<void> {
    await this.nameOnCardInput.fill(details.nameOnCard);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.cvcInput.fill(details.cvc);
    await this.expiryMonthInput.fill(details.expiryMonth);
    await this.expiryYearInput.fill(details.expiryYear);
  }

  async confirmOrder(details: PaymentDetails): Promise<void> {
    await this.fillPaymentDetails(details);
    await this.payButton.click();
  }
}
