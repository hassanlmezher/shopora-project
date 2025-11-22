import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  webServer: {
    command: 'npm run dev -- --port=5173',
    url: 'http://localhost:5173',
    timeout: 60_000,
  },

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },

  ],
});
