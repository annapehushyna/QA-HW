import { expect } from '@playwright/test';
import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';
import { CartModal } from '../components/cartModal';

export class HomePage extends AppPage {
  readonly pagePath = '/';

  readonly navbar = new Navbar(this.page);
  readonly cartModal = new CartModal(this.page);

  readonly slider = this.page.locator('#slider');
  readonly featuresItemsHeading = this.page.getByRole('heading', {
    name: 'Features Items',
  });

  // Category sidebar
  readonly categorySidebar = this.locator('.left-sidebar');
  readonly womenCategoryToggle = this.locator('a[href="#Women"]');
  readonly womenSubcategoryLinks = this.locator('#Women .panel-body a');
  readonly menCategoryToggle = this.locator('a[href="#Men"]');
  readonly menSubcategoryLinks = this.locator('#Men .panel-body a');

  // Recommended items (home page bottom)
  readonly recommendedSection = this.locator('#recommended-item-carousel');
  // Carousel slides may be hidden; force:true is used on click so no .active filter needed
  readonly recommendedAddToCartButtons = this.locator(
    '#recommended-item-carousel a.add-to-cart',
  );

  // Footer subscription
  readonly subscriptionHeading = this.page.getByRole('heading', {
    name: 'Subscription',
  });
  readonly subscriptionEmailInput = this.page.locator('input#susbscribe_email');
  readonly subscribeButton = this.page.locator('button#subscribe');
  readonly subscriptionSuccessAlert = this.page.locator('div#success-subscribe');

  async expectLoaded(): Promise<void> {
    await this.slider.waitFor({ state: 'visible' });
    await this.featuresItemsHeading.waitFor({ state: 'visible' });
  }

  async subscribe(email: string): Promise<void> {
    await this.subscriptionEmailInput.scrollIntoViewIfNeeded();
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async expandWomenCategory(): Promise<void> {
    await this.womenCategoryToggle.click();
  }

  async expandMenCategory(): Promise<void> {
    await this.menCategoryToggle.click();
  }

  async clickWomenSubcategory(name: string): Promise<void> {
    await this.womenSubcategoryLinks.getByText(name).click();
  }

  async clickMenSubcategory(name: string): Promise<void> {
    await this.menSubcategoryLinks.getByText(name).click();
  }

  async addRecommendedToCart(index: number): Promise<void> {
    await this.recommendedSection.scrollIntoViewIfNeeded();
    // Carousel slides not in the active position have zero bounding-box and
    // cannot receive a synthesised click even with force:true.  Calling
    // HTMLElement.click() via evaluate bypasses all actionability checks and
    // still triggers the jQuery event handler that makes the AJAX add-to-cart
    // request.
    await this.page.evaluate((i) => {
      const buttons = document.querySelectorAll('#recommended-item-carousel a.add-to-cart');
      const btn = buttons[i] as HTMLElement | undefined;
      btn?.click();
    }, index);
  }

  async expectCategorySidebarVisible(): Promise<void> {
    await expect(this.categorySidebar).toBeVisible();
    await expect(this.womenCategoryToggle).toBeVisible();
    await expect(this.menCategoryToggle).toBeVisible();
  }

  async expectSubscriptionSuccessful(): Promise<void> {
    await expect(this.subscriptionSuccessAlert).toContainText(
      'You have been successfully subscribed!',
    );
  }
}
