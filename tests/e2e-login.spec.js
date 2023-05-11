const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { HomePage } = require('../page-objects/HomePage');

test.describe("Login / Logout flow", () => {
    //Before Hook
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visit();
    });

    test("Negative Scenario for Login", async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.clickOnSignIn();
        await loginPage.login("invalid_username", "invalid_password");
        await loginPage.wait(3000);
        await loginPage.assertErrorMessage()
    });

    //Positive Scenario + Logout
    test("Positive Scenario for Login + Logout",async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password");
        await loginPage.gotoAccountSummary();

        const accountSummaryTab = await page.locator("#account_summary_tab");
        if(!await accountSummaryTab.isVisible()) {
            await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
        };
        await expect(accountSummaryTab).toBeVisible();

        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');

    })
});
5