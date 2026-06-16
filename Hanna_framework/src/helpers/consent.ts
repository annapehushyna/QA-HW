import type { Page } from '@playwright/test';

export async function dismissCookieConsent(page: Page): Promise<void> {
  const consentButton = page.locator('button.fc-cta-consent');

  try {
    await consentButton.waitFor({ state: 'visible', timeout: 5_000 });
    await consentButton.click({ force: true });
    await page
      .locator('.fc-dialog-overlay')
      .waitFor({ state: 'hidden', timeout: 10_000 });
  } catch {
    // Consent banner not shown in this session or region.
  }
}
