/// <reference types="node" />

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  webServer: {
    command: 'npm run dev -- --port=5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },

  use: {
    baseURL: 'http://localhost:5173',
    browserName: 'chromium',
    headless: true,
    trace: 'on-first-retry',
  },
});
