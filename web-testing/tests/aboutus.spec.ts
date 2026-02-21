import { test } from "../src/fixture";

test.describe('About Us Test', () => {
  test('User Should be able to click on About us Menu', async ({ aboutusPage , basePage, dashboard}) => {
    await test.step('User navigate to Dasyboard', async () => {
      await basePage.gotoUrl('https://www.demoblaze.com/');
    });
    
    await test.step('User click on About us Menu', async () => {
      await dashboard.menu('About Us');
    })
    
   await test.step('User should be able to see About us page', async () => {
      await aboutusPage.openVideo();
    })
    
  })
  
})