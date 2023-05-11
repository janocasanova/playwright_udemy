const { expect } = require('@playwright/test');
const { AbstractPage } = require("../page-objects/AbstractPage");

exports.LoginPage = class LoginPage extends AbstractPage {

    constructor(page) {
        //this.page = page;
        super(page);
        this.usernameInput = page.locator("#user_login");
        this.passwordInput = page.locator("#user_password");
        this.submitButton = page.locator("text=Sign in");
        this.errorMessage = page.locator(".alert-error");
    }

    async login(username, password) {
        await this.usernameInput.type(username);
        await this.passwordInput.type(password);
        await this.submitButton.click();
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText("Login and/or password are wrong.")
    }

    async gotoAccountSummary() {
        await this.page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
    }
}