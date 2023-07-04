import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:  [
    ['list'],
    ['monocart-reporter', {
        name: "mono cart report",
        outputFile: './test-report/report.html',
        visitor: (data, metadata, collect) => {
            // auto collect data from the comments
            const parserOptions = {
                // Indicate the mode the code should be parsed in.
                // Can be one of "script", "module", or "unambiguous". Defaults to "script".
                sourceType: 'module'

                // enable typescript syntax.
                // plugins: ['typescript']

                // more https://babeljs.io/docs/babel-parser
            };
            const comments = collect.comments(parserOptions);
            if (comments) {
                // Append all collected comments data to report data
                Object.assign(data, comments);
            }
        },
        onEnd: async (reportData, capability) => {

        }
    }]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'Chromium',
    //   use: {
    //     ignoreHTTPSErrors: true,
    //     channel: 'chrome',
    //   },
    // },
    {
      name: 'test',
      testDir: './tests/',
      retries: 1,
      use: {
        headless: false,
        channel: 'chrome',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
