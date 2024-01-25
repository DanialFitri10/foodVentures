const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');

describe('Testing FoodVentures Web Page', () => {
    var driver;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('Should display the title as "FoodVentures"', async () => {
        await driver.get('http://localhost:5050/home.html');
        const title = await driver.getTitle();
        expect(title).to.equal("FoodVentures");
    });

    it('Should have a visible "Profile" button', async () => {
        await driver.get('http://localhost:5050/home.html');
        const profileButton = await driver.findElement(By.linkText("Profile"));
        const isDisplayed = await profileButton.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should have a visible "Logout" button', async () => {
        await driver.get('http://localhost:5050/home.html');
        const logoutButton = await driver.findElement(By.linkText("Logout"));
        const isDisplayed = await logoutButton.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should have a visible "Add Resource" button', async () => {
        await driver.get('http://localhost:5050/home.html');
        const addButton = await driver.findElement(By.id("addButton"));
        const isDisplayed = await addButton.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should display a table with headers', async () => {
        await driver.get('http://localhost:5050/home.html');
        const table = await driver.findElement(By.css("table.table"));
        const isDisplayed = await table.isDisplayed();
        expect(isDisplayed).to.equal(true);

        const headers = await table.findElements(By.tagName("th"));
        expect(headers.length).to.equal(7); 
    });

});
