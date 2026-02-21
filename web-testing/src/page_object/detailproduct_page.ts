import BasePage from "./base_page";
import { Page, expect } from "@playwright/test";
import DashBoard from "./dashboard_page";

export class DetailProductPage extends BasePage {
  private products: Array<{ title: string; price: string }> = [];

  constructor(page: Page) {
    super(page);
  }

  get addToCarBtn() {
    return this.page.getByRole("link", { name: "Add to cart" });
  }

  async productHeader(title: string): Promise<void> {
    const header = this.page.getByRole("heading", { name: title });
    await this.waitForElementVisible(header);
    await expect(header).toHaveText(title);
  }

  async producCapture() {
    const DashBoards = new DashBoard(this.page);
    this.products = await DashBoards.captureFirstProduct();
  }

  async productHeaderValidation() {
    const data = this.products[0];

    await this.productHeader(data.title);
  }

  async productPriceValidation() {
    const data = this.products[0];

    await this.prodcutPrice(data.price);
  }

  async prodcutPrice(price: string): Promise<void> {
    const prices = this.page.getByRole("heading", {
      name: `${price} *includes tax`,
    });
    await this.waitForElementVisible(prices);
    await expect(prices).toHaveText(`${price} *includes tax`);
  }

  async addToCart(): Promise<void> {
    await this.tap(this.addToCarBtn);
  }
}
