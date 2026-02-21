import { test } from "../src/fixture";

test.describe('Contact Us Tests', () => {
  
  test.beforeEach(async ({ basePage, contactPage, dashboard }) => {
    await basePage.gotoUrl('https://www.demoblaze.com/');
    await dashboard.menu('Contact')
    await contactPage.pages();
  })
  
  test('Should be able to fill the email field', async ({ contactPage }) => {
    await test.step('Fill contact email', async () => {
      await contactPage.fillContactEmail('test@example.com')
    })
  });
  
  test('Should be able to fill the name field', async ({ contactPage }) => {
    await test.step('Fill contact name', async () => {
      await contactPage.fillContactName('John Doe')
    })
  });
  
  test('Should be able to fill the message field', async ({ contactPage }) => {
    await test.step('Fill contact message', async () => {
      await contactPage.fillContactMessage('Hello World')
    })
  });
  
  test('Should be able to submit the contact form successfully', async ({ contactPage }) => {
    await test.step('Fill all required fields and send message', async () => {
      await contactPage.fillContactEmail('test@example.com')
      await contactPage.fillContactName('John Doe')
       await contactPage.fillContactMessage('Hello World')
      await contactPage.sendContactMessage();
    })
  });
  
})
