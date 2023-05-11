const { expect } = require('@playwright/test');

exports.FeedbackPage = class FeedbackPage {

    constructor(page) {
        this.page = page;
        this.nameInput = page.locator("#name");
        this.emailInput = page.locator("#email");
        this.subjectInput = page.locator("#subject");
        this.commentInput = page.locator("#comment");
        this.clearButton = page.locator("input[name='clear']");
        this.submitButton = page.locator("input[type='submit']");
        this.feedbackTitle = page.locator("#feedback-title");
    }

    async fillForm(name, email, subject, comment) {
        await this.nameInput.type(name);
        await this.emailInput.type(email);
        await this.subjectInput.type(subject);
        await this.commentInput.type(comment);
    }
    
    async resetForm() {
        await this.clearButton.click();
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async assertReset() {
        await expect(this.nameInput).toBeEmpty();
        await expect(this.commentInput).toBeEmpty();
    }

    async feedbackFormSent() {
        await expect(this.feedbackTitle).toBeVisible();
    }
}