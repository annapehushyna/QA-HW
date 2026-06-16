import type { Page } from '@playwright/test';

export async function stubNativeConfirm(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.confirm = () => true;
  });
}
