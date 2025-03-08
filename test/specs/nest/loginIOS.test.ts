import { faker } from "@faker-js/faker";

describe("Checking login functionality in nest app", () => {
  const Email = "example+super-admin@example.com";
  const Password = "SamLauncher@123";
  it("Login nest app", async () => {
    await driver.pause(1000);
    const platform = driver.capabilities.platformName?.toLowerCase();

    if (platform === "android") {
      console.log("Running Android-specific test");
    } else if (platform === "ios") {
      console.log("Running iOS-specific test");
      const email = await $("~login-email-input");
      await email.setValue(Email);
      const password = await $("~login-password-input");
      await password.setValue(Password);
      const loginButton = await $("~login-submit-button");
      await loginButton.click();
    } else {
      throw new Error("Unsupported platform detected");
    }
  });
});