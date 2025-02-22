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

  async verifyEmailError(): Promise<void> {
    await expect(this.emailError).toBeVisible();
  }

  async checkSpecialCharacters(password: string): Promise<void> {
    await this.passwordInput.fill(password);
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