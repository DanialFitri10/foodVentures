const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

var server;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing FoodVentures Web Page', () => {
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
    it('Should not allow updating a resource with empty fields', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find and click the "Edit" button for a specific resource
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        // Clear the fields in the edit form
        const editNameField = await driver.findElement(By.id('editName'));
        await editNameField.clear();

        // Clear other fields similarly.

        // Find and click the "Update" button to perform the update
        const updateButton = await driver.findElement(By.id('updateButton'));
        await updateButton.click();

        // Assert that an error message is displayed
        const errorMessage = await driver.findElement(By.id('errorMessage'));
        const isErrorMessageDisplayed = await errorMessage.isDisplayed();

        expect(isErrorMessageDisplayed).to.equal(true);
    });

    it('Should open the edit modal when "Edit" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find and click the "Edit" button for a specific resource
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        // Assert that the edit modal is displayed
        const editModal = await driver.findElement(By.id('editModal'));
        const isEditModalDisplayed = await editModal.isDisplayed();

        expect(isEditModalDisplayed).to.equal(true);
    });
});


after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});

afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverageEdit' + counter++ + '.json',
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