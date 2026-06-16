import { type Locator, type Page } from '@playwright/test';

/**
 * Abstract base for every page object and component that holds a Playwright Page.
 * Provides shared utilities so concrete classes stay focused on their own selectors
 * and actions.
 */
export abstract class PageHolder {
  constructor(public readonly page: Page) {}

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

}
