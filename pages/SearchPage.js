const BasePage = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchTitle = page.locator('h1.page-title span');
    this.productItems = page.locator('.product-item');
    this.noResultsMessage = page.locator('.message.notice, .search.results .message.notice');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async getSearchTitleText() {
    return (await this.searchTitle.innerText()).trim();
  }

  async getNoResultsText() {
    if (await this.noResultsMessage.isVisible()) {
      return (await this.noResultsMessage.innerText()).trim();
    }
    return '';
  }
}

module.exports = SearchPage;
