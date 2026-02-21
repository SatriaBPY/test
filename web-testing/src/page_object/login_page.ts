import BasePage from "./base_page";
import { Page } from "@playwright/test";

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
  
  get emailField() {
    return this.page.locator('#loginusername');
  }
  
  get passwordField() {
    return this.page.locator('#loginpassword');
  }
  
  get loginBtn() {
    return this.page.getByRole('button', { name: 'Log in' });
  }
  
  get closeBtn() {
    return this.page.getByRole('button', { name: 'Close' }).nth(1);
  } 
  
  async login(email: string, password: string): Promise<void> {
    await this.waitForElementVisible(this.emailField);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
  }
  
  async fillEmailForm(email: string): Promise<void> {
    await this.fill(this.emailField, email)
  }
  
  async fillPasswordForm(pass: string): Promise<void> {
    await this.fill(this.passwordField, pass)
  }
}