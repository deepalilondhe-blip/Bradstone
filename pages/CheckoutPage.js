const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Shipping Address fields
    this.emailInput = page.locator('#customer-email');
    this.passwordInput = page.locator('#customer-password, #pass'); // inline login password
    this.loginBtn = page.locator('button.action.login'); // inline login button
    
    this.firstnameInput = page.locator('input[name="firstname"]');
    this.lastnameInput = page.locator('input[name="lastname"]');
    this.companyInput = page.locator('input[name="company"]');
    this.street0Input = page.locator('input[name="street[0]"]');
    this.street1Input = page.locator('input[name="street[1]"]');
    this.cityInput = page.locator('input[name="city"]');
    this.regionInput = page.locator('input[name="region"]');
    this.postcodeInput = page.locator('input[name="postcode"]');
    this.telephoneInput = page.locator('input[name="telephone"]');
    
    // Shipping methods & buttons
    this.shippingMethodRadio = page.locator('input[type="radio"][name="ko_unique_1"], input[type="radio"].radio').first();
    this.nextBtn = page.locator('button.button.action.continue.primary');
    
    // Payment Step selectors
    this.placeOrderBtn = page.locator('.payment-method-content button.action.primary.checkout, button:has-text("Place Order")').first();
    this.checkMoneyOrderRadio = page.locator('input[type="radio"][value="checkmo"]');
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(2000); // Wait for potential customer checks
  }

  async fillInlineLogin(password) {
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(3000); // Wait for address info to populate
  }

  async fillShippingAddress(details) {
    await this.firstnameInput.fill(details.firstname);
    await this.lastnameInput.fill(details.lastname);
    if (details.company) await this.companyInput.fill(details.company);
    await this.street0Input.fill(details.street0);
    if (details.street1) await this.street1Input.fill(details.street1);
    await this.cityInput.fill(details.city);
    await this.regionInput.fill(details.region);
    await this.postcodeInput.fill(details.postcode);
    await this.telephoneInput.fill(details.telephone);
  }

  async selectShippingMethod() {
    // If not checked, click it
    if (await this.shippingMethodRadio.isVisible()) {
      await this.shippingMethodRadio.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async clickNext() {
    await this.nextBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(5000); // Wait for transition to payment step
  }

  async selectCheckMoneyOrder() {
    if (await this.checkMoneyOrderRadio.isVisible()) {
      await this.checkMoneyOrderRadio.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickPlaceOrder() {
    // Note: In tests we can choose whether to click this or not
    await this.placeOrderBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = CheckoutPage;
