import { deleteFolder } from "./src/helper/utils";
import * as os from "node:os";
import * as path from 'path';

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",
  tsConfigPath: "./tsconfig.json",

  port: 4723,

  specs: [
    "./test/login.spec.ts",
    "./test/form.spec.ts",
    "./test/swipe.spec.ts"
  ],

  exclude: [],

  maxInstances: 1,
  capabilities: [
    {
      platformName: "Android",
      "appium:platformName": "Android Emulator",
      "appium:automationName": "UiAutomator2",
      "appium:udid": "emulator-5554",
      "appium:app": path.join(process.cwd(), "./apk/android.wdio.native.app.v2.0.0.apk"),
      "appium:appPackage": "com.wdiodemoapp",
      "appium:appActivity": "com.wdiodemoapp.MainActivity",
      "appium:noReset": true,
      "appium:newCommandTimeout": 3600,
      "appium:connectHardwareKeyboard": true,
      "appium:deviceName": "emulator-5554",
    },
  ],

  logLevel: "silent",

  bail: 0,
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  services: ["appium"],

  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        reportedEnvironmentVars: {
          OS: os.version(),
          NODE_VER: process.version,
        },
        addConsoleLogs: true,
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
      },
    ],
    ['video', {
        outputDir: "./reports/video",
        saveAllVideos: true, 
        videoSlowdownMultiplier: 45,
    }],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  onPrepare: function () {
    console.log("Clearing Alluere Report");
    deleteFolder("allure-results");
    deleteFolder("allure-report");
    deleteFolder("./reports")
    deleteFolder("data/test/dataTest.json");
  },

  beforeSession: function (capabilities) {
    const { addLabel, addOwner } = require("@wdio/allure-reporter").default;
    addOwner("User DynamicAtom");

    const platform =
      (capabilities as any).platformName ||
      (capabilities as any)["appium:platformName"] ||
      "Unknown";
    addLabel("Environment", platform);

    const device =
      (capabilities as any).deviceName ||
      (capabilities as any)["appium:deviceName"] ||
      "Desktop";
    addLabel("Device", device);

    const app =
      (capabilities as any).appPackage ||
      (capabilities as any)["appium:appPackage"] ||
      "Unknown";
    addLabel("App", app);
  },

  beforeTest: async function (test) {
    console.log("\n");
    console.log(`Running Test: ${test.title}`);
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries },
  ) {
    if (passed) {
      await browser.takeScreenshot();
      console.log("==================================");
      console.log(`Test Title: ${test.title}`);
      console.log(`Test duration: ${duration}ms`);
      console.log(`Test passed: ${passed}`);
    } else if (error) {
      console.log("==================================");
      console.log(`Test Title: ${test.title}`);
      console.log(`Test failed: ${error.message}`);
    }
  },
  afterSession: async function () {
    console.log("TEST COMPLATE, TEARING PROCESS...");
    await browser.terminateApp("com.wdiodemoapp");
  },
};
