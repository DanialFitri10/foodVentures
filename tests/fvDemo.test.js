const { app } = require('../index');
const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const driver = new Builder().forBrowser('chrome').build();
let server;

before(async () => {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    });
});

describe('Testing FoodVentures Web Page - Edit and Update', () => {

    beforeEach(async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    });

    it('Should open the edit modal when "Edit" button is clicked', async () => {
        // Assuming there is an "Edit" button for a specific resource and click it.
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

    it('Should update a resource when "Update" button is clicked', async () => {
        // Assuming there is an "Edit" button for a specific resource and click it.
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        // Now, you are inside the modal. You can interact with elements within the modal here.
        // For example, find and modify input fields, click buttons, etc.

        // Assuming you modify the name in the edit form.
        const editNameField = await driver.findElement(By.id('editName'));
        await editNameField.clear();
        await editNameField.sendKeys('Updated Resource Name');

        // Find and click the "Update" button to perform the update.
        const updateButton = await driver.findElement(By.id('updateButton'));
        await updateButton.click();

        // Check if the success message or any indication of successful update is displayed.
        // You may need to adjust this based on your actual application behavior.
        const successMessage = await driver.findElement(By.id('success-message'));
        const isDisplayed = await successMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    afterEach(async function () {
        await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
            if (coverageData) {
                // Save coverage data to a file
                await fs.writeFile('coverage-frontend/coverages' + counter++ + '.json',
                    JSON.stringify(coverageData), (err) => {
                        if (err) {
                            console.error('Error writing coverage data:', err);
                        } else {
                            console.log('Coverage data written to coverage.json');
                        }
                    });
            }
        });
    });

    after(async function () {
        await driver.quit();
        await server.close();
        process.exit(0);
    });
});
