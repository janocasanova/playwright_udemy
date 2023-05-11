const { expect } = require('@playwright/test');

exports.PaymentsPage = class PaymentsPage {

    constructor(page) {
        this.page = page;
        this.payeeSelector = page.locator("#sp_payee");
        this.payeeDetailsButton = page.locator("#sp_get_payee_details");
        this.payeeDetail = page.locator("#sp_payee_details");
        this.accountSelector = page.locator("#sp_account");
        this.accAmmountInput = page.locator("#sp_amount");
        this.dateInput = page.locator("#sp_date");
        this.descriptionInput = page.locator("#sp_description");
        this.submitPaymentButton = page.locator("#pay_saved_payees");
        this.message = page.locator("#alert_content > span")
    }

    async createPayment() {
        await this.payeeSelector.selectOption("apple");
        await this.payeeDetailsButton.click();
        await expect(this.payeeDetail).toBeVisible();
        await this.accountSelector.selectOption("6");
        await this.accAmmountInput.type("5000");
        await this.dateInput.type("2023-04-05");
        await this.descriptionInput.type("description message");
        await this.submitPaymentButton.click();
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible();
        await expect(this.message).toContainText("The payment was successfully submitted.");
    }
}