import { test, expect } from '../../fixtures/base.fixture';

test.describe('Test Case 12: Add Products in Cart', () => {
  test('should add two products to cart and verify quantities and prices', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();

    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.continueShopping();

    await productsPage.hoverAndAddToCart(1);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);

    for (let i = 0; i < 2; i++) {
      await expect(cartPage.cartRows.nth(i).locator('.cart_price p')).toBeVisible();
      await expect(
        cartPage.cartRows.nth(i).locator('.cart_total p.cart_total_price'),
      ).toBeVisible();
    }
  });
});

test.describe('Test Case 13: Verify Product quantity in Cart', () => {
  test('should add product with quantity 4 and verify it in cart', async ({
    homePage,
    productsPage,
    productDetailPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();

    await productsPage.viewProduct(0);
    await productDetailPage.expectLoaded();

    await productDetailPage.setQuantity(4);
    await productDetailPage.addToCart();
    await productDetailPage.cartModal.expectLoaded();
    await productDetailPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    const quantity = await cartPage.getItemQuantity(0);
    expect(quantity.trim()).toBe('4');
  });
});

test.describe('Test Case 17: Remove Products From Cart', () => {
  test('should remove a product from the cart', async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();

    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.removeItem(0);

    await expect(cartPage.cartRows).toHaveCount(0);
  });
});

test.describe('Test Case 22: Add to cart from Recommended items', () => {
  test('should add a recommended product to the cart from the home page', async ({
    homePage,
    cartPage,
  }) => {
    await homePage.open();

    await homePage.addRecommendedToCart(0);

    await homePage.cartModal.expectLoaded();
    await expect(homePage.recommendedSection).toBeVisible();
    await homePage.cartModal.viewCart();

    await cartPage.expectLoaded();
    expect(await cartPage.getItemCount()).toBeGreaterThan(0);
  });
});
