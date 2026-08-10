const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heroSlider = page.locator('.main-hero, .hero, .homepage-hero');
    this.gardenTile = page.locator('a:has-text("GARDEN PAVING")').first();
    this.drivewayTile = page.locator('a:has-text("DRIVEWAY PAVING")').first();
  }
}

module.exports = HomePage;
