import { expect } from "@wdio/globals";
import { faker } from "@faker-js/faker";

describe("Drag and drop functionality check", () => {
  it("Drag and drop components checking", async () => {
    await driver.pause(1000);
    const platform = driver.capabilities.platformName?.toLowerCase();

    if (platform === "android") {
      console.log("Running Android-specific test");
      driver.pause(5000);
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
    } else if (platform === "ios") {
      console.log("Running iOS-specific test");
    } else {
      throw new Error("Unsupported platform detected");
    }
  });
});
