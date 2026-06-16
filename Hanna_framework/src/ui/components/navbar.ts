import { expect, type Locator } from '@playwright/test';
import { Component } from '../core/Component';
import { dismissCookieConsent } from '../../helpers/consent';

export class Navbar extends Component {
  readonly header = this.page.locator('#header');

  readonly logoLink = this.header.locator('a[href="/"]').first();
  readonly homeLink = this.header.getByRole('link', { name: 'Home' });
  readonly productsLink = this.header.getByRole('link', { name: 'Products' });
  readonly cartLink = this.header.getByRole('link', { name: 'Cart' });
  readonly signupLoginLink = this.header.getByRole('link', {
    name: 'Signup / Login',
  });
  readonly testCasesLink = this.header.getByRole('link', {
    name: 'Test Cases',
  });
  readonly apiTestingLink = this.header.getByRole('link', {
    name: 'API Testing',
  });
  readonly contactUsLink = this.header.getByRole('link', {
    name: 'Contact us',
  });
  readonly loggedInAsLink = this.header
    .locator('a')
    .filter({ hasText: 'Logged in as' });
  readonly logoutLink = this.header.getByRole('link', { name: 'Logout' });
  readonly deleteAccountLink = this.header.getByRole('link', {
    name: 'Delete Account',
  });

  async expectLoaded(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  private async clickNav(link: Locator): Promise<void> {
    await dismissCookieConsent(this.page);
    await link.click();
  }

  async openHome(): Promise<void> {
    await this.clickNav(this.homeLink);
  }

  async openProducts(): Promise<void> {
    await dismissCookieConsent(this.page);
    await Promise.all([this.page.waitForURL(/\/products/), this.productsLink.click()]);
  }

  async openSignupLogin(): Promise<void> {
    await this.clickNav(this.signupLoginLink);
  }

  async openTestCases(): Promise<void> {
    await dismissCookieConsent(this.page);
    await Promise.all([
      this.page.waitForURL(/\/test_cases\/?$/),
      this.testCasesLink.click(),
    ]);
  }

  async openContactUs(): Promise<void> {
    await this.clickNav(this.contactUsLink);
  }

  async logout(): Promise<void> {
    await this.clickNav(this.logoutLink);
  }

  async deleteAccount(): Promise<void> {
    await this.clickNav(this.deleteAccountLink);
    // Guard: wait for the delete-account page URL so an ad intercept fails fast
    // and triggers a retry rather than hanging until the assertion timeout expires.
    await this.page.waitForURL(/\/delete_account/, { timeout: 20_000 });
  }

  loggedInAsText(username: string): Locator {
    return this.header.getByText(`Logged in as ${username}`);
  }
}
