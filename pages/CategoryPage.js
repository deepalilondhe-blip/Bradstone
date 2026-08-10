const BasePage = require('./BasePage');

class CategoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.productGrid = page.locator('.products.list.items, .product-items');
    this.productItems = page.locator('.product-item');
    this.productNames = page.locator('.product-item-name a, .product-item-link');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async clickProductByName(name) {
    const productLink = this.page.locator(`.product-item-name a:has-text("${name}"), .product-item-link:has-text("${name}")`).first();
    await productLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickProductByIndex(index) {
    const productLink = this.productNames.nth(index);
    await productLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getProductDetails(index) {
    const product = this.productItems.nth(index);
    const name = (await product.locator('.product-item-name, .product-item-link').first().innerText()).trim();
    
    // Price could be a range or complex text on Magento
    const priceText = await product.locator('.price-box, .price, [data-price-type="finalPrice"]').first().innerText();
    
    const imageSrc = await product.locator('img.product-image-photo, .product-image-container img').first().getAttribute('src');
    
    const swatchOptionsCount = await product.locator('.swatch-option').count();

    return {
      name,
      price: priceText.trim(),
      imageSrc,
      hasSwatches: swatchOptionsCount > 0
    };
  }
}

module.exports = CategoryPage;
