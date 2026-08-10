const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
    
    // Cookie banner selectors
    this.cookieBanner = page.locator('#onetrust-banner-sdk');
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');
    this.rejectCookiesBtn = page.locator('#onetrust-reject-all-handler');

    // Header selectors
    this.logo = page.locator('header a.logo');
    this.searchInput = page.locator('input#search');
    this.searchBtn = page.locator('header button.action.search');
    this.signInLink = page.locator('header a.action.my-account');
    this.basketLink = page.locator('header a.action.showcart');
    this.basketCount = page.locator('header a.action.showcart span.counter-number');
    this.basketCountWrapper = page.locator('header a.action.showcart span.counter.qty');

    // Nav Menu selectors
    this.gardenNavLink = page.locator('nav a.main-menu__link:has-text("GARDEN")');
    this.drivewayNavLink = page.locator('nav a.main-menu__link:has-text("DRIVEWAY")');
    
    // Sub-menu selectors (e.g. View All Garden Paving)
    this.viewAllGardenPaving = page.locator('a:has-text("View All Garden Paving")');
    this.viewAllDrivewayPaving = page.locator('a:has-text("View All Driveway Paving")');
  }

  async navigate(path = '') {
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    await this.page.goto(cleanPath, { waitUntil: 'domcontentloaded' });
    await this.handleCookieBanner();
  }

  async handleCookieBanner() {
    try {
      // Wait up to 8 seconds for the cookie banner accept button to appear
      await this.acceptCookiesBtn.waitFor({ state: 'visible', timeout: 8000 });
      console.log("Cookie consent banner detected. Clicking Accept All Cookies...");
      await this.acceptCookiesBtn.click();
      await this.acceptCookiesBtn.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
      console.log("Cookie consent banner did not appear or was already dismissed.");
    }
  }

  async searchFor(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToSignIn() {
    await this.signInLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToBasket() {
    await this.basketLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getBasketCount() {
    // Wait for the counter to load if items are present
    if (await this.basketCount.isVisible({ timeout: 3000 })) {
      const text = await this.basketCount.innerText();
      return parseInt(text.trim(), 10);
    }
    return 0;
  }
}

module.exports = BasePage;
