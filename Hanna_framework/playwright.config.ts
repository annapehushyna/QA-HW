import { defineConfig } from '@playwright/test';
import { BASE_URL } from './src/config/urls';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60_000,
  retries: 1,
  workers: 1,
  use: {
    baseURL: BASE_URL,
    testIdAttribute: 'data-qa',
    headless: true,
  },
});
