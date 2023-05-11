const { expect } = require('@playwright/test');

exports.AbstractPage = class AbstractPage {

    constructor(page) {
        this.page = page;
    }

    async wait(time) {
        await this.page.waitForTimeout(time);
    }
}