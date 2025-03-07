import { faker } from "@faker-js/faker";

describe("Checking login functionality in nest app", () => {
  const fakeEmail = faker.internet.email();
  it("Login nest app", async () => {
    await driver.pause(1000);
    const platform = driver.capabilities.platformName?.toLowerCase();

    if (platform === "android") {
      console.log("Running Android-specific test");
      const email = await $("~login-email-input");
      await email.setValue(fakeEmail);
      
    } else if (platform === "ios") {
      console.log("Running iOS-specific test");
    } else {
      throw new Error("Unsupported platform detected");
    }
  });
});
