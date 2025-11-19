/// <reference types="node" />

import { defineConfig } from "@playwright/test";
export default defineConfig({
    testDir: './tests',
    timeout: 30_000,

    use: {
        baseURL: 'http://localhost:5173',
        browserName: 'chromium',
        headless: true,
    },

    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],

    webServer: {
        command: 'npm run dev -- --host 0.0.0.0 --port 5173',
        port: 5173,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
