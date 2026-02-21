import { test as baseTest, Page, request } from "@playwright/test";
import { attachment } from "allure-js-commons";
import DashBoard from "./page_object/dashboard_page";
import BasePage from "./page_object/base_page";
import ContactPage from "./page_object/contact_page";
import AboutusPage from "./page_object/aboutus_page";
import CartPage from "./page_object/cart_page";
import { DetailProductPage } from "./page_object/detailproduct_page";
import LoginPage from "./page_object/login_page";
import CartServices from "./services/cartservices_api";

import dotenv from "dotenv";

dotenv.config({ quiet: true });

const user = {
  email: process.env.ADMIN_EMAIL || "test",
  password: process.env.ADMIN_PASSWORD || "test",
  user_mail: process.env.USER_EMAIL || "test",
  user_password: process.env.USER_PASSWORD || "test",
};

type MyFixture = {
  page: Page;
  dashboard: DashBoard;
  basePage: BasePage;
  contactPage: ContactPage;
  loginPage: LoginPage;
  loginAs: (role: "admin" | "user") => Promise<void>;
  addPRoduct: () => Promise<void>;
  aboutusPage: AboutusPage;
  detailProdcutPage: DetailProductPage;
  cartPage: CartPage;
  cookiesGeter: () => Promise<string>;
  cartServices: CartServices;
};

export const test = baseTest.extend<MyFixture>({
  page: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
      recordVideo: {
        dir: './videos',
        size: { width: 640, height: 480 },
         },
    });
    const page = await context.newPage();
    // page.on("requestfailed", async (request) => {
    //   console.log(
    //     `Request failed: ${request.method()}, ${request.url()} | Error: ${request.failure()?.errorText}`,
    //   );
    //   const errorText = `Request failed: ${request.method()}, ${request.url()} | Error: ${request.failure()?.errorText}`;
    //   await attachment('Request error:', errorText, 'text/plain')
    // });
    // page.on('pageerror', async(error) => {
    //  await attachment('Browser error:', error.stack || error.message, 'text/plain')
    // })
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    })
    await use(page);
    await context.close();
    
    const video = page.video();
     if (video) {
       const videoPath = await video.path();
   
       await testInfo.attach("Video", {
         path: videoPath,
         contentType: "video/webm",
       });
     }
  },
  loginAs: async ({ page, dashboard, loginPage }, use) => {
    const loginAdmin = async (role: "admin" | "user") => {
      const email = role === "admin" ? user.email : user.user_mail;
      const password = role === "admin" ? user.password : user.user_password;
      await page.goto("https://www.demoblaze.com/");
      await dashboard.menu("Login");
      await loginPage.login(email, password);
    };
    await use(loginAdmin);
  },
  addPRoduct: async (
    { page, dashboard, loginAs, cartPage, detailProdcutPage },
    use,
  ) => {
    const add = async () => {
      await page.goto("https://www.demoblaze.com/");
      await loginAs("admin");
      await cartPage.productCupture();
      await dashboard.clickProduct();
      await detailProdcutPage.addToCart();
      await dashboard.menu("Cart");
    };
    use(add);
  },

  cookiesGeter: async ({ page, loginAs }, use) => {
    const getCookie = async (): Promise<string> => {
      await loginAs("user");

      const cookies = await page.context().cookies();
      const token = cookies.find((c) => c.name === "token")?.value;

      if (!token) {
        throw new Error("Token cookie not found");
      }

      return token;
    };
    use(getCookie);
  },
  dashboard: async ({ page }, use) => use(new DashBoard(page)),
  basePage: async ({ page }, use) => use(new BasePage(page)),
  contactPage: async ({ page }, use) => use(new ContactPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  aboutusPage: async ({ page }, use) => use(new AboutusPage(page)),
  detailProdcutPage: async ({ page }, use) => use(new DetailProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  cartServices: async ({ request }, use) => use(new CartServices(request)),
});
