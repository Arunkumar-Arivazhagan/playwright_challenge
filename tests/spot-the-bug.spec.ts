import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import DriverUtils from '../utils/driver-utils';
import SpotTheBugPage from '../pages/spot-the-bug-page';
import { RegistrationFormData } from '../pages/spot-the-bug-page';

const baseURL = 'https://qa-practice.netlify.app/bugs-form';

test.describe('Bug Report Form', () => {
  let page: Page;
  let spotTheBugPage: SpotTheBugPage;
  let browser: Browser;
  let context: BrowserContext;

  test.beforeEach(async ({ context: createdContext }) => {
    const { browser: createdBrowser, page: createdPage, context: createdBrowserContext } = await DriverUtils.createBrowserAndPage('chromium');
    browser = createdBrowser;
    page = createdPage;
    context = createdBrowserContext;
    spotTheBugPage = new SpotTheBugPage(page);
    await spotTheBugPage.navigateTo(baseURL);
  });

  test.afterEach(async () => {
    await DriverUtils.closeBrowser(browser);
  });

  test('Submitting the form with all required fields filled', async () => {
    const testData: RegistrationFormData = {
      firstName: '', // Missing first name
      lastName: 'User',
      phoneNumber: '123-456-7890',
      country: 'United States',
      email: 'test@example.com',
      password: 'password123',
      termsAndConditions: true,
    };

    await spotTheBugPage.fillForm(testData);
    await spotTheBugPage.submitForm();
    await spotTheBugPage.verifySuccess(); // Implement verification logic
  });

  test('Submitting the form with missing required fields', async () => {
    const testData: RegistrationFormData = {
      firstName: '', // Missing first name
      lastName: 'User',
      phoneNumber: '123-456-7890',
      country: 'United States',
      email: 'test@example.com',
      password: 'password123',
      termsAndConditions: true,
    };

    await spotTheBugPage.fillForm(testData);
    await spotTheBugPage.submitForm();
    await spotTheBugPage.verifyRequiredFieldErrors(); // Check for all required field errors
  });

  test('Submitting the form with invalid email', async () => {
    const testData: RegistrationFormData = {
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '123-456-7890',
      country: 'United States',
      email: 'invalid-email', // Invalid email
      password: 'password123',
      termsAndConditions: true,
    };

    await spotTheBugPage.fillForm(testData);
    await spotTheBugPage.submitForm();
    await spotTheBugPage.verifyEmailError(); // Check for email error
  });

  test('Check default value of country dropdown', async () => {
    await spotTheBugPage.verifyCountryDropdownDefaultValue('Select a country'); // Replace with the actual default value
  });

  test('Dropdown Selection and Assertion for Country', async () => {
        const testData: RegistrationFormData = {
            firstName: 'Test',
            lastName: 'User',
            phoneNumber: '123-456-7890',
            country: 'United States', // Or the value of your country option
            email: 'test@example.com',
            password: 'password123',
            termsAndConditions: true, // Set to true to check the box
        };
        await spotTheBugPage.fillForm(testData);
        await spotTheBugPage.selectCountry('United States'); // Select by value
        await spotTheBugPage.assertCountryValue('United States'); // Assert value

        await spotTheBugPage.selectCountry({ label: 'Canada' }); // Select by label
        await spotTheBugPage.assertCountryValue('Canada'); // Assert value

        await spotTheBugPage.selectCountry({ index: 2 }); // Select by index (if needed)
        const expectedValueByIndex = await spotTheBugPage.countryDropdown.inputValue(); // Get the actual value selected by index
        await spotTheBugPage.assertCountryValue(expectedValueByIndex || ''); // Assert value (handle potential null)
    });

});