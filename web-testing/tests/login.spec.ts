import { test } from "../src/fixture";
import { parentSuite, suite, label } from "allure-js-commons";

test.describe('Login Test', () => {  
  test.describe('Manual Form Check', () => {
    test.beforeEach(async ({ basePage, dashboard }) => {
      await basePage.gotoUrl('https://www.demoblaze.com/');
      await dashboard.menu('Login');
    });

    test('User should be able to fill form', async ({ loginPage }) => {
      await loginPage.fillEmailForm('test@mail.com');
      await loginPage.fillPasswordForm('password');
    });
  });

  
  test.describe('Auth Success Check', () => {
    test('User should login successfully', async ({ loginAs, dashboard }) => {
      await loginAs('user');
      await dashboard.nameOfUser('user'); 

    });
  });
});