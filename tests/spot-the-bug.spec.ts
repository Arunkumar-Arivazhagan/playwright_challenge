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
    try {
      const { browser: createdBrowser, page: createdPage, context: createdBrowserContext } = await DriverUtils.createBrowserAndPage('chromium');
      browser = createdBrowser;
      page = createdPage;
      context = createdBrowserContext;
      spotTheBugPage = new SpotTheBugPage(page);
      await spotTheBugPage.navigateTo(baseURL);
    } catch (error) {
      console.error('Error in beforeEach hook:', error);
      throw error;
    }
  });

  test.afterEach(async () => {
    await DriverUtils.closeBrowser(browser);
  });

  test('Checking if the elements are loading', async () => {
    try {
      await expect(spotTheBugPage.firstNameInput).toBeVisible();
      await expect(spotTheBugPage.lastNameInput).toBeVisible();
      await expect(spotTheBugPage.phoneNumberInput).toBeVisible();
      await expect(spotTheBugPage.countryDropdown).toBeVisible();
      await expect(spotTheBugPage.emailInput).toBeVisible();
      await expect(spotTheBugPage.passwordInput).toBeVisible();
      await expect(spotTheBugPage.termsAndConditionsCheckbox).toBeVisible();
      await expect(spotTheBugPage.registerButton).toBeVisible();
    } catch (error) {
      console.error('Error checking element visibility:', error);
      throw error;
    }
  });

  test('Submitting the form with all required fields filled', async () => {
    try {
      const testData: RegistrationFormData = {
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '1234567890',
        email: 'test1@email.com',
        password: 'password123',
        termsAndConditions: true,
      };
      await spotTheBugPage.fillForm(testData);
      await spotTheBugPage.submitForm();
    } catch (error) {
      console.error('Error submitting form with valid data:', error);
      throw error;
    }
  });

  test('Submitting the form with invalid phone data', async () => {
    try {
      const testData: RegistrationFormData = {
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '',
        email: 'test2@email.com',
        password: 'password123',
        termsAndConditions: true,
      };
      await spotTheBugPage.fillForm(testData);
      await spotTheBugPage.submitForm();
      await spotTheBugPage.checkPhoneInvalid('The phone number should contain at least 10 characters!');
    } catch (error) {
      console.error('Error submitting form with missing fields:', error);
      throw error;
    }
  });

  test('Submitting the form with invalid password data', async () => {
    try {
      const testData: RegistrationFormData = {
        firstName: 'John',
        lastName: 'Smith',
        phoneNumber: '',
        email: 'test2@email.com',
        password: 'password123',
        termsAndConditions: true,
      };
      await spotTheBugPage.fillForm(testData);
      await spotTheBugPage.submitForm();
      await spotTheBugPage.checkPasswordInvalid('The password should contain between [6,20] characters!');
    } catch (error) {
      console.error('Error submitting form with invalid password:', error);
      throw error;
    }
  });

  test('Check for broken image', async () => {
    try {
      await spotTheBugPage.checkForBrokenImages();
    } catch (error) {
      console.error('Check for broken image:', error);
      throw error;
    }
  });

});