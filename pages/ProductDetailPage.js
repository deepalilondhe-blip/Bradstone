const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.colorSwatches = page.locator('.swatch-option');
    this.sizeSelect = page.locator('select.swatch-select.size');
    this.qtyInput = page.locator('input#qty');
    this.addToBasketBtn = page.locator('button#product-addtocart-button');
    this.successMessage = page.locator('.message-success');
    this.priceDisplay = page.locator('.price-box .price, .price-wrapper .price, [data-price-type="finalPrice"]').first();
  }

  async selectColor(colorLabel) {
    const swatch = this.page.locator(`.swatch-option[data-option-label="${colorLabel}"]`).first();
    await swatch.click();
    await this.page.waitForTimeout(1000); // Wait for sizes to load/populate
  }

  async selectSizeByIndex(index) {
    await this.sizeSelect.selectOption({ index });
    await this.page.waitForTimeout(1000); // Wait for price to update
  }

  async selectSizeByText(text) {
    await this.sizeSelect.selectOption({ label: text });
    await this.page.waitForTimeout(1000); // Wait for price to update
  }

  async setQuantity(qty) {
    await this.qtyInput.fill(qty.toString());
  }

  async getPrice() {
    return (await this.priceDisplay.innerText()).trim();
  }

  async clickAddToBasket() {
    await this.addToBasketBtn.click();
  }

  async addToBasket(colorLabel, sizeIndex, qty) {
    await this.selectColor(colorLabel);
    await this.selectSizeByIndex(sizeIndex);
    await this.setQuantity(qty);
    await this.clickAddToBasket();
    // Wait for success message
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }
}

module.exports = ProductDetailPage;
