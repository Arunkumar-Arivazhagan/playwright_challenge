import { expect, Locator, Page } from '@playwright/test';

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
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
  nameError: Locator;
  emailError: Locator;
  detailsError: Locator;
  successMessage: Locator;
  
  constructor(public page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator('#firstName'); 
    this.lastNameInput = this.page.locator('#lastName'); 
    this.phoneNumberInput = this.page.locator('#phoneNumber'); 
    this.countryDropdown = this.page.locator('#country'); 
    this.emailInput = this.page.locator('#email'); 
    this.passwordInput = this.page.locator('#password'); 
    this.termsAndConditionsCheckbox = this.page.locator('#terms');
    this.registerButton = this.page.locator('#register');

    this.nameError = this.page.locator('#name-error');
    this.emailError = this.page.locator('#email-error');
    this.detailsError = this.page.locator('#details-error');
    this.successMessage = this.page.locator('#success-message');
  }

  async navigateTo(baseURL: string): Promise<void> {
    await this.page.goto(baseURL);
  }

  async fillForm(data: RegistrationFormData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.phoneNumberInput.fill(data.phoneNumber);
    await this.countryDropdown.selectOption(data.country);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    if (data.termsAndConditions) {
      await this.termsAndConditionsCheckbox.check();
    }
  }

  async checkNavigation() {
    // Example: Check if a "Home" link exists and navigates correctly
    const homeLink = this.page.locator('a[href="/"]'); // Adapt the locator to your home link
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(this.page).toHaveURL(/.*\/$/); // Check if the URL changed after navigation (adapt as needed)
    await this.page.goto('https://qa-practice.netlify.app/bugs-form'); // Navigate back to the form page
}

  async submitForm(): Promise<void> {
    await this.registerButton.click();
  }

  async verifySuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyRequiredFieldErrors(): Promise<void> {
    await expect(this.nameError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.detailsError).toBeVisible();
  }

  async verifyEmailError() {
    await expect(this.emailError).toBeVisible();
  }

  async checkPhoneValidation() {
    const validPhone = '1234567890';
    const invalidPhoneShort = '123456789';
    const invalidPhoneLong = '123456789012345';

    await this.phoneNumberInput.fill(invalidPhoneShort);
    await this.submitForm();
    // Check for specific error message related to phone number length

    await this.phoneNumberInput.fill(invalidPhoneLong);
    await this.submitForm();
    // Check for specific error message related to phone number length

    await this.phoneNumberInput.fill(validPhone);
    // Optionally, clear the error or proceed with valid submission
  }

  async checkForBrokenImages() {
    const images = await this.page.$$('img');
    for (const image of images) {
      const src = await image.getAttribute('src');
      if (src) {
        const response = await this.page.request.get(src);
        expect(response.status()).toBe(200);
      }
    }
  }

  async checkPasswordValidation() {
    const validPassword = 'password123';
    const invalidPasswordShort = 'pass1';
    const invalidPasswordLong = 'password1234567890123';

    await this.passwordInput.fill(invalidPasswordShort);
    await this.submitForm();
    // Check for specific error message related to password length

    await this.passwordInput.fill(invalidPasswordLong);
    await this.submitForm();
    // Check for specific error message related to password length

    await this.passwordInput.fill(validPassword);
    // Optionally, clear the error or proceed with valid submission
  }

  async verifyCountryDropdownDefaultValue(expectedValue: string): Promise<void> {
    const selectedValue = await this.countryDropdown.inputValue();
    expect(selectedValue).toBe(expectedValue);
  }

  async selectCountry(value: string | { label?: string; index?: number }): Promise<void> {
    await this.countryDropdown.selectOption(value);
  }

  async assertCountryValue(expectedValue: string): Promise<void> {
    const selectedValue = await this.countryDropdown.inputValue();
    expect(selectedValue).toBe(expectedValue);
  }

  async verifySpecialCharactersSubmission(): Promise<void> {
    await this.verifySuccess();
  }
}

export default SpotTheBugPage;