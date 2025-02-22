import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('test1', async()=>{
    const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
    const page:Page = await browser.newPage();

    //launch
    await page.goto("https://qa-practice.netlify.app/bugs-form");
    
    
    const firstName:Locator = page.locator('id=firstName');//locate elements by ID
    const lastName:Locator = page.locator('id=lastName');
    const phoneNumber:Locator = page.locator('.form-control'); //locate elements by classname
    const email:Locator = page.locator('//input[@id="emailAddress"]');//locate elements by xpath
    const password:Locator = page.locator('input#password'); //locate elements by css
    
    await page.getByRole('checkbox').isEnabled;
    const privacyCheckBox:Locator = page.locator('exampleCheck1');
    
    const registerBtn:Locator = page.locator('text=Register');
    const registerBtnExist = await registerBtn.isEnabled();
    

    //perform action
    await firstName.fill("John");
    await lastName.fill("Smith");
})