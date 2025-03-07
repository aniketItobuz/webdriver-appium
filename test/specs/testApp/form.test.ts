import { expect } from "@wdio/globals";
import { faker } from "@faker-js/faker";

describe("Form functionality check", () => {
  const inputValue = faker.lorem.word();
  it("Form components checking", async () => {
    await driver.pause(1000);
    const platform = driver.capabilities.platformName?.toLowerCase();

    if (platform === "android") {
      console.log("Running Android-specific test");
      driver.pause(5000);
      const formsBar = await $("~Forms");
      await formsBar.click();
      const inputField = await $("~text-input");
      await inputField.setValue(inputValue);
      const inputTextResult = await $("~input-text-result");
      const inputTextResultValue = await inputTextResult.getText();
      expect(inputTextResultValue).toBe(inputValue);
      const dropDown = await $(
        '//android.widget.EditText[@resource-id="text_input"]'
      );
      await dropDown.click();
      const dropDownOption = await $(
        '//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Appium is awesome"]'
      );
      await dropDownOption.click();
      const switchButton = await $("~switch");
      const switchText = await $(
        '//android.widget.TextView[@content-desc="switch-text"]'
      );
      const switchTextValue = await switchText.getText();
      expect(switchTextValue).toBe("Click to turn the switch ON");
      await switchButton.click();
      const switchOffText = await $(
        '//android.widget.TextView[@content-desc="switch-text"]'
      );
      const switchOffTextValue = await switchOffText.getText();
      expect(switchOffTextValue).toBe("Click to turn the switch OFF");
      // const buttonInactive = await $("~button-Inactive");
      // const isEnabled = await buttonInactive.isEnabled();
      // console.log("Button is enabled: ", isEnabled);
      //expect(isEnabled).toBe(false);
    } else if (platform === "ios") {
      console.log("Running iOS-specific test");
    } else {
      throw new Error("Unsupported platform detected");
    }
  });
});
