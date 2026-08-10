const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 1000 }
  });
  const page = await context.newPage();
  
  try {
    await page.goto('https://mcstaging.bradstone.com/homeowner/customer/account/login/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);

    // Dismiss cookie banner
    const acceptBtn = page.locator('#onetrust-accept-btn-handler');
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(1000);
    }

    // Fill credentials
    console.log("Filling login credentials...");
    await page.locator('input#email').fill('ilfas.mansuri@bytestechnolab.com');
    await page.locator('input#pass[name="login[password]"]').fill('Smart@123');
    
    // Click Sign In
    console.log("Clicking Sign In...");
    await page.locator('button#send2').first().click();
    
    // Wait 8 seconds for response
    await page.waitForTimeout(8000);
    
    console.log("Page title after click:", await page.title());
    console.log("Current URL after click:", page.url());

    // Check for error messages or other visible alerts
    const errors = await page.locator('.message-error, .messages .message-error').allTextContents();
    console.log("Error messages on screen:", errors);

    await page.screenshot({ path: 'C:/Bradstone/login_result_scratch.png' });
    console.log("Screenshot saved to C:/Bradstone/login_result_scratch.png");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await browser.close();
  }
})();
