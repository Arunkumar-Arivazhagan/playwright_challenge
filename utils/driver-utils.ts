import { chromium, firefox, webkit, Browser, Page, BrowserContext } from '@playwright/test';

class DriverUtils {
  static async createBrowserAndPage(browserName: string = 'chromium',  headless: boolean = true): Promise<{ browser: Browser; page: Page; context: BrowserContext }> {
    try{
    let browser: Browser;
    switch (browserName) {
      case 'chromium':
        browser = await chromium.launch({ headless });
        break;
      case 'firefox':
        browser = await firefox.launch({ headless });
        break;
      case 'webkit':
        browser = await webkit.launch({ headless });
        break;
      default:
        throw new Error(`Invalid browser name: ${browserName}`);
    }

    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, page, context };
  } catch (error){
    console.error(`Error  creating browser or page (${browserName}, headless: ${headless}):`, error)
    throw error;
  }
}

  static async closeBrowser(browser: Browser | undefined): Promise<void> {
    if (browser) {
      await browser.close();
    }
  }
}

export default DriverUtils;