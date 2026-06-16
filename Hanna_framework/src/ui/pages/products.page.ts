import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';
import { CartModal } from '../components/cartModal';

export class ProductsPage extends AppPage {
  readonly pagePath = '/products';

  readonly navbar = new Navbar(this.page);
  readonly cartModal = new CartModal(this.page);

  readonly heading = this.page.getByRole('heading', { name: 'All Products' });
  readonly productsList = this.locator('.features_items');
  readonly productCards = this.locator('.features_items .col-sm-4');

  readonly searchInput = this.page.locator('input#search_product');
  readonly searchButton = this.page.locator('button#submit_search');
  readonly searchedProductsHeading = this.page.getByRole('heading', {
    name: 'Searched Products',
  });

  readonly brandsSidebar = this.locator('.brands-name');
  readonly brandLinks = this.locator('.brands-name ul li a');

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.productsList.waitFor({ state: 'visible' });
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async viewProduct(index: number): Promise<void> {
    await this.productCards.nth(index).getByText('View Product').click();
  }

  async hoverAndAddToCart(index: number): Promise<void> {
    await this.productCards.nth(index).locator('.product-image-wrapper').hover();
    await this.productCards
      .nth(index)
      .locator('.add-to-cart')
      .first()
      .click();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductNames(): Promise<string[]> {
    return this.locator('.productinfo p').allTextContents();
  }

  async clickBrand(name: string): Promise<void> {
    await this.brandLinks.getByText(name).click();
  }
}
