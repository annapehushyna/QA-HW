import path from 'path';
import { test, expect } from '../../fixtures/base.fixture';

const uploadFilePath = path.join(__dirname, '../../data/upload.txt');

test.describe('Test Case 6: Contact Us Form', () => {
  test('should submit the contact form successfully', async ({
    homePage,
    contactUsPage,
  }) => {
    await homePage.open();
    await homePage.navbar.openContactUs();

    await expect(contactUsPage.getInTouchHeading).toBeVisible();
    await contactUsPage.fillForm({
      name: 'Test User',
      email: 'contact@automation.test',
      subject: 'Automation test',
      message: 'This is a test message from Playwright.',
    });
    await contactUsPage.uploadFile(uploadFilePath);
    await contactUsPage.submit();

    await expect(contactUsPage.successAlert).toContainText(
      'Success! Your details have been submitted successfully.',
    );

    await contactUsPage.navbar.openHome();
    await homePage.expectLoaded();
  });
});
