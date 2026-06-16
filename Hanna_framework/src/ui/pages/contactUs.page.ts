import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';
import { dismissCookieConsent } from '../../helpers/consent';

export class ContactUsPage extends AppPage {
  readonly pagePath = '/contact_us';

  readonly navbar = new Navbar(this.page);

  readonly getInTouchHeading = this.page.getByRole('heading', {
    name: 'Get In Touch',
  });
  readonly nameInput = this.page.getByTestId('name');
  readonly emailInput = this.page.getByTestId('email');
  readonly subjectInput = this.page.getByTestId('subject');
  readonly messageInput = this.page.getByTestId('message');
  readonly uploadInput = this.locator('input[name="upload_file"]');
  readonly submitButton = this.page.getByTestId('submit-button');
  readonly successAlert = this.locator('.contact-form .status.alert-success');

  async expectLoaded(): Promise<void> {
    await this.getInTouchHeading.waitFor({ state: 'visible' });
  }

  async fillForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadInput.setInputFiles(filePath);
  }

  async submit(): Promise<void> {
    await dismissCookieConsent(this.page);
    await this.page.evaluate(() => {
      window.confirm = () => true;
      const w = window as Window & {
        jQuery?: (selector: string) => { trigger: (event: string) => void };
      };
      w.jQuery?.('#contact-us-form').trigger('submit');
    });
  }
}
