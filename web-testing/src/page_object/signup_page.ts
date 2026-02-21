import { Page } from "@playwright/test";
import BasePage from "./base_page";
import { runInThisContext } from "vm";

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  
  get usernameField() {
    return this.page.getByRole('textbox', { name: 'Username:' });
  }
  
  get passwordField() {
    return this.page.getByRole('textbox', { name: 'Password:' });
  }
  
  get signupBtn() {
    return this.page.getByRole('button', { name: 'Sign up' });
  }
  
  
}