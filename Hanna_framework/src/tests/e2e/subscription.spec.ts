import { test, expect } from '../../fixtures/base.fixture';

test.describe('Test Case 10: Verify Subscription in home page', () => {
  test('should successfully subscribe from the home page footer', async ({
    homePage,
  }) => {
    await homePage.open();

    await homePage.subscriptionEmailInput.scrollIntoViewIfNeeded();
    await expect(homePage.subscriptionHeading).toBeVisible();

    await homePage.subscribe('subscriber@automation.test');

    await homePage.expectSubscriptionSuccessful();
  });
});

test.describe('Test Case 11: Verify Subscription in Cart page', () => {
  test('should successfully subscribe from the cart page footer', async ({
    homePage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.navbar.cartLink.click();
    await cartPage.expectLoaded();

    await cartPage.subscriptionEmailInput.scrollIntoViewIfNeeded();
    await expect(cartPage.subscriptionEmailInput).toBeVisible();

    await cartPage.subscribe('subscriber.cart@automation.test');

    await expect(cartPage.subscriptionSuccessAlert).toContainText(
      'You have been successfully subscribed!',
    );
  });
});
