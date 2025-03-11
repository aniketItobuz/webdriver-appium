// @ts-ignore
import allure from 'allure-commandline';

export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  port: 4723,
  specs: [
    "/Volumes/ANI/appium/test/specs/testApp/drag.test.ts",
    "/Volumes/ANI/appium/test/specs/testApp/form.test.ts",
    "/Volumes/ANI/appium/test/specs/testApp/signup_login.test.ts",
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Pixel 9 Pro",
      "appium:platformVersion": "15",
      "appium:automationName": "UiAutomator2",
      "appium:app": "/Volumes/ANI/appium/app/testApp.apk",
      "appium:noReset": true,
      "appium:newCommandTimeout": 30000,
      "wdio:maxInstances": 1,
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["appium"],
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  beforeSession: async function () {
    console.log("Setting up before the session...");
  },

  afterSession: async function () {
    console.log("All tests completed, closing the app...");
    await driver.deleteSession();
  },

  beforeTest: async function (test: any) {
    console.log(`Running test: ${test.title}`);
  },

  onComplete: function() {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(reportError),
        5000
      );

      generation.on('exit', function(exitCode: number) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log('Allure report successfully generated');
        resolve(void 0);
      });
    });
  }
};
