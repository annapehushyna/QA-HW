import { test as base, expect } from '@playwright/test';
import { HomePage } from '../ui/pages/home.page';
import { SignupLoginPage } from '../ui/pages/sighupLogin.page';
import { SignupAccountPage } from '../ui/pages/signupAccount.page';
import { ContactUsPage } from '../ui/pages/contactUs.page';
import { TestCasesPage } from '../ui/pages/testCases.page';
import { ProductsPage } from '../ui/pages/products.page';
import { ProductDetailPage } from '../ui/pages/productDetail.page';
import { CartPage } from '../ui/pages/cart.page';
import { CheckoutPage } from '../ui/pages/checkout.page';
import { PaymentPage } from '../ui/pages/payment.page';
import { CategoryPage } from '../ui/pages/category.page';

type BaseFixtures = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  signupAccountPage: SignupAccountPage;
  contactUsPage: ContactUsPage;
  testCasesPage: TestCasesPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  categoryPage: CategoryPage;
};

export const test = base.extend<BaseFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
  signupAccountPage: async ({ page }, use) => {
    await use(new SignupAccountPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  testCasesPage: async ({ page }, use) => {
    await use(new TestCasesPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
});

export { expect };
