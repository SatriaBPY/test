import { test } from "../src/fixture";

test.describe('E2E Purchase Flow - Demoblaze (UI)', () => {
  test('User can complete full purchase flow and capture Order ID', async ({page,loginAs, basePage, dashboard, detailProdcutPage, cartPage}) => {
    await test.step('Navigate to website', async () => {
      await basePage.gotoUrl('https://www.demoblaze.com/')
      await loginAs('user')
      await detailProdcutPage.producCapture();
      await cartPage.productCupture();
     
    })
    
    await test.step('Browse categaries', async () => {
      await dashboard.categoryValidation("Phones")
      
    })
    
    await test.step('Select Product', async () => {
      await dashboard.clickProduct()
      await detailProdcutPage.productHeaderValidation()
      await detailProdcutPage.productPriceValidation()
    })
    
    await test.step('Add to cart', async () => {
      await detailProdcutPage.addToCart();
      await dashboard.menu("Cart");
     
    })
    
    await test.step('Verify cart', async () => {
      await cartPage.productTitle();
      await cartPage.priceTitle();
      await cartPage.totalPrices();
     
    })
    
    await test.step('Click place order', async () => {
       await cartPage.placeOrder();
    })
    
    await test.step('Fill form', async () => {
      await cartPage.fillName("John Doe");
      await cartPage.fillCountry("USA");
      await cartPage.fillCity("New York");
      await cartPage.fillCC("1234567890123456");
      await cartPage.fillMonth("01");
       await cartPage.fillYear("2023");
    })
    await test.step('Submit', async () => {
       await cartPage.cliclPurchase();
    })
    
    await test.step('Capture Order ID', async () => {
      await cartPage.successMessage();
      await cartPage.getIdPurchase();
    })
  })
})