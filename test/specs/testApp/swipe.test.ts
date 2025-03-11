describe("Swipe Test", () => {
    it("should swipe on the screen", async () => {
      const platform = driver.capabilities.platformName?.toLowerCase();
  
      if (platform === "android") {
        console.log("Running Android-specific test");
        const swipeButton = await $("~Swipe");
        await swipeButton.click();
  
        // Define swipe function
        async function swipeUp() {
          await driver.performActions([
            {
              type: "pointer",
              id: "finger1",
              parameters: { pointerType: "touch" },
              actions: [
                { type: "pointerMove", duration: 0, x: 500, y: 1800 }, // Start at bottom
                { type: "pointerDown", button: 0 },
                { type: "pause", duration: 300 }, // Hold touch
                { type: "pointerMove", duration: 1000, x: 500, y: 300 }, // Move up
                { type: "pointerUp", button: 0 },
              ],
            },
          ]);
        }
  
        // Find the target element
        const targetElement = await $(
          '//android.widget.TextView[@text="You found me!!!"]'
        ); // Replace with actual element locator
  
        let maxScrolls = 10; // Prevent infinite loop
        let currentScroll = 0;
  
        while (!(await targetElement.isDisplayed()) && currentScroll < maxScrolls) {
          console.log(`Scrolling attempt ${currentScroll + 1}...`);
          await swipeUp();
          currentScroll++;
        }
  
        if (await targetElement.isDisplayed()) {
          console.log("Element found! Clicking...");
          await targetElement.click();
        } else {
          throw new Error("Element not found after scrolling.");
        }
      }
    });
  });
  