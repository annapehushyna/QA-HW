import type { SignupAccountDetails } from '../ui/pages/signupAccount.page';
import type { PaymentDetails } from '../ui/pages/payment.page';

export type UserCredentials = {
  name: string;
  email: string;
  password: string;
};

export function createUniqueUser(): UserCredentials {
  const unique = Date.now();
  return {
    name: `Test User ${unique}`,
    email: `user${unique}@automation.test`,
    password: 'TestPass123!',
  };
}

export function defaultSignupAccountDetails(
  overrides: Partial<SignupAccountDetails> = {},
): SignupAccountDetails {
  return {
    password: 'TestPass123!',
    day: '10',
    month: '5',
    year: '1990',
    firstName: 'Test',
    lastName: 'User',
    company: 'QA Company',
    address: '123 Test Street',
    address2: 'Apt 1',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890',
    ...overrides,
  };
}

export function defaultPaymentDetails(
  overrides: Partial<PaymentDetails> = {},
): PaymentDetails {
  return {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2028',
    ...overrides,
  };
}
