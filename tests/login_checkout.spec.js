const { test, expect } = require('@playwright/test');
const CategoryPage = require('../pages/CategoryPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const BasketPage = require('../pages/BasketPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('Scenario 3: Login with Checkout', () => {
  test('should add item and checkout using registered account mid-checkout', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.navigate('/garden-paving');
    await categoryPage.clickProductByIndex(0);
    
    const pdp = new ProductDetailPage(page);
    await pdp.addToBasket('Light Grey', 1, 1);
    
    // Take screenshot of item added success banner
    await page.screenshot({ path: 'screenshots/login_checkout/1_item_added_to_basket.png' });
    
    // Go to Basket and proceed to checkout
    await pdp.goToBasket();
    const basketPage = new BasketPage(page);
    await basketPage.clickProceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    
    // Assert email input is visible (Checkout load)
    await expect(checkoutPage.emailInput).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/login_checkout/2_checkout_loaded.png' });
    
    // Enter registered email
    const registeredEmail = 'ilfas.mansuri@bytestechnolab.com';
    await checkoutPage.fillEmail(registeredEmail);
    
    // Assert password input shows up, fill password
    await expect(checkoutPage.passwordInput).toBeVisible({ timeout: 10000 });
    await checkoutPage.passwordInput.fill('Smart@123');
    await page.screenshot({ path: 'screenshots/login_checkout/3_login_details_entered.png' });
    
    // Click Sign In button and wait for dynamic state to update
    await checkoutPage.loginBtn.click();
    await page.waitForTimeout(5000); // Wait for address list to render
    
    // Select shipping method and click Next
    await checkoutPage.selectShippingMethod();
    await page.screenshot({ path: 'screenshots/login_checkout/4_shipping_method_selected.png' });
    
    await checkoutPage.clickNext();
    
    // Verify payment step loads
    await expect(checkoutPage.placeOrderBtn).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/login_checkout/5_payment_step_loaded.png' });
    console.log("Registered checkout verified successfully!");
  });
});
