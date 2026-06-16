import type { Page } from '@playwright/test';
import { HomePage } from '../ui/pages/home.page';
import { SignupLoginPage } from '../ui/pages/sighupLogin.page';
import { SignupAccountPage } from '../ui/pages/signupAccount.page';
import {
  createUniqueUser,
  defaultSignupAccountDetails,
  type UserCredentials,
} from '../data/testData';

export async function registerUser(
  page: Page,
  user: UserCredentials = createUniqueUser(),
): Promise<UserCredentials> {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupAccountPage = new SignupAccountPage(page);

  await homePage.open();
  await homePage.navbar.openSignupLogin();
  await signupLoginPage.expectLoaded();
  await signupLoginPage.signup(user.name, user.email);
  await signupAccountPage.accountInformationHeading.waitFor({
    state: 'visible',
  });
  await signupAccountPage.fillAccountInformation(
    defaultSignupAccountDetails({ password: user.password }),
  );
  await signupAccountPage.createAccount();
  await signupAccountPage.accountCreatedHeading.waitFor({ state: 'visible' });
  await signupAccountPage.continueAfterAccountCreated();

  return user;
}

export async function loginUser(
  page: Page,
  email: string,
  password: string,
): Promise<void> {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await homePage.open();
  await homePage.navbar.openSignupLogin();
  await signupLoginPage.expectLoaded();
  await signupLoginPage.login(email, password);
}
