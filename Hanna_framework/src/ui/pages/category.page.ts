import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

/**
 * Generic page for category and brand filtered product listings.
 * URL patterns: /category_products/{id}  or  /brand_products/{name}
 */
export class CategoryPage extends AppPage {
  readonly pagePath = '/category_products/1';

  readonly navbar = new Navbar(this.page);

  readonly heading = this.locator('.features_items h2.title');
  readonly productsList = this.locator('.features_items');
  readonly productCards = this.locator('.features_items .col-sm-4');

  readonly categorySidebar = this.locator('.left-sidebar');
  readonly brandsSidebar = this.locator('.brands-name');
  readonly brandLinks = this.locator('.brands-name ul li a');

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  async expectHeadingContains(text: string): Promise<void> {
    await expect(this.heading).toContainText(text, { ignoreCase: true });
  }

  async clickBrand(name: string): Promise<void> {
    await this.brandLinks.getByText(name).click();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }
}
