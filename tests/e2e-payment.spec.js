const { test } = require('@playwright/test');
const { HomePage } = require("../page-objects/HomePage");
const { LoginPage } = require("../page-objects/LoginPage");
const { PaymentsPage } = require("../page-objects/PaymentsPage");
const { Navbar } = require("../page-objects/components/Navbar");

test.describe("New Payment", () => {
    let homePage;
    let loginPage;
    let paymentsPage;
    let navBar;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        paymentsPage = new PaymentsPage(page);
        navBar = new Navbar(page);

        await homePage.visit();
        await homePage.clickOnSignIn();
        await loginPage.login("username", "password");
    })

    test("Should send new payment",async ({ page }) => {
        await loginPage.gotoAccountSummary()
        await navBar.clickOnTab("Pay Bills");
        await paymentsPage.createPayment(page);
        await paymentsPage.assertSuccessMessage();
    })
})