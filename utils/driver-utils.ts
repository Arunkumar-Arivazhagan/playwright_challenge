import { chromium, firefox, webkit, Browser, Page, BrowserContext } from '@playwright/test';

class DriverUtils {
  static async createBrowserAndPage(browserName: string = 'chromium'): Promise<{ browser: Browser; page: Page; context: BrowserContext }> {
    let browser: Browser;
    switch (browserName) {
      case 'chromium':
        browser = await chromium.launch();
        break;
      case 'firefox':
        browser = await firefox.launch();
        break;
      case 'webkit':
        browser = await webkit.launch();
        break;
      default:
        throw new Error(`Invalid browser name: ${browserName}`);
    }

    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, page, context };
  }

  static async closeBrowser(browser: Browser | undefined): Promise<void> {
    if (browser) {
      await browser.close();
    }
  }
}

export default DriverUtils;