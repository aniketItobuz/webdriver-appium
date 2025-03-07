import { expect } from "@wdio/globals";
import { faker } from "@faker-js/faker";

describe("Checking signup and login functionality", () => {
  const fakeEmail = faker.internet.email();
  const fakePassword = faker.internet.password();
  it("Signup and Login", async () => {
    await driver.pause(1000);
    const platform = driver.capabilities.platformName?.toLowerCase();

    if (platform === "android") {
      console.log("Running Android-specific test");
      driver.pause(5000);
      const loginBar = await $("~Login");
      await loginBar.click();
      const loginText = await $(
        '//android.widget.TextView[@text="Login / Sign up Form"]'
      );
      const text = await loginText.getText();
      expect(text).toBe("Login / Sign up Form");
      const signUpTab = await $(
        '//android.view.ViewGroup[@content-desc="button-sign-up-container"]/android.view.ViewGroup'
      );
      await signUpTab.click();
      const signUpEmail = await $("~input-email");
      await signUpEmail.setValue(fakeEmail);
      const signUpPassword = await $("~input-password");
      await signUpPassword.setValue(fakePassword);
      const repeatPassword = await $("~input-repeat-password");
      await repeatPassword.setValue(fakePassword);
      const signUpButton = await $("~button-SIGN UP");
      await signUpButton.click();
      const signMsg = await $(
        '//android.widget.TextView[@resource-id="android:id/message"]'
      );
      const getMsg = await signMsg.getText();
      expect(getMsg).toBe("You successfully signed up!");
      await driver.acceptAlert();
      const loginTab = await $(
        '//android.view.ViewGroup[@content-desc="button-login-container"]/android.view.ViewGroup'
      );
      await loginTab.click();
      const loginEmail = await $("~input-email");
      await loginEmail.setValue(fakeEmail);
      const loginPassword = await $("~input-password");
      await loginPassword.setValue(fakePassword);
      const loginButton = await $("~button-LOGIN");
      await loginButton.click();
      const loginMsg = await $(
        '//android.widget.TextView[@resource-id="android:id/message"]'
      );
      const getLoginMsg = await loginMsg.getText();
      expect(getLoginMsg).toBe("You are logged in!");
      await driver.acceptAlert();
    } else if (platform === "ios") {
      console.log("Running iOS-specific test");
    } else {
      throw new Error("Unsupported platform detected");
    }
  });
});
