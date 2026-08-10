const { test, expect } = require('@playwright/test');
const BasePage = require('../pages/BasePage');

test.describe('Scenario 1: Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const basePage = new BasePage(page);
    console.log("Navigating to login page...");
    await basePage.navigate('/customer/account/login/');
    
    // Take immediate debug screenshot to see what is loaded
    await page.screenshot({ path: 'screenshots/login/debug_after_nav.png' });
    console.log("Debug screenshot saved. Page Title is:", await page.title());

    // Fill credentials
    await page.locator('input#email').fill('ilfas.mansuri@bytestechnolab.com');
    await page.locator('input#pass[name="login[password]"]').fill('Smart@123');
    
    // Take screenshot of credentials filled
    await page.screenshot({ path: 'screenshots/login/1_details_entered.png' });
    
    // Click Sign In
    await page.locator('button#send2').first().click();
    
    // Wait for redirect to customer area
    await page.waitForURL('**/customer/**', { timeout: 20000 });
    await expect(page).toHaveTitle(/(My Account|Rewards|Points)/i);
    
    // Take screenshot of login success dashboard
    await page.screenshot({ path: 'screenshots/login/2_login_success.png' });
  });

  test('should fail login with invalid credentials', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigate('/customer/account/login/');
    
    await page.locator('input#email').fill('ilfas.wrong@bytestechnolab.com');
    await page.locator('input#pass[name="login[password]"]').fill('WrongPass123');
    await page.locator('button#send2').first().click();
    
    // Expect error alert
    const errorMsg = page.locator('.message-error, .messages .message-error').first();
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    
    // Take screenshot of validation error
    await page.screenshot({ path: 'screenshots/login/3_login_failed_error.png' });
  });
});
