const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 90000, // 90 seconds per test since staging can be slow
  expect: {
    timeout: 15000,
  },
  fullyParallel: false, // Run tests sequentially to avoid shopping cart conflicts
  forbidOnly: !!process.env.CI,
  retries: 0, // Disable retries to make debugging cleaner
  workers: 1, // Run sequentially
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://mcstaging.bradstone.com/homeowner/',
    trace: 'retain-on-failure',
    screenshot: 'off', // We will manually capture custom named screenshots in folders
    video: 'off',
    actionTimeout: 20000,
    navigationTimeout: 40000,
    headless: false, // Must run headed to pass Cloudflare checks
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--start-maximized'
      ],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
  ],
});
