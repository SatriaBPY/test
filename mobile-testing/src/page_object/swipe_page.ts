import { BasePage } from "./base_page";
import { $, $$, driver } from "@wdio/globals";
import { swipe, waitForElementVisible } from "../helper/command";


class SwipePage extends BasePage {
  get carousal() {
    return $('android=new UiSelector().resourceId("Carousel")');
  }

  get cards() {
    return $$("~Card");
  }

  async pages() {
    await waitForElementVisible(this.carousal);
  }

  // private cardTitleSelector(title: string) {
  //   return $(`android=new UiSelector().text("${title}")`);
  // }

  async getActiveCarouselIndex(): Promise<number> {
    await waitForElementVisible(this.carousal)
    for (let i = 0; i < 5; i++) {
      const item = $(
        `android=new UiSelector().resourceId("__CAROUSEL_ITEM_${i}__")`,
      );
      if (await item.isDisplayed()) {
        return i + 1;
      }
    }
    throw new Error("No active carousel item found");
  }

  async getActiveCarouselTitle(): Promise<string> {
    const index = await this.getActiveCarouselIndex();
    const title = $(`android=new UiSelector().resourceId("__CAROUSEL_ITEM_${index}__").childSelector(new UiSelector().className("android.widget.TextView").instance(1))`);
    return await title.getText();
  }
  
  async getAfterSwipe(): Promise<string> {
    const before = await this.getActiveCarouselIndex();
    const After = before + 1
    const title = $(`android=new UiSelector().resourceId("__CAROUSEL_ITEM_${After}__").childSelector(new UiSelector().className("android.widget.TextView").instance(1))`);
    return await title.getText();
  }

  async beforeSwipe() {
    const beforeIndex = await this.getActiveCarouselIndex();
    const beforeTitle = await this.getActiveCarouselTitle();
    console.log(`Before swipe: ${beforeTitle} index ${beforeIndex}`);
  }

  async swipeToLeft() {
    await swipe("left");
    await driver.pause(2000);
  }

  async afterSwipe() {
    const afterTitle = await this.getActiveCarouselTitle();
    console.log(`After swipe: ${afterTitle} `);
  }
}

export default new SwipePage();
