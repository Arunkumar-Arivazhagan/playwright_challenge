import {test, expect, Browser, Page} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('test1', async()=>{
    const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
    const page:Page = await browser.newPage();

    //authentication
    const username ='';
    const password ='';

    page.setExtraHTTPHeaders({Authorization: createAuthHeader(username, password)});

    //launch
    await page.goto('');
});

function createAuthHeader(username:any, password:any){
    return 'Basic' +btoa(username+':'+password);
}