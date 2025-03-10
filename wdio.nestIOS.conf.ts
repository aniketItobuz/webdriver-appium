export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  port: 4723,
  specs: ['./test/specs/nest/loginIOS.test.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
      {
          platformName: 'iOS',
          'appium:deviceName': 'iPhone 16 Pro Max',
          'appium:platformVersion': '18.3',
          'appium:automationName': 'XCUITest',
          'appium:app': '/Volumes/data/webdriver.io/webdriver-appium/app/neststartertemplateapp.app',
          'appium:noReset': true,
          'appium:newCommandTimeout': 90000,
          'appium:autoGrantPermissions': true,  // ✅ Auto-grant permissions
          'wdio:maxInstances': 1,
      },
  ],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
  mochaOpts: {
      ui: 'bdd',
      timeout: 60000
  },

  afterTest: async function (test, { passed }) {
      if (!passed) {
          const screenshotPath = `./screenshots/${test.title.replace(/ /g, '_')}.png`;
          await browser.saveScreenshot(screenshotPath);
          console.log(`Screenshot saved: ${screenshotPath}`);
      }
  },

  beforeSession: async function () {
      console.log("Setting up before the session...");
  },

  afterSession: async function () {
      console.log("All tests completed, closing the app...");
  },

  beforeTest: async function (test: any) {
      console.log(`Running test: ${test.title}`);
  },
};
