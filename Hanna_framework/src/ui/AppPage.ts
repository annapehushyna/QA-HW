import { Component } from './core/Component';
import { BASE_URL } from '../config/urls';
import { stubNativeConfirm } from '../helpers/browser';
import { dismissCookieConsent } from '../helpers/consent';

/**
 * Base class for every directly-navigable page.
 * Subclasses must declare `pagePath` and implement `expectLoaded()`.
 * Call `open()` to navigate and assert the page is ready in one step.
 */
export abstract class AppPage extends Component {
  abstract readonly pagePath: string;

  /**
   * Derives the app origin from the current URL so tests work regardless of
   * which environment or region the browser lands on. Falls back to BASE_URL
   * for the very first navigation when the page has no URL yet.
   */
  protected get appOrigin(): string {
    const current = this.page.url();
    if (current && current !== 'about:blank') {
      return new URL(current).origin;
    }
    return BASE_URL;
  }

  async open(): Promise<void> {
    // Block Google AdSense / DoubleClick scripts before the first page load.
    // These scripts intercept link clicks and redirect to #google_vignette,
    // causing navigation timeouts throughout the test.  The route handler
    // persists for the entire page lifetime so one call per test is enough;
    // multiple registrations are harmless (first/most-recent handler wins).
    await this.page.route(
      /googlesyndication\.com|doubleclick\.net|googletagservices\.com/,
      (route) => route.abort(),
    );
    await stubNativeConfirm(this.page);
    await this.page.goto(`${this.appOrigin}${this.pagePath}`);
    await dismissCookieConsent(this.page);
    await this.expectLoaded();
  }
}
