const { test, expect } = require('@playwright/test');
const BasePage = require('../pages/BasePage');

test.describe('Scenario 2: Create Account', () => {
  test('should validate registration form fields and register a new user', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigate('/customer/account/create/');
    
    // Check initial page title
    await expect(page).toHaveTitle(/(Create a New Account|Create New Customer Account)/i);
    
    // Fill out registration form with dynamic email
    const uniqueEmail = `user_register_${Date.now()}@bytestechnolab.com`;
    console.log(`Registering new customer email: ${uniqueEmail}`);
    
    await page.locator('input#firstname').fill('Bradstone');
    await page.locator('input#lastname').fill('Tester');
    await page.locator('input#email_address').fill(uniqueEmail);
    await page.locator('input#password').fill('SecurePass@123');
    await page.locator('input#password-confirmation').fill('SecurePass@123');
    
    // Take screenshot of filled details
    await page.screenshot({ path: 'screenshots/create_account/1_registration_filled.png' });
    
    // Click submit
    await page.locator('button.action.submit.primary').click();
    
    // Wait for account dashboard redirect
    await page.waitForURL('**/customer/**', { timeout: 20000 });
    
    // Verify success banner is shown (handles email confirmation notice or direct signup thank-you)
    const successMsg = page.locator('.message-success, .messages .message-success').first();
    await expect(successMsg).toBeVisible({ timeout: 10000 });
    await expect(successMsg).toContainText(/(Thank you for registering|confirm your account)/i);
    
    // Take screenshot of successful registration dashboard
    await page.screenshot({ path: 'screenshots/create_account/2_registration_success.png' });
  });
});
