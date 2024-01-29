const { Builder } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');

describe('Testing FoodVentures Web Page', () => {
    let driver;
    const baseUrl = 'http://localhost:5050';

    beforeEach(async function () {
        this.timeout(10000); // Increase the timeout to 10 seconds
        driver = await new Builder().forBrowser('chrome').build();

        console.log('Before');
        const userPagePath = '/home.html';
        await driver.get(baseUrl + userPagePath);
        console.log('After');
    });

    afterEach(async () => {
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error during browser cleanup:', error);
        }
    });

    it('Should display the title as "FoodVentures', async () => {
        try {
            const title = await driver.getTitle();

            console.log('Title:', title);

            expect(title).to.equal('DVOPS - Resource Management Web App');
        } catch (error) {
            console.error('Error during test execution:', error);
            throw error;
        }
    });
});