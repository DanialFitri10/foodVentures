const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach, after } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();

let driver;
let server;

// Set up the server and driver before each test
beforeEach(async () => {
    // Start the server
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    });

    // Build the WebDriver
    driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
});

describe('Testing FoodVentures Web Page', () => {

    beforeEach(async () => {
        server = app.listen(0, 'localhost', () => {
                resolve(server);
        })
    });

    it('Should display the title as "foodVentures"', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const title = await driver.getTitle();
        expect(title.toLowerCase()).to.equal("foodventures"); // Compare in lowercase
    });


    it('Should have a visible "Profile" button', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const profileButton = await driver.findElement(By.linkText("Profile"));
        const isDisplayed = await profileButton.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should have a visible "Logout" button', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const logoutButton = await driver.findElement(By.linkText("Logout"));
        const isDisplayed = await logoutButton.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });


    it('Should display a table with headers', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const table = await driver.findElement(By.css("table.table"));
        const isDisplayed = await table.isDisplayed();
        expect(isDisplayed).to.equal(true);

        const headers = await table.findElements(By.tagName("th"));
        expect(headers.length).to.equal(7);
    });

    it('Should add a resource when "Add Resource" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

    });
    it('Should add a resource when "Add Resource" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

    });
    it('Should add a resource when "Add Resource" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    });

    it('Remove unexpected alert', async () => {
        try {
            await driver.get('http://localhost:5050/instrumented/home.html');

            const successAlert = await driver.wait(until.alertIsPresent(), 5000);
            const successAlertText = await successAlert.getText();

            if (successAlertText.includes('Resource delete successfully')) {
                console.log('Dismissed unexpected success alert after deletion');
                await successAlert.dismiss();
            }
        } catch (alertError) {
        }
    });

    it('Should delete multiple resources sequentially', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        const deleteButtons = await driver.findElements(By.xpath("//button[contains(text(),'Delete')]"));
        for (let deleteButton of deleteButtons) {
            await deleteButton.click();
        }

    });


    it('Should not allow updating a resource with empty fields', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find an "Edit" button for a specific resource and click it to trigger the resource update.
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        // Clear the fields in the edit form.
        const editNameField = await driver.findElement(By.id('editName'));
        await editNameField.clear();

        // Clear other fields similarly.

        // Find and click the "Update" button to perform the update.
        const updateButton = await driver.findElement(By.id('updateButton'));
        await updateButton.click();
        // You can add assertions here to check if an error message is displayed, indicating that all fields are required.
    });


    it('Should open the edit modal when "Edit" button is clicked', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find an "Edit" button for a specific resource and click it.
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        // Now, you are inside the modal. You can interact with elements within the modal here.
        // For example, find and modify input fields, click buttons, etc.

        // After interacting with the modal elements, you can add assertions to verify the expected behavior.
        // For example, check if input fields are visible and if a "Save" button is present in the modal.
        const editNameField = await driver.findElement(By.id('editName'));

        const isEditNameFieldDisplayed = await editNameField.isDisplayed();

        expect(isEditNameFieldDisplayed).to.equal(true);
    });


});

afterEach(async function () {
    try {
        // Check for unexpected alerts and dismiss them
        try {
            const alert = await driver.switchTo().alert();
            console.log(`Alert text: ${await alert.getText()}`);
            await alert.dismiss();
            console.log('Dismissed unexpected alert in "after each" hook');
        } catch (alertError) {
            // No unexpected alert, continue with the "after each" hook
        }

        // Additional cleanup logic here

        // Save coverage data
        const coverageData = await driver.executeScript('return window.__coverage__;');
        if (coverageData) {
            await fs.writeFile(`coverage-frontend/coverage${counter++}.json`, JSON.stringify(coverageData));
            console.log('Coverage data written to coverage.json');
        }
    } catch (error) {
        console.error('Error in "after each" hook:', error);
    }
    // Quit the WebDriver
    await driver.quit();
});

// Clean up the server and exit after all tests are finished
after(async function () {
    await server.close();
    process.exit(0);
});