import { AppPage } from '../AppPage';
import { Navbar } from '../components/navbar';

export class TestCasesPage extends AppPage {
  readonly pagePath = '/test_cases';

  readonly navbar = new Navbar(this.page);

  readonly pageTitle = this.page.getByRole('heading', {
    name: 'Test Cases',
    exact: true,
  });
  readonly firstTestCaseLink = this.page.getByRole('link', {
    name: /Test Case 1: Register User/i,
  });

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL(/\/test_cases\/?$/);
    await this.page.waitForLoadState('domcontentloaded');
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.firstTestCaseLink.waitFor({ state: 'visible' });
  }
}
