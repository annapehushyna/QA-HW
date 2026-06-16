import { test, expect } from '../../fixtures/base.fixture';
import {
  createUniqueUser,
  defaultSignupAccountDetails,
  defaultPaymentDetails,
} from '../../data/testData';
import { registerUser } from '../../helpers/authFlows';

test.describe('Test Case 14: Place Order: Register while Checkout', () => {
  test('should register during checkout flow and place an order', async ({
    homePage,
    productsPage,
    cartPage,
    signupLoginPage,
    signupAccountPage,
    checkoutPage,
    paymentPage,
  }) => {
    const user = createUniqueUser();
    const accountDetails = defaultSignupAccountDetails({ password: user.password });

    await homePage.open();
    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    await cartPage.proceedToCheckoutAsGuest();

    await signupLoginPage.expectLoaded();
    await signupLoginPage.signup(user.name, user.email);
    await expect(signupAccountPage.accountInformationHeading).toBeVisible();
    await signupAccountPage.fillAccountInformation(accountDetails);
    await signupAccountPage.createAccount();
    await expect(signupAccountPage.accountCreatedHeading).toBeVisible();
    await signupAccountPage.continueAfterAccountCreated();
    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.cartLink.click();
    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.placeOrder();

    await paymentPage.expectLoaded();
    await paymentPage.confirmOrder(defaultPaymentDetails());
    await expect(paymentPage.orderPlacedHeading).toBeVisible({ timeout: 30_000 });

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({ timeout: 30_000 });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});

test.describe('Test Case 15: Place Order: Register before Checkout', () => {
  test('should register first then add products and place an order', async ({
    homePage,
    signupLoginPage,
    signupAccountPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
  }) => {
    const user = createUniqueUser();
    const accountDetails = defaultSignupAccountDetails({ password: user.password });

    await homePage.open();
    await homePage.navbar.openSignupLogin();
    await signupLoginPage.expectLoaded();
    await signupLoginPage.signup(user.name, user.email);
    await expect(signupAccountPage.accountInformationHeading).toBeVisible();
    await signupAccountPage.fillAccountInformation(accountDetails);
    await signupAccountPage.createAccount();
    await expect(signupAccountPage.accountCreatedHeading).toBeVisible();
    await signupAccountPage.continueAfterAccountCreated();
    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.placeOrder();

    await paymentPage.expectLoaded();
    await paymentPage.confirmOrder(defaultPaymentDetails());
    await expect(paymentPage.orderPlacedHeading).toBeVisible({ timeout: 30_000 });

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({ timeout: 30_000 });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});

test.describe('Test Case 16: Place Order: Login before Checkout', () => {
  test('should login then add products and place an order', async ({
    page,
    homePage,
    signupLoginPage,
    signupAccountPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
  }) => {
    const user = await registerUser(page);
    await homePage.navbar.logout();

    await signupLoginPage.expectLoaded();
    await expect(page).toHaveURL(/\/login/);
    await signupLoginPage.login(user.email, user.password);
    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();
    await checkoutPage.placeOrder();

    await paymentPage.expectLoaded();
    await paymentPage.confirmOrder(defaultPaymentDetails());
    await expect(paymentPage.orderPlacedHeading).toBeVisible({ timeout: 30_000 });

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({ timeout: 30_000 });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});

test.describe('Test Case 23: Verify address details in checkout page', () => {
  test('should display registration address in delivery and billing sections', async ({
    homePage,
    signupLoginPage,
    signupAccountPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    const user = createUniqueUser();
    const accountDetails = defaultSignupAccountDetails({ password: user.password });

    await homePage.open();
    await homePage.navbar.openSignupLogin();
    await signupLoginPage.expectLoaded();
    await signupLoginPage.signup(user.name, user.email);
    await expect(signupAccountPage.accountInformationHeading).toBeVisible();
    await signupAccountPage.fillAccountInformation(accountDetails);
    await signupAccountPage.createAccount();
    await expect(signupAccountPage.accountCreatedHeading).toBeVisible();
    await signupAccountPage.continueAfterAccountCreated();
    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.productsLink.click();
    await productsPage.expectLoaded();
    await productsPage.hoverAndAddToCart(0);
    await productsPage.cartModal.expectLoaded();
    await productsPage.cartModal.viewCart();

    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectLoaded();

    await checkoutPage.expectAddressMatchesRegistration(accountDetails);
    await expect(checkoutPage.deliveryAddress).toBeVisible();
    await expect(checkoutPage.billingAddress).toBeVisible();

    await checkoutPage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({ timeout: 30_000 });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});
