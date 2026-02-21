import { test } from "../src/fixture";


test.describe('Detail Product Test', () => {
  test.beforeEach(async ({ basePage, detailProdcutPage }) => {
      await test.step('Navigate to website and capture product list', async () => {
        await basePage.gotoUrl('https://www.demoblaze.com/');
        await detailProdcutPage.producCapture(); 
      });
    });
  test('Product details should match the selected product', async ({ page, basePage, detailProdcutPage, dashboard}) => {
    await test.step('Select a product from the dashboard', async () => {
      await dashboard.clickProduct();
    })
    
    await test.step('Verify product title matches the selection', async () => {
      await detailProdcutPage.productHeaderValidation();
    })
    
    await test.step('Product price must be same with click Product', async () => {
      await detailProdcutPage.productPriceValidation();
    })
  })
})