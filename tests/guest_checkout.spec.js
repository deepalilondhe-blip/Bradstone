const { test, expect } = require('@playwright/test');
const CategoryPage = require('../pages/CategoryPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const BasketPage = require('../pages/BasketPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('Scenario 4: Without Login Checkout (Guest)', () => {
  test('should add item and complete guest shipping step to reach payment', async ({ page }) => {
    const categoryPage = new CategoryPage(page);
    await categoryPage.navigate('/garden-paving');
    await categoryPage.clickProductByIndex(0);
    
    const pdp = new ProductDetailPage(page);
    await pdp.addToBasket('Light Grey', 1, 1);
    
    // Take screenshot of item added success banner
    await page.screenshot({ path: 'screenshots/guest_checkout/1_item_added_to_basket.png' });
    
    // Go to Basket and proceed to checkout
    await pdp.goToBasket();
    const basketPage = new BasketPage(page);
    await basketPage.clickProceedToCheckout();
    
    const checkoutPage = new CheckoutPage(page);
    
    // Assert email input is visible (Checkout load)
    await expect(checkoutPage.emailInput).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/guest_checkout/2_checkout_loaded.png' });
    
    // Fill guest email
    const uniqueEmail = `guest_test_${Date.now()}@bytestechnolab.com`;
    await checkoutPage.fillEmail(uniqueEmail);
    
    // Fill guest shipping details
    const shippingDetails = {
      firstname: 'Test',
      lastname: 'Guest',
      street0: '12 Derby Road',
      street1: '',
      city: 'Ashbourne',
      region: 'Derbyshire',
      postcode: 'DE6 1AA',
      telephone: '01335372222'
    };
    await checkoutPage.fillShippingAddress(shippingDetails);
    await page.screenshot({ path: 'screenshots/guest_checkout/3_guest_address_filled.png' });
    
    // Select shipping method
    await checkoutPage.selectShippingMethod();
    await page.screenshot({ path: 'screenshots/guest_checkout/4_shipping_method_selected.png' });
    
    // Proceed to payment step
    await checkoutPage.clickNext();
    
    // Verify payment step loaded
    await expect(checkoutPage.placeOrderBtn).toBeVisible({ timeout: 15000 });
    await page.screenshot({ path: 'screenshots/guest_checkout/5_payment_step_loaded.png' });
    console.log("Guest checkout verified successfully!");
  });
});
