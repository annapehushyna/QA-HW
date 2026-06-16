import { test, expect } from '../../fixtures/base.fixture';
import {
  createUniqueUser,
  defaultSignupAccountDetails,
} from '../../data/testData';
import { registerUser } from '../../helpers/authFlows';

test.describe('Test Case 1: Register User', () => {
  test('should register a new user and delete the account', async ({
    page,
    homePage,
    signupLoginPage,
    signupAccountPage,
  }) => {
    const user = createUniqueUser();

    await homePage.open();
    await homePage.navbar.openSignupLogin();

    await expect(signupLoginPage.signupHeading).toBeVisible();
    await signupLoginPage.signup(user.name, user.email);

    await expect(signupAccountPage.accountInformationHeading).toBeVisible();
    await signupAccountPage.fillAccountInformation(
      defaultSignupAccountDetails({ password: user.password }),
    );
    await signupAccountPage.createAccount();

    await expect(signupAccountPage.accountCreatedHeading).toBeVisible();
    await signupAccountPage.continueAfterAccountCreated();

    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({
      timeout: 30_000,
    });
    await signupAccountPage.continueAfterAccountDeleted();
  });
});

test.describe('Test Case 2: Login User with correct email and password', () => {
  test('should login with valid credentials and delete account', async ({
    page,
    homePage,
    signupLoginPage,
    signupAccountPage,
  }) => {
    const user = await registerUser(page);
    await homePage.navbar.logout();

    await homePage.navbar.openSignupLogin();
    await expect(signupLoginPage.loginHeading).toBeVisible();
    await signupLoginPage.login(user.email, user.password);

    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();

    await homePage.navbar.deleteAccount();
    await expect(signupAccountPage.accountDeletedHeading).toBeVisible({
      timeout: 30_000,
    });
  });
});

test.describe('Test Case 3: Login User with incorrect email and password', () => {
  test('should show error for invalid credentials', async ({
    homePage,
    signupLoginPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openSignupLogin();

    await expect(signupLoginPage.loginHeading).toBeVisible();
    await signupLoginPage.login('invalid@automation.test', 'wrong-password');

    await expect(signupLoginPage.loginError).toHaveText(
      'Your email or password is incorrect!',
    );
  });
});

test.describe('Test Case 4: Logout User', () => {
  test('should logout and return to login page', async ({
    page,
    homePage,
    signupLoginPage,
  }) => {
    const user = await registerUser(page);

    await expect(homePage.navbar.loggedInAsText(user.name)).toBeVisible();
    await homePage.navbar.logout();

    await expect(signupLoginPage.loginHeading).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe('Test Case 5: Register User with existing email', () => {
  test('should show error when signing up with an existing email', async ({
    page,
    homePage,
    signupLoginPage,
  }) => {
    const user = await registerUser(page);
    await homePage.navbar.logout();

    await homePage.navbar.openSignupLogin();
    await expect(signupLoginPage.signupHeading).toBeVisible();
    await signupLoginPage.signup(user.name, user.email);

    await expect(signupLoginPage.signupError).toHaveText(
      'Email Address already exist!',
    );
  });
});
