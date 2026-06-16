import { test, expect } from '../../fixtures/base.fixture';
import { registerUser } from '../../helpers/authFlows';

test.describe('Test Case 8: Verify All Products and product detail page', () => {
  test('should navigate to products page and view product details', async ({
    homePage,
    productsPage,
    productDetailPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openProducts();
    await productsPage.expectLoaded();
    await expect(productsPage.page).toHaveURL(/\/products/);

    await expect(productsPage.productsList).toBeVisible();

    await productsPage.viewProduct(0);
    await productDetailPage.expectLoaded();
    await expect(productDetailPage.page).toHaveURL(/\/product_details\//);

    await productDetailPage.expectDetailVisible();
  });
});

test.describe('Test Case 9: Search Product', () => {
  test('should display searched products on the products page', async ({
    homePage,
    productsPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openProducts();
    await productsPage.expectLoaded();

    await productsPage.searchFor('Top');

    await expect(productsPage.searchedProductsHeading).toBeVisible();
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
  });
});

test.describe('Test Case 19: View & Cart Brand Products', () => {
  test('should navigate to brand pages from the products sidebar', async ({
    homePage,
    productsPage,
    categoryPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openProducts();
    await productsPage.expectLoaded();

    await expect(productsPage.brandsSidebar).toBeVisible();
    expect(await productsPage.brandLinks.count()).toBeGreaterThan(0);

    const firstBrandName = (await productsPage.brandLinks.first().textContent()) ?? '';
    await productsPage.brandLinks.first().click();
    await categoryPage.expectLoaded();
    await expect(categoryPage.page).toHaveURL(/\/brand_products\//);
    await expect(categoryPage.productCards.first()).toBeVisible();

    await categoryPage.brandLinks.nth(1).click();
    await categoryPage.expectLoaded();
    await expect(categoryPage.page).toHaveURL(/\/brand_products\//);
    await expect(categoryPage.productCards.first()).toBeVisible();

    expect(firstBrandName.trim().length).toBeGreaterThan(0);
  });
});

test.describe('Test Case 20: Search Products and Verify Cart After Login', () => {
  test('should persist cart contents after logging in', async ({
    page,
    homePage,
    productsPage,
    cartPage,
    signupLoginPage,
    signupAccountPage,
  }) => {
    const user = await registerUser(page);
    await homePage.navbar.logout();

    await homePage.open();
    await homePage.navbar.openProducts();
    await productsPage.expectLoaded();
    await expect(productsPage.page).toHaveURL(/\/products/);

    await productsPage.searchFor('Top');
    await expect(productsPage.searchedProductsHeading).toBeVisible();
    expect(await productsPage.getProductCount()).toBeGreaterThan(0);

    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    expect(await cartPage.getItemCount()).toBeGreaterThan(0);

    await homePage.navbar.openSignupLogin();
    await signupLoginPage.expectLoaded();
    await signupLoginPage.login(user.email, user.password);
    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.cartLink.click();
    await cartPage.expectLoaded();
    expect(await cartPage.getItemCount()).toBeGreaterThan(0);

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({ timeout: 30_000 });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});

test.describe('Test Case 21: Add review on product', () => {
  test('should submit a review on a product detail page', async ({
    homePage,
    productsPage,
    productDetailPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openProducts();
    await productsPage.expectLoaded();

    await productsPage.viewProduct(0);
    await productDetailPage.expectLoaded();

    await expect(productDetailPage.writeReviewHeading).toBeVisible();

    await productDetailPage.submitReview(
      'Reviewer Name',
      'reviewer@automation.test',
      'Great product, highly recommended!',
    );

    await expect(productDetailPage.reviewSuccessAlert).toContainText(
      'Thank you for your review.',
    );
  });
});
