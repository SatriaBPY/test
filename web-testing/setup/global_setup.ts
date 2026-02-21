import { chromium, request, FullConfig } from "@playwright/test";
import DashBoard from "../src/page_object/dashboard_page";
import LoginPage from "../src/page_object/login_page";
import CartServices from "../src/services/cartservices_api";
import UserApi from "../src/services/users_api";
import dotenv from "dotenv";
import { deleteFolder } from "../src/helper/utils";

dotenv.config({ quiet: true });

const userRole = {
  admin: 1,
  user: 2
} as const



async function globalSetup(config: FullConfig) {
  try {
    
    console.log("===== Prepaering =====");
    
    console.log("Prepaering ....Looking for folders");
    console.log('Deleting Folders')
    await deleteFolder('allure-results');
    await deleteFolder('test-results');
    await deleteFolder('./videos');
    await deleteFolder('./src/data/users.json');
    const browser = await chromium.launch({
      headless: true,
    });
    const requestcontext = await request.newContext();
    const page = await browser.newPage();
    const dashBoard = new DashBoard(page);
    const login = new LoginPage(page);
    const cartSevices = new CartServices(requestcontext);
    const userApi = new UserApi(requestcontext);

    console.log("Prepaering .... fetch user");
    const users = await userApi.getUsersWithRole(userRole);
    
    console.log('Prepaering..inject user to env')
    await userApi.saveUsersToFile(userRole)
    await userApi.injectToEnv(users)
    
    await dashBoard.gotoUrl("https://www.demoblaze.com/");
    await dashBoard.menu("Login");
    
    const user = {
      email: process.env.ADMIN_EMAIL || "",
      password: process.env.ADMIN_PASSWORD || "",
    };
    
    
    await login.login(
      user.email,
      user.password);

    console.log("Looking for token...");
    await page.waitForTimeout(5000);

    const cookies = await page.context().cookies();
    const token = cookies.find((c) => c.name === "tokenp_")?.value;

    if (token !== undefined) {
      console.log("Token found...");
      process.env.TOKEN = token;
      console.log("Token set:", token);
    }

    await browser.close();

    console.log("Removing all cart items...");
    await cartSevices.removeFromCart();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log("==== Prepaering..done ==== \n");
  console.log(`==== Launching Test With ${config.workers} Workers ====`);
  
}

export default globalSetup;
