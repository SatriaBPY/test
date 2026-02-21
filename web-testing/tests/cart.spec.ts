import { test } from "../src/fixture";

test.describe("Cart Page Test", () => {
  test("Should add product to cart and verify details", async ({
    page,
    basePage,
    cartPage,
    dashboard,
    loginAs,
    detailProdcutPage,
  }) => {
    await test.step("Add product to cart", async () => {
      await loginAs("user");
      await cartPage.productCupture();
      await dashboard.clickProduct();
      await detailProdcutPage.addToCart();
    });

    await test.step("Navigate to cart page", async () => {
      await dashboard.menu("Cart");
    });

    await test.step("Verify product title matches the selected product", async () => {
      await cartPage.productTitle();
    });

    await test.step("Verify product price matches the selected product", async () => {
      await cartPage.priceTitle();
    });

    await test.step("Verify total price matches the table calculation", async () => {
      await cartPage.totalPrices();
    });

    await test.step("Remove product from the cart", async () => {
      await cartPage.deleteProduct();
    });
  });

  test("Should complete the checkout process", async ({
    page,
    cartPage,
    dashboard,
    cartServices,
    loginAs,
  }) => {
    await test.step("Navigate to place order page", async () => {
      await loginAs("admin");
      await cartServices.addToCart();
      await dashboard.menu("Cart");
      await cartPage.placeOrder();
    });

    await test.step("Fill name", async () => {
      await cartPage.fillName("John Doe");
    });

    await test.step("Fill country", async () => {
      await cartPage.fillCountry("USA");
    });

    await test.step("Fill city", async () => {
      await cartPage.fillCity("New York");
    });

    await test.step("Fill card", async () => {
      await cartPage.fillCC("1234567890123456");
    });

    await test.step("Fill month", async () => {
      await cartPage.fillMonth("01");
    });

    await test.step("Fill year", async () => {
      await cartPage.fillYear("2023");
    });
    
    await test.step("Submit purchase and verify success", async () => {
      await cartPage.cliclPurchase();
      await cartPage.successMessage();
      await cartPage.getIdPurchase();
      // await dashboard.menu("Cart");
    });
  });
});
