import { PageHolder } from '../core/PageHolder';

export type SignupAccountDetails = {
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

export class SignupAccountPage extends PageHolder {
  readonly accountInformationHeading = this.page.getByText(
    'Enter Account Information',
    { exact: false },
  );
  readonly titleMr = this.locator('#id_gender1');
  readonly titleMrs = this.locator('#id_gender2');
  readonly passwordInput = this.page.getByTestId('password');
  readonly daysSelect = this.page.getByTestId('days');
  readonly monthsSelect = this.page.getByTestId('months');
  readonly yearsSelect = this.page.getByTestId('years');
  readonly newsletterCheckbox = this.locator('#newsletter');
  readonly offersCheckbox = this.locator('#optin');
  readonly firstNameInput = this.page.getByTestId('first_name');
  readonly lastNameInput = this.page.getByTestId('last_name');
  readonly companyInput = this.page.getByTestId('company');
  readonly addressInput = this.page.getByTestId('address');
  readonly address2Input = this.page.getByTestId('address2');
  readonly countrySelect = this.page.getByTestId('country');
  readonly stateInput = this.page.getByTestId('state');
  readonly cityInput = this.page.getByTestId('city');
  readonly zipcodeInput = this.page.getByTestId('zipcode');
  readonly mobileNumberInput = this.page.getByTestId('mobile_number');
  readonly createAccountButton = this.page.getByTestId('create-account');
  readonly accountCreatedHeading = this.page.getByText('Account Created!', {
    exact: false,
  });
  readonly continueButton = this.page.getByTestId('continue-button');
  readonly accountDeletedHeading = this.page.getByText(/account deleted/i);

  async fillAccountInformation(
    details: SignupAccountDetails,
    options?: { title?: 'Mr' | 'Mrs' },
  ): Promise<void> {
    if (options?.title === 'Mrs') {
      await this.titleMrs.check();
    } else {
      await this.titleMr.check();
    }

    await this.passwordInput.fill(details.password);
    await this.daysSelect.selectOption(details.day);
    await this.monthsSelect.selectOption(details.month);
    await this.yearsSelect.selectOption(details.year);
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async continueAfterAccountCreated(): Promise<void> {
    await this.continueButton.click();
  }

  async continueAfterAccountDeleted(): Promise<void> {
    await this.continueButton.click();
  }
}
