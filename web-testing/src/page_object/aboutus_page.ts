import BasePage from "./base_page";
import { Page } from "@playwright/test";

export default class AboutusPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
  
  get videoModel() {
    return this.page.locator('#videoModal').locator('#example-video')
  }
  
  get playBtn() {
    return this.page.getByRole('button', { name: 'Play Video' });
  }
  
  get modalFooter() {
    return this.page.locator('div[class="modal-footer"]')
  }
  
  get closeBtn() {
    return this.modalFooter.getByRole('button', {name: "Close"})
  }
  
  async openVideo() {
    await this.videoModel.waitFor({state: 'visible'});
    await this.playBtn.click();
  }
}
