exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#signin_button");
        this.searchBox = page.locator("#searchTerm");
        this.feedbackTab = page.locator("#feedback");
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/")
    }

    async clickOnSignIn() {
        await this.signInButton.click();
    }

    async searchFor(phrase) {
        await this.searchBox.type(phrase);
        await this.page.keyboard.press("Enter");
    }

    async clickOnFeedbackTab() {
        await this.feedbackTab.click();
    }
}