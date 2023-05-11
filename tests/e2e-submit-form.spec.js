const { test } = require('@playwright/test');
const { HomePage } = require('../page-objects/HomePage');
const { FeedbackPage } = require('../page-objects/FeedbackPage');

test.describe("Feedback Form", () => {
    let feedbackPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        feedbackPage = new FeedbackPage(page);
        await homePage.visit();
        await homePage.clickOnFeedbackTab();
    });

    // Reset feedback form
    test("Reset feedback form",async ({ page }) => {
        await feedbackPage.fillForm("some name", "some_email@mail.com", "some subject", "some comment");
        await feedbackPage.resetForm();
        await feedbackPage.assertReset();
    });

    //Submit feedback form
    test("Submit feedback form",async ({ page }) => {
        await feedbackPage.fillForm("some name", "some_email@mail.com", "some subject", "some comment");
        await feedbackPage.submitForm();
        await feedbackPage.feedbackFormSent();
    });
});