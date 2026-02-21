import { loadJsonFile } from "../helper/utils";
import BasePage from "./base_page";
import { expect, Page, Locator } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const menus = {
  home: "Home",
  contact: "Contact",
  aboutUs: "About Us",
  cart: "Cart",
  login: "Login",
  logOut: "Log out",
  signUp: "Sign up",
} as const;

export default class DashBoard extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get dashBoardTitle() {
    return this.page.getByRole("link", { name: "PRODUCT STORE" });
  }

  get homeMenuBtn() {
    return this.page.getByRole("link", { name: "Home (current)" });
  }

  get contactMenuBtn() {
    return this.page.getByRole("link", { name: "Contact" });
  }

  get aboutUsMenuBtn() {
    return this.page.getByRole('link', { name: 'About us' })
  }

  get cartMenuBtn() {
    return this.page.getByRole('link', { name: 'Cart', exact: true  })
  }

  get loginMenuBtn() {
    return this.page.getByRole("link", { name: "Log in" });
  }

  get logOutBtn() {
    return this.page.getByRole("link", { name: "Log out" });
  }

  get signupMenuBtn() {
    return this.page.getByRole("link", { name: "Sign up" });
  }

  get nameofUser() {
    return this.page.locator("#nameofuser");
  }

  //corousel
  //
  get nextBtnCrsl() {
    return this.page
      .locator("[id=carouselExampleIndicators]")
      .getByRole("button", { name: "Next" });
  }

  get prevBtnCrsl() {
    return this.page
      .locator("[id=carouselExampleIndicators]")
      .getByRole("button", { name: "Previous" });
  }

  // catagories side cartMenuBtn
  //
  get phonesMenuBtn() {
    return this.page.getByRole("link", { name: "Phones" });
  }

  get laptopsMenuBtn() {
    return this.page.getByRole("link", { name: "Laptops" });
  }

  get monitorMenusBtn() {
    return this.page.getByRole("link", { name: "Monitors" });
  }

  //pagination
  //
  get nextPageBtn() {
    return this.page
      .locator('ul[class="pagination"] > li:nth-child(2)')
      .locator("#next2");
  }

  get prevPageBtn() {
    return this.page
      .locator('ul[class="pagination"] > li:nth-child(1)')
      .locator("#prev2");
  }

  //product
  //
  get product() {
    return this.page.getByRole("link", { name: "Samsung galaxy s6" });
  }

  async menu(option: (typeof menus)[keyof typeof menus]): Promise<void> {
    switch (option) {
      case "Home":
        await this.waitForElementVisible(this.homeMenuBtn);
        await this.tap(this.homeMenuBtn);
        break;
      case "Contact":
        await this.waitForElementVisible(this.contactMenuBtn);
        await this.tap(this.contactMenuBtn);
        break;
      case "Cart":
        await this.waitForElementVisible(this.cartMenuBtn);
        await this.tap(this.cartMenuBtn);
        break;
      case "Login":
        await this.waitForElementVisible(this.loginMenuBtn);
        await this.tap(this.loginMenuBtn);
        break;
      case "Log out":
        await this.waitForElementVisible(this.logOutBtn);
        await this.tap(this.logOutBtn);
        break;
      case "Sign up":
        await this.waitForElementVisible(this.signupMenuBtn);
        await this.tap(this.signupMenuBtn);
        break;
      case "About Us":
        await this.waitForElementVisible(this.aboutUsMenuBtn);
        await this.tap(this.aboutUsMenuBtn);
        break;
      default:
        throw new Error(`Invalid menu option: ${option}`);
    }
  }

  async carousalOperation(Option: "Next" | "Prev"): Promise<void> {
    await this.waitForElementVisible(this.page.locator("#contcar"));
    switch (Option) {
      case "Next":
        await this.waitForElementVisible(this.nextBtnCrsl);
        await this.tap(this.nextBtnCrsl);
        await this.page.waitForTimeout(1000);
        break;
      case "Prev":
        await this.waitForElementVisible(this.prevBtnCrsl);
        await this.tap(this.prevBtnCrsl);
        await this.page.waitForTimeout(1000);
        break;
      default:
        throw new Error("Invalid operation");
    }
  }

  async carousalValidation(option: "Next" | "Prev"): Promise<void> {
    const carouselItems = this.page.locator(".carousel-inner .carousel-item");
    const initialActiveIndex = await this.getActiveCarouselIndex(carouselItems);

    await this.carousalOperation(option);

    await this.page.waitForTimeout(1000);

    const newActiveIndex = await this.getActiveCarouselIndex(carouselItems);

    if (option === "Next") {
      expect(newActiveIndex).toBe(
        (initialActiveIndex + 1) % (await carouselItems.count()),
      );
    } else {
      const totalItems = await carouselItems.count();
      expect(newActiveIndex).toBe(
        (initialActiveIndex - 1 + totalItems) % totalItems,
      );
    }

    const activeItems = await this.page
      .locator(".carousel-inner  .active")
      .count();
    expect(activeItems).toBe(1);
  }

  private async getActiveCarouselIndex(items: Locator): Promise<number> {
    await this.page.waitForTimeout(1000);
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const classes = await item.getAttribute("class");
      if (classes?.includes("active")) {
        return i;
      }
    }
    return -1;
  }

  async pageOperation(option: "Prev" | "Next"): Promise<void> {
    
    switch (option) {
      case "Prev":
        await this.waitForElementVisible(this.prevPageBtn);
        await this.tap(this.prevPageBtn);
        await this.page.waitForTimeout(1000);
        break;
      case "Next":
        await this.waitForElementVisible(this.nextPageBtn);
        await this.tap(this.nextPageBtn);
        await this.page.waitForTimeout(1000);
        break;
      default:
        throw new Error("Invalid option for page");
    }
  }

  arayProduct: Array<{ title: string; price: string }> = [];

  async captureFirstProduct(): Promise<Array<{ title: string; price: string }>> {
    this.arayProduct = [];
    const arayProducts: Array<{ title: string; price: string }> = [];

    for (let i = 0; i < 3; i++) {
      const card = this.page.locator("#tbodyid .card").nth(i);
      const title = await card.locator(".card-title").textContent();
      const price = await card.locator("h5").textContent();

      if (title && price) {
        this.arayProduct.push({
          title: title.trim(),
          price: price.trim(),
        });
        arayProducts.push({
          title: title.trim(),
          price: price.trim(),
        });
      }
    }
    console.log(`Product captured: ${this.arayProduct.length}`);
    return arayProducts;
  }

  async pageValidation(option: "Prev" | "Next"): Promise<void> {
    await this.captureFirstProduct();
    if (this.arayProduct.length === 0) {
      await this.captureFirstProduct();
    }

    await this.pageOperation(option);

    for (let i = 0; i < 3; i++) {
      const card = this.page.locator("#tbodyid .card").nth(i);
      const title = await card.locator(".card-title").textContent();

      const price = await card.locator("h5").textContent();

      const prevProduct = this.arayProduct[i];

      expect(title?.trim()).not.toBe(prevProduct.title);
      expect(price?.trim()).not.toBe(prevProduct.price);
    }
  }
  
  async categoryOperation(option: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    await this.waitForElementVisible(this.phonesMenuBtn);
    
    switch (option) {
      case 'Phones':
        await this.tap(this.phonesMenuBtn);
        await this.page.waitForTimeout(500);
        break;
      case 'Laptops':
        await this.tap(this.laptopsMenuBtn);
        await this.page.waitForTimeout(500);
        break;
      case 'Monitors':
        await this.tap(this.monitorMenusBtn);
        await this.page.waitForTimeout(500);
        break;
    }
  }
  
  async categoryValidation(option: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    await this.categoryOperation(option);
    const daata = loadJsonFile();
    const product = this.page.locator("#tbodyid .card").nth(1)
    
    const categoryMaps = {
      'Phones': daata.Items.phones,
      'Laptops': daata.Items.notebooks,
      'Monitors': daata.Items.monitor
    }
    
    const expectedProducts = categoryMaps[option];
    const productCard = this.page.locator("#tbodyid .card")
    
    
    await this.waitForElementVisible(product);
    
    for (let i = 0; i < expectedProducts.length; i++) {
      const productLocator = productCard.nth(i);
      const productData = expectedProducts[i];
      
      await expect(productLocator.locator('.card-title')).toContainText(productData.title);
      await expect(productLocator.locator('h5')).toContainText(productData.price.toString());
       
    }
  }
  
  async nameOfUser(role: 'admin' | 'user'): Promise<void> {
    const user = {
      email: process.env.ADMIN_EMAIL || 'test',
      user_mail: process.env.USER_EMAIL || 'test',
    }
    const username = role === 'admin' ? user.email : user.user_mail;
    await this.waitForElementVisible(this.nameofUser)
    await expect(this.nameofUser).toContainText(`Welcome ${username}`)
  }
  
  
  async clickProduct(): Promise<void> {
    const card = this.page.locator("#tbodyid .card").nth(0);
    const title = card.locator(".card-title")
    await this.tap(title)
  }
}
