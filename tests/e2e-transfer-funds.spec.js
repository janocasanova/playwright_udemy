const { test, expect } = require('@playwright/test');
const { HomePage } = require("../page-objects/HomePage");
const { LoginPage } = require("../page-objects/LoginPage");

test.describe("Transfer funds and Make Payments", () => {
    let homePage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.visit();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password");
    })

    test("Transfer funds",async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
        await page.click("#transfer_funds_tab");
        await page.selectOption("#tf_fromAccountId", "2");
        await page.selectOption("#tf_toAccountId", "3");
        await page.type("#tf_amount", "500");
        await page.type("#tf_description", "Test message");
        await page.click("#btn_submit");

        const boardHeader = await page.locator("h2.board-header");
        await expect(boardHeader).toContainText("Verify");
        await page.click("#btn_submit");

        const message = await page.locator(".alert-success");
        await expect(message).toContainText("You successfully submitted your transaction");
        
    })

})