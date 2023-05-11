const { test, expect } = require('@playwright/test');
const { HomePage } = require('../page-objects/HomePage');

test.describe("Search Results", () => {
    test("Should find search results",async ({ page }) => {
        const homePage = new HomePage(page);
        homePage.visit();
        homePage.searchFor("bank");

        const numberOfLinks = await page.locator("li > a");
        await expect(numberOfLinks).toHaveCount(2);
    });
});