import { APIRequestContext } from "@playwright/test";
import { loadProductId } from "../helper/utils";
import { API_PRODUCT_CONFIG, API_USER_CONFIG } from "../config/api-endpoints";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export default class CartServices {
  constructor(private request: APIRequestContext) {}

  async getToken(): Promise<string> {
    const res = await this.request.post(
      `${API_PRODUCT_CONFIG.BASE_URL}${API_PRODUCT_CONFIG.ENDPOINTS.LOGIN}`,
      {
        headers: {
          "Content-Type": "application/json",
          host: API_PRODUCT_CONFIG.HOST,
        },
        data: JSON.stringify({
          username: "test",
          password: "dGVzdA==",
        }),
      },
    );

    if (res.status() !== 200) {
      throw new Error("Failed to get token");
    }

    const text = await res.text();

    const token = text.split("Auth_token: ")[1];

    process.env.MY_TOKEN = token;

    console.log("Token received:", token);

    return token;
  }

  async addToCart(): Promise<void> {
    const data = loadProductId();

    const productIds: string[] = Object.values(data.product_id);

    for (const id of productIds) {
      const res = await this.request.post(
        `${API_PRODUCT_CONFIG.BASE_URL}${API_PRODUCT_CONFIG.ENDPOINTS.ADD_TO_CART}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id,
            cookie: process.env.TOKEN,
            prod_id: 1,
            flag: true,
          },
        },
      );

      if (res.status() === 200) {
        console.log(`Product ${id} added to cart`);
      } else {
        console.log(`Failed to add product ${id}`);
      }
    }
  }

  async removeFromCart(): Promise<void> {
    const data = loadProductId();
    const productid: string[] = Object.values(data.product_id);

    for (const id of productid) {
      const request = await this.request.post(
        `${API_PRODUCT_CONFIG.BASE_URL}${API_PRODUCT_CONFIG.ENDPOINTS.DELETE_ITEM}`,
        {
          headers: {
            host: "api.demoblaze.com",
            Accept: "*/*",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
          },
          data: JSON.stringify({
            id,
          }),
        },
      );
      const msg = await request.text();
      const body = JSON.parse(msg);
      if (msg === "errorMessage") {
        // const msgs = msg.split('errorMessage');
        console.log(body.errorMessage);
      } else if (body === "Item deleted.") {
        console.log(`Successfully removed product ${id} from cart`);
      }
    }
  }
}
