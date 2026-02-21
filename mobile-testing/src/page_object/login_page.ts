import { BasePage } from "./base_page";
import { $, expect } from "@wdio/globals";
import { waitForElementVisible, fill, tap } from "../helper/command";

class LoginPage extends BasePage {
  get loginForm() {
    return $("~Login-screen");
  }

  get emailField() {
    return $("~input-email");
  }

  get passwordField() {
    return $("~input-password");
  }

  get loginBtn() {
    return $("~button-LOGIN");
  }

  get successMsg() {
    return $("id=com.wdiodemoapp:id/alert_title");
  }

  get youGotLgnMsg() {
    return $("id=android:id/message");
  }

  get okBtn() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async pages() {
    await waitForElementVisible(this.loginForm);
  }

  async login(email: string, password: string): Promise<void> {
    await waitForElementVisible(this.loginForm);
    await fill(this.emailField, email);
    await fill(this.passwordField, password);
    await tap(this.loginBtn);
  }

  async loginValidation(option: "Success" | "Youare Logged in"): Promise<void> {
    await waitForElementVisible(this.successMsg);

    switch (option) {
      case "Success":
        await expect(this.successMsg).toHaveText("Success");
        break;
      case "Youare Logged in":
        await expect(this.youGotLgnMsg).toHaveText("You are logged in!");
        break;
    }
  }
  
  async tapOkbtn() {
    await waitForElementVisible(this.okBtn);
    await tap(this.okBtn);
  }
}

export default new LoginPage();
