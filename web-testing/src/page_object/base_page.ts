import { Page, Locator } from '@playwright/test'

const LONG_TIMEOUT = 10000;
const MEDIUM_TIMEOUT = 5000;
const SHORT_TIMEOUT = 2000;

export default class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  async gotoUrl(urlPath: string) {
    await this.page.goto(urlPath);
    await this.page.waitForLoadState('domcontentloaded');
  }
  
  async tap(selector: string | Locator) {
    const element = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;
    await element.click();
  }
  
  async waitForElementVisible(selector: string | Locator, timeout = MEDIUM_TIMEOUT) {
    const element = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;
    await element.waitFor({state: 'visible', timeout: timeout});
  }
  
  async fill(selector: string | Locator, param: string) {
    const element = typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;
    await element.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await element.fill(param);
  }
  
  
}

