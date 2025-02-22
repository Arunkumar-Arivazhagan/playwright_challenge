import { expect, Locator, Page } from '@playwright/test';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
}

class SpotTheBugPage {
  firstNameInput: Locator;
  lastNameInput: Locator;
  phoneNumberInput: Locator;
  countryDropdown: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  termsAndConditionsCheckbox: Locator;
  registerButton: Locator;
  //error messages
  phoneNumberError: Locator;
  passwordError: Locator;
  finalMessage: Locator;
  
  constructor(public page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator('#firstName'); 
    this.lastNameInput = this.page.locator('#lastName'); 
    this.phoneNumberInput = this.page.locator('#phone'); 
    this.countryDropdown = this.page.locator('#countries_dropdown_menu'); 
    this.emailInput = this.page.locator('#emailAddress'); 
    this.passwordInput = this.page.locator('#password'); 
    this.termsAndConditionsCheckbox = this.page.locator('#exampleCheck1');
    this.registerButton = this.page.locator('#registerBtn');

    this.passwordError = this.page.locator('#message');
    this.phoneNumberError = this.page.locator('#message');
    this.finalMessage = this.page.locator('#success-message');
  }

  async navigateTo(baseURL: string): Promise<void> {
    try {
      await this.page.goto(baseURL);
    } catch (error) {
      console.error(`Error navigating to ${baseURL}:`, error);
      throw error; // Re-throw to be handled by the test
    }
  }

  async fillForm(data: RegistrationFormData): Promise<void> {
    try {
      await this.firstNameInput.fill(data.firstName);
      await this.lastNameInput.fill(data.lastName);
      await this.phoneNumberInput.fill(data.phoneNumber);
      await this.emailInput.fill(data.email);
      await this.passwordInput.fill(data.password);
    } catch (error) {
      console.error('Error filling form:', error);
      throw error;
    }
  }

  async checkForBrokenImages() {
    try {
      const images = await this.page.$$('img');
      for (const image of images) {
        const src = await image.getAttribute('src');
        if (src) {
          const response = await this.page.request.get(src);
          expect(response.status()).toBe(200);
        }
      }
    } catch (error) {
      console.error('Error checking for broken images:', error);
      throw error;
    }
  }

  async submitForm(): Promise<void> {
    try {
      await this.registerButton.click();
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  }

  async checkPhoneInvalid(expectedMessage: string) {
    try {
      const invalidPhoneShort = '123456789';
    
      await this.phoneNumberInput.fill(invalidPhoneShort);
      await this.submitForm();
      await expect(this.phoneNumberError).toBeVisible();
      await expect(this.phoneNumberError).toHaveText(expectedMessage);
    } catch (error) {
      console.error('Error checking invalid phone number:', error);
      throw error;
    }
  }

  async checkPasswordInvalid(expectedMessage: string) {
    try {
      const invalidPasswordShort = 'pass1';
      const invalidPasswordLong = 'password1234567890123';

      await this.passwordInput.fill(invalidPasswordShort);
      await this.submitForm();
      await expect(this.passwordError).toBeVisible();
      await expect(this.passwordError).toHaveText(expectedMessage);

      await this.passwordInput.fill(invalidPasswordLong);
      await this.submitForm();
      await expect(this.passwordError).toBeVisible();
      await expect(this.passwordError).toHaveText(expectedMessage);
    } catch (error) {
      console.error('Error checking invalid password:', error);
      throw error;
    }
  }
}

export default SpotTheBugPage;