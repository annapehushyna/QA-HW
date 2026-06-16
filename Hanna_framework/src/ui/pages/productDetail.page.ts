import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';
import { CartModal } from '../components/cartModal';

export class ProductDetailPage extends AppPage {
  readonly pagePath = '/product_details/1';

  readonly navbar = new Navbar(this.page);
  readonly cartModal = new CartModal(this.page);

  readonly productInfo = this.locator('.product-information');
  readonly productName = this.productInfo.locator('h2');
  readonly price = this.productInfo.locator('span span');
  readonly category = this.productInfo.locator('p').filter({ hasText: 'Category' });
  readonly availability = this.productInfo.locator('p').filter({ hasText: 'Availability' });
  readonly condition = this.productInfo.locator('p').filter({ hasText: 'Condition' });
  readonly brand = this.productInfo.locator('p').filter({ hasText: 'Brand' });

  readonly quantityInput = this.page.locator('input#quantity');
  readonly addToCartButton = this.productInfo.getByRole('button', {
    name: 'Add to cart',
  });

  readonly writeReviewHeading = this.page.getByText('Write Your Review');
  readonly reviewNameInput = this.page.locator('input#name');
  readonly reviewEmailInput = this.page.locator('input#email');
  readonly reviewTextarea = this.page.locator('textarea#review');
  readonly submitReviewButton = this.page.locator('button#button-review');
  readonly reviewSuccessAlert = this.locator('.alert-success span');

  async expectLoaded(): Promise<void> {
    await this.productName.waitFor({ state: 'visible' });
    await this.price.waitFor({ state: 'visible' });
  }

  async expectDetailVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async submitReview(name: string, email: string, review: string): Promise<void> {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.submitReviewButton.click();
  }
}
