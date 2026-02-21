import BasePage from "./base_page";
import { expect, Page } from "@playwright/test";
import DashBoard from "./dashboard_page";

export default class CartPage extends BasePage {
  private products: Array<{ title: string; price: string }> = [];
  constructor(page: Page) {
    super(page);
  }

  get cartHeading() {
    return this.page.getByRole("heading", { name: "Products" });
  }

  get deleteBtn() {
    return this.page.getByRole("link", { name: "Delete" }).first();
  }

  get placeOrderBtn() {
    return this.page.getByRole("button", { name: "Place Order" });
  }

  get price() {
    return this.page.locator("#tbodyid tr td:nth-child(3)");
  }

  get totalPrice() {
    return this.page.locator('.panel-heading').locator("#totalp");
  }
  
  get totalPricePO() {
    return this.page.locator('#totalm');
  }
  
  get nameField() {
    return this.page.getByRole('textbox', { name: 'Name:' });
  }
  
  get countryField() {
    return this.page.getByRole('textbox', { name: 'Country:' });
  }
  
  get cityField() {
    return this.page.getByRole('textbox', { name: 'City:' });
  }
  
  get cardField() {
    return this.page.getByRole('textbox', { name: 'Credit card:' });
  }
  
  get monthField() {
    return this.page.getByRole('textbox', { name: 'Month:' });
  }
  
  get yearField() {
    return this.page.getByRole('textbox', { name: 'Year:' });
  }
  
  get closeBtn() {
    return this.page.getByRole('button', { name: 'Close' }).nth(1);
  }
  
  get purchaseBtn() {
    return this.page.getByRole('button', { name: 'Purchase' });
  }
  
  get thnaksNotif() {
    return this.page.getByRole('heading', { name: 'Thank you for your purchase!' });
  }
  
  get nameOfPurchase() {
    return this.page.getByRole('textbox', { name: 'Name:' });
  }
  
  get confirmBtn() {
    return this.page.getByRole('button', { name: 'OK' });
  }
  
  get id() {
    return this.page.locator('p.lead.text-muted')
  }
  
  //METHOD
  //
  async getAllPrice(): Promise<number[]> {
    // await this.waitForElementVisible("#tbodyid");
    // await this.tap(this.totalPrice);
    await this.waitForElementVisible(this.price.first())
    const count = await this.price.count();
    console.log(`Total Count: ${count}`);

    let prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const pricesText = await this.price.nth(i).innerText();
      if (pricesText) {
        const price = parseInt(pricesText.trim());
        prices.push(price);
      }
    }
    return prices;
  }
  
  async productCupture() {
    const dashBoard = new DashBoard(this.page);
    this.products = await dashBoard.captureFirstProduct();
  }
  
  async productTitle(): Promise<void> {
    const data = this.products[0];
    const titleSelector = this.page.getByRole('cell', { name: `${data.title}` }).first();
    await expect(titleSelector).toHaveText(data.title);
  }
  
  async priceTitle(): Promise<void> {
    const data = this.products[0];
    const fixData = Number(data.price.replace(/[^0-9.-]+/g, ''));
    const priceSelector = this.page.getByRole('cell', { name: `${fixData}` }).first();
    await expect(priceSelector).toHaveText(fixData.toString());
  }
  
  async totalPrices(): Promise<void> {
    const data = await this.getAllPrice();
    const total = data.reduce((acc, val) => acc + val, 0)
    await expect(this.totalPrice).toHaveText(total.toString())
  }
  
  async deleteProduct(): Promise<void> {
    await this.waitForElementVisible(this.deleteBtn);
    await this.tap(this.deleteBtn);
  }
  
  async placeOrder(): Promise<void> {
    await this.page.waitForTimeout(10000)
    await this.tap(this.placeOrderBtn);
  }
  
  async fillName(name: string): Promise<void> {
    await this.waitForElementVisible(this.nameField);
    await this.fill(this.nameField, name)
  }
  
  async fillCountry(coutry: string): Promise<void> {
    await this.fill(this.countryField, coutry)
  }
  
  async fillCity(city: string): Promise<void> {
    await this.fill(this.cityField, city)
  }
  
  async fillCC(cc: string): Promise<void> {
    await this.fill(this.cardField, cc)
  }
  
  async fillMonth(month: string): Promise<void> {
    await this.fill(this.monthField, month)
  }
  
  async fillYear(year: string): Promise<void> {
    await this.fill(this.yearField, year)
  }
  
  async cliclPurchase(): Promise<void> {
    await this.page.waitForTimeout(2000)
    await this.tap(this.purchaseBtn)
  }
  
  async successMessage(): Promise<void> {
    await this.waitForElementVisible(this.nameOfPurchase)
    await this.page.waitForTimeout(2000)
  }
  
  async getIdPurchase(): Promise<void> {
    const data = await this.id.innerText();
    const match = data.match(/Id:\s*(\d+)/);
    
    if (!match) {
      throw new Error ('ID not found')
    }
    
    const id = match[1];
    console.log(`Purchase ID: ${id}`);
  }
  
}
