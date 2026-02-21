import { test } from "../src/fixture";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";

test.describe("Dashboard Tests", () => {
  test.beforeEach("", async ({ basePage }) => {
    await test.step("Navigate to the website", async () => {
      await basePage.gotoUrl("https://www.demoblaze.com/");
    });
  });
  test("Carousel Navigation Test", async ({ page, dashboard, basePage }) => {
    await test.step('Verify "Next" carousel navigation', async () => {
      await dashboard.carousalValidation("Next");
    });

    await test.step('Verify "Previous" carousel navigation', async () => {
      await dashboard.carousalValidation("Prev");
    });
  });

  test("Pagination Navigation Test", async ({ page, dashboard, basePage }) => {
    await test.step("Navigate to the next page", async () => {
      await dashboard.pageValidation("Next");
    });

    await test.step("Navigate to the previous page", async () => {
      await dashboard.pageValidation("Prev");
    });
  });

  test("Category Selection Test", async ({ page, basePage, dashboard }) => {
    await test.step("Filter by Phones category", async () => {
      await dashboard.categoryValidation("Phones");
    });

    await test.step("Filter by Laptops category", async () => {
      await dashboard.categoryValidation("Laptops");
    });

    await test.step("Filter by Monitors category", async () => {
      await dashboard.categoryValidation("Monitors");
    });
  });
});
