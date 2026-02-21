import { BasePage } from "./base_page";
import { $, expect } from "@wdio/globals";
import { waitForElementVisible, tap, fill } from "../helper/command";


const dropdownOption = {
  wdio: "webdriver.io is awesome",
  appium: "Appium is awesome",
  thisapp: "This app is awesome",
} as const;

class FormPage extends BasePage {
  get formField() {
    return $("~Forms-screen");
  }

  get inputField() {
    return $("~text-input");
  }

  get inputResult() {
    return $("~input-text-result");
  }

  get switch() {
    return $("~switch");
  }

  get switchText() {
    return $("~switch-text");
  }

  get dropdownBtn() {
    return $("~Dropdown");
  }

  get dropdownResult() {
    return $('android=new UiSelector().resourceId("text_input")');
  }

  get actvBtn() {
    return $("~button-Active");
  }

  get actvMsg() {
    return $('android=new UiSelector().resourceId("android:id/message")');
  }

  get okBtn() {
    return $('android=new UiSelector().resourceId("android:id/button1")');
  }

  async pages() {
    await waitForElementVisible(this.formField);
  }

  async inputText(text: string): Promise<void> {
    await waitForElementVisible(this.inputField);
    await fill(this.inputField, text);
  }

  async validateInput(text: string): Promise<void> {
    await waitForElementVisible(this.inputResult);
    await expect(this.inputResult).toHaveText(text);
  }

  async getSwitchStatus(): Promise<"ON" | "OFF"> {
    await waitForElementVisible(this.switchText);

    const fullText = await this.switchText.getText();
    const status = fullText.trim().split(" ").pop() as "ON" | "OFF";

    return status;
  }

  async tapSwitch(option: "ON" | "OFF"): Promise<void> {
    const currentStatus = await this.getSwitchStatus();

    if (currentStatus !== option) {
      await tap(this.switch);
    }
  }

  async verifySwitchStatus(expected: "ON" | "OFF"): Promise<void> {
    await waitForElementVisible(this.switchText);
    const data = await this.getSwitchStatus();
    await expect(data).toBe(expected);
  }

  async selectOptionDropdowon(
    option: keyof typeof dropdownOption,
  ): Promise<void> {
    await tap(this.dropdownBtn);
    const targetText = dropdownOption[option];
    const selector = $(
      `android=new UiSelector().className("android.widget.CheckedTextView").text("${targetText}")`,
    );
    await waitForElementVisible(selector);
    await tap(selector);
  }
  
  async getDropdownText(): Promise<string> {
    await waitForElementVisible(this.dropdownResult);
    const text = await this.dropdownResult.getText();
    return text;
  }
  
  async verifyDropdown(): Promise<void> {
    await waitForElementVisible(this.dropdownResult);
    const actualText = await this.getDropdownText();
    const data = Object.values(dropdownOption);
    await expect(data).toContain(actualText)
  }
  
  async activeBtn(): Promise<void> {
    await waitForElementVisible(this.actvBtn);
    await tap(this.actvBtn);
  }
  
  async verifyActiveBtn(): Promise<void> {
    await waitForElementVisible(this.actvMsg);
    const actualText = await this.actvMsg.getText();
    await expect(actualText).toContain("This button is active");
  }
  
  async tapOkActvBtn(): Promise<void> {
    await waitForElementVisible(this.okBtn);
    await tap(this.okBtn);
  }
}

export default new FormPage();
