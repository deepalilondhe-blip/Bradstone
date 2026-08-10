const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class BasketPage extends BasePage {
  constructor(page) {
    super(page);
    this.qtyInput = page.locator('input.qty, input.item-qty').first();
    this.updateBasketBtn = page.locator('button.action.update, button:has-text("UPDATE BASKET")').first();
    this.proceedToCheckoutBtn = page.locator('button.action.primary.checkout, button:has-text("PROCEED TO CHECKOUT")').first();
    this.removeBtn = page.locator('a:has-text("REMOVE")').first();
    this.cartEmptyMessage = page.locator('.cart-empty, .cart-empty-message');
    
    // Totals
    this.subtotalDisplay = page.locator('td[data-th="Subtotal"] .price, .subtotal .price').first();
    this.grandTotalDisplay = page.locator('tr.grand.totals .price, td[data-th="Order Total"] .price, .grand.totals .price').first();
  }

  async updateQuantity(qty) {
    await this.qtyInput.fill(qty.toString());
    await this.updateBasketBtn.click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(3000); // Wait for recalculation
  }

  async removeItem() {
    await this.removeBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000); // Wait for animation
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getSubtotal() {
    return (await this.subtotalDisplay.innerText()).trim();
  }

  async getGrandTotal() {
    return (await this.grandTotalDisplay.innerText()).trim();
  }

  async isEmpty() {
    return await this.cartEmptyMessage.isVisible();
  }
}

module.exports = BasketPage;
