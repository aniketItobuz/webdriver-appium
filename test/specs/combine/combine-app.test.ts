import { faker } from "@faker-js/faker";
describe("Test Multiple Android Apps", () => {
  const Email = "example+super-admin@example.com";
  const Password = "SamLauncher@123";
  const inputValue = faker.lorem.word();
  it("Launch testApp and Perform Actions", async () => {
    await driver.activateApp("com.wdiodemoapp");
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
  });

  it("Switch to nest and Perform Actions", async () => {
    await driver.activateApp("com.neststartertemplateapp");
    const email = await $("~login-email-input");
    await email.setValue(Email);
    const password = await $("~login-password-input");
    await password.setValue(Password);
    const loginButton = await $("~login-submit-button");
    await loginButton.click();
    // const profileButton = await $('//android.widget.TextView[@text=""]');
    // await profileButton.click();
    // const logoutButton = await $("~ logout-button");
    // await logoutButton.click();
  });

  it("Switch Back to testApp", async () => {
    await driver.activateApp("com.wdiodemoapp");
    const formsBar = await $("~Drag");
    await formsBar.click();

    const dragDropPairs = [
      ["~drag-c1", "~drop-c1"],
      ["~drag-c2", "~drop-c2"],
      ["~drag-c3", "~drop-c3"],
      ["~drag-l1", "~drop-l1"],
      ["~drag-l2", "~drop-l2"],
      ["~drag-l3", "~drop-l3"],
      ["~drag-r1", "~drop-r1"],
      ["~drag-r2", "~drop-r2"],
      ["~drag-r3", "~drop-r3"],
    ];

    for (const [drag, drop] of dragDropPairs) {
      const sourceElement = await $(drag);
      const targetElement = await $(drop);
      await sourceElement.dragAndDrop(targetElement);
    }

    const successfulMsg = await $(
      '//android.widget.TextView[@text="Congratulations"]'
    );
    const msg = await successfulMsg.getText();
    expect(msg).toBe("Congratulations");
  });
});
