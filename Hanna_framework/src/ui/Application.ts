import { type Page } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { SignupLoginPage } from './pages/sighupLogin.page';
import { SignupAccountPage } from './pages/signupAccount.page';
import { ContactUsPage } from './pages/contactUs.page';
import { TestCasesPage } from './pages/testCases.page';
import { ProductsPage } from './pages/products.page';
import { ProductDetailPage } from './pages/productDetail.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { PaymentPage } from './pages/payment.page';
import { CategoryPage } from './pages/category.page';

/**
 * Facade that lazily creates page objects on first access.
 * Keeps fixtures and helpers lean — no need to instantiate pages up front.
 *
 * Usage in a fixture:
 *   app: async ({ page }, use) => { await use(new Application(page)); }
 *
 * Usage in a test:
 *   await app.home.open();
 */
export class Application {
  private _home?: HomePage;
  private _signupLogin?: SignupLoginPage;
  private _signupAccount?: SignupAccountPage;
  private _contactUs?: ContactUsPage;
  private _testCases?: TestCasesPage;
  private _products?: ProductsPage;
  private _productDetail?: ProductDetailPage;
  private _cart?: CartPage;
  private _checkout?: CheckoutPage;
  private _payment?: PaymentPage;
  private _category?: CategoryPage;

  constructor(private readonly page: Page) {}

  get home(): HomePage {
    return (this._home ??= new HomePage(this.page));
  }

  get signupLogin(): SignupLoginPage {
    return (this._signupLogin ??= new SignupLoginPage(this.page));
  }

  get signupAccount(): SignupAccountPage {
    return (this._signupAccount ??= new SignupAccountPage(this.page));
  }

  get contactUs(): ContactUsPage {
    return (this._contactUs ??= new ContactUsPage(this.page));
  }

  get testCases(): TestCasesPage {
    return (this._testCases ??= new TestCasesPage(this.page));
  }

  get products(): ProductsPage {
    return (this._products ??= new ProductsPage(this.page));
  }

  get productDetail(): ProductDetailPage {
    return (this._productDetail ??= new ProductDetailPage(this.page));
  }

  get cart(): CartPage {
    return (this._cart ??= new CartPage(this.page));
  }

  get checkout(): CheckoutPage {
    return (this._checkout ??= new CheckoutPage(this.page));
  }

  get payment(): PaymentPage {
    return (this._payment ??= new PaymentPage(this.page));
  }

  get category(): CategoryPage {
    return (this._category ??= new CategoryPage(this.page));
  }
}
