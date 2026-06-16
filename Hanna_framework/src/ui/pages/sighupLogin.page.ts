import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

export class SignupLoginPage extends AppPage {
  readonly pagePath = '/login';

  readonly navbar = new Navbar(this.page);

  readonly loginForm = this.locator('.login-form');
  readonly loginHeading = this.loginForm.getByRole('heading', {
    name: 'Login to your account',
  });
  readonly loginEmailInput = this.page.getByTestId('login-email');
  readonly loginPasswordInput = this.page.getByTestId('login-password');
  readonly loginButton = this.page.getByTestId('login-button');

  readonly orHeading = this.page.getByRole('heading', { name: 'OR' });

  readonly signupForm = this.locator('.signup-form');
  readonly signupHeading = this.signupForm.getByRole('heading', {
    name: 'New User Signup!',
  });
  readonly signupNameInput = this.page.getByTestId('signup-name');
  readonly signupEmailInput = this.page.getByTestId('signup-email');
  readonly signupButton = this.page.getByTestId('signup-button');

  readonly loginError = this.locator('.login-form p');
  readonly signupError = this.locator('.signup-form p');

  async expectLoaded(): Promise<void> {
    await this.loginHeading.waitFor({ state: 'visible' });
    await this.signupHeading.waitFor({ state: 'visible' });
  }

  async fillLogin(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillLogin(email, password);
    await this.submitLogin();
  }

  async fillSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async submitSignup(): Promise<void> {
    await this.signupButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fillSignup(name, email);
    await this.submitSignup();
  }
}
