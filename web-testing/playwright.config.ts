import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalSetup: "./setup/global_setup",
  testDir: "./tests/",

  // testMatch: [
    
  //   // "login.spec.ts",
  //   // "dashboard.spec.ts",
  //   // "contact.spec.ts",
  //   // "aboutus.spec.ts",
  //   // "detailproduct.spec.ts",
  //   // "cart.spec.ts",
  //   "e2_flow_purchase.spec.ts"
  // ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
   ["./reporter/custom-report.ts"],
    // ["list"],
    // ["line", { printSteps: true }],
    // ['html', { open: 'always' }],
    ["allure-playwright", { detail: false, suiteTitle: true, title: 'QA-TASK-WEB_TESTING' }],
  ],
  
  metadata: {
    browser: "chromium",
    platform: "Windows",
    version: "10",
    environment: "Development",
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    video: 'on',
    launchOptions: {
      slowMo: 350,
    },
    headless: true,
    screenshot: "on",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Regression 2026",
      use: { ...devices["Desktop Chrome"] },
    },

    
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
