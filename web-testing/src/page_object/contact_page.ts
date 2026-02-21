import BasePage from "./base_page";
import { Page } from "@playwright/test";

export default class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
  
  get contactForm() {
    return this.page.locator('#exampleModal > div[role="document"] > div[class="modal-content"]');
  }
  
  get emailField() {
    return this.page.locator('#recipient-email');
  }
  
  get contactNameField() {
    return this.page.getByRole('textbox', { name: 'Contact Email: Contact Name:' });
  }
  
  get messageField() {
    return this.page.getByRole('textbox', { name: 'Message:' });
  }
  
  get modelFooter() {
    return this.page.locator('div[class="modal-footer"]')
  }
  
  get closeBtn() {
    return this.modelFooter.getByRole('button', {name: "Close"})
  }
  
  get sendMsgBtn() {
    return this.modelFooter.getByRole('button', {name: "Send message"})
  }
  
  async pages(): Promise<void> {
    await this.waitForElementVisible(this.contactForm);
  }
  
  async fillContactEmail(email: string) {
    await this.fill(this.emailField, email);
  }
  
  async fillContactName(name: string): Promise<void> {
    await this.fill(this.contactNameField, name);
  }
  
  async fillContactMessage(mssg: string): Promise<void> {
    await this.fill(this.messageField, mssg);
  }
  
  async sendContactMessage(): Promise<void> {
    await this.tap(this.sendMsgBtn);
  }
}
