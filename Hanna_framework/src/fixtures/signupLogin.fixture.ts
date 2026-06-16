import { test as base, expect } from '@playwright/test';
import { SignupLoginPage } from '../ui/pages/sighupLogin.page';

type SignupLoginFixtures = {
  signupLoginPage: SignupLoginPage;
};

export const test = base.extend<SignupLoginFixtures>({
  signupLoginPage: async ({ page }, use) => {
    const signupLoginPage = new SignupLoginPage(page);
    await signupLoginPage.open();
    await use(signupLoginPage);
  },
});

export { expect };
