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
  
  //error messages
  // firstNameError: Locator;
  // lastNameError: Locator;
  // emailError: Locator;
  phoneNumberError: Locator;
  passwordError: Locator;
  finalMessage: Locator;
  
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

    // this.firstNameError = this.page.locator('#name-error');
    // this.lastNameError = this.page.locator('#name-error');
    // this.emailError = this.page.locator('#email-error');
    this.passwordError = this.page.locator('#details-error');
    this.phoneNumberError = this.page.locator('#details-error');
    this.finalMessage = this.page.locator('#success-message');
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
  }

  async checkNavigation() {
    // Example: Check if a "Home" link exists and navigates correctly
    const homeLink = this.page.locator('a[href="/"]'); // Adapt the locator to your home link
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(this.page).toHaveURL(/.*\/$/); // Check if the URL changed after navigation (adapt as needed)
    await this.page.goto('https://qa-practice.netlify.app/bugs-form'); // Navigate back to the form page
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

  async submitForm(): Promise<void> {
    await this.registerButton.click();
  }

  async verifySuccess(): Promise<void> {
    await expect(this.finalMessage).toBeVisible();
  }

  async checkBoxVerification(){
    await this.termsAndConditionsCheckbox.check();
  }

  async checkPhoneInvalid(expectedMessage: string) {
    const invalidPhoneShort = '123456789';
    const invalidPhoneLong = '123456789012345';

    await this.phoneNumberInput.fill(invalidPhoneShort);
    await this.submitForm();
    await expect(this.phoneNumberError).toBeVisible();
    await expect(this.phoneNumberError).toHaveText(expectedMessage);

    await this.phoneNumberInput.fill(invalidPhoneLong);
    await this.submitForm();
    await expect(this.phoneNumberError).toBeVisible();
    await expect(this.phoneNumberError).toHaveText(expectedMessage);
  }

  async checkPasswordInvalid(expectedMessage: string) {
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
}

export default SpotTheBugPage;