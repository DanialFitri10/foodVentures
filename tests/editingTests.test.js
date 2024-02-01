const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
// const fs = require('fs').promises;
const fs = require('fs');


const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var counter = 0;
var server;

describe('Edit Resource Functionality', () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:5050/instrumented/home.html');
    });

    after(async () => {
        await driver.quit();
    });

    // it('Should open the edit modal with correct data when "Edit" button is clicked', async () => {
    //     // Read test data from resources.json
    //     //const testData = JSON.parse(fs.readFileSync('utils/resources.json', 'utf-8'));
    //     const addResourceButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Add Resource')]")), 15000);
    //     await addResourceButton.click();

    //     // Wait for the Add Resource modal to be visible
    //     const addResourceModal = await driver.findElement(By.id("resourceModal"));
    //     await driver.wait(until.elementIsVisible(addResourceModal), 5000);

    //     // Fill out the form
    //     const name = await driver.findElement(By.id('name'));
    //     const description = await driver.findElement(By.id('description'));
    //     const location = await driver.findElement(By.id('location'));
    //     const rating = await driver.findElement(By.id('rating'));

    //     await name.sendKeys('Supper Deck');
    //     await description.sendKeys('Nice Foods!');
    //     await location.sendKeys('Tamp Hub');
    //     await rating.sendKeys('5');


    //     // Submit the form
    //     const addButton = await driver.findElement(By.id('addResource'));
    //     await addButton.click();

    //     // Perform actions to trigger the appearance of the "Edit" button
    //     // ...

    //     // Now wait for the "Edit" button to be visible
    //     // const editButton = await driver.wait(until.elementLocated(By.css('.btn-warning')), 5000);
    //     // await editButton.click();

    //     // let editNameField, editLocationField, editDescriptionField, editRatingField;

    //     // Code to set up test data or retrieve data from a source
    //     // For example, read data from resources.json
    //     // try {
    //     //     const jsonData = fs.readFileSync('utils/resources.json', 'utf-8');
    //     //     const resources = JSON.parse(jsonData);
    //     //     // Assuming you have a resource to edit, use it for the test
    //     //     const testResource = resources[0]; // Adjust this based on your data structure

    //     //     // Set variables with test data
    //     //     editNameField = testResource.name;
    //     //     editLocationField = testResource.location;
    //     //     editDescriptionField = testResource.description;
    //     //     editRatingField = testResource.rating;
    //     // } catch (error) {
    //     //     console.error('Error reading or parsing JSON data:', error);
    //     // }

    //     // expect(editNameField).to.equal(testData.editName);
    //     // expect(editLocationField).to.equal(testData.editLocation);
    //     // expect(editDescriptionField).to.equal(testData.editDescription);
    //     // expect(editRatingField).to.equal(testData.editRating);

    //     // Wait for the Edit Resource modal to be visible
    //     const editResourceModal = await driver.wait(until.elementLocated(By.id('editResourceModal')), 5000);
    //     await driver.wait(until.elementIsVisible(editResourceModal), 5000);

    //     // Check if the fields in the modal are populated with the correct data from the JSON file
    //     const editNameField = await driver.findElement(By.id('editName')).getAttribute('value');
    //     const editLocationField = await driver.findElement(By.id('editLocation')).getAttribute('value');
    //     const editDescriptionField = await driver.findElement(By.id('editDescription')).getAttribute('value');
    //     const editRatingField = await driver.findElement(By.id('editRating')).getAttribute('value');

    // });

    it('Should open the edit modal with correct data when "Edit" button is clicked', async () => {
    
        // const addButton = await driver.findElement(By.xpath('//button[contains(text(),"Add Resource")]'));
        // await addButton.click();
    
        try {
            // Navigate to the page
            await driver.get('http://localhost:5050/instrumented/home.html');

            // Wait for and click the "Add Resource" button
            const addResourceButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Add Resource')]")), 10000);
            await addResourceButton.click();

            // Wait for the Add Resource modal to be visible
            const addResourceModal = await driver.findElement(By.id("resourceModal"));
            await driver.wait(until.elementIsVisible(addResourceModal), 5000);

            // Fill out the form
            const name = await driver.findElement(By.id('name'));
            const description = await driver.findElement(By.id('description'));
            const location = await driver.findElement(By.id('location'));
            const rating = await driver.findElement(By.id('rating'));

            await name.sendKeys('Supper Deck');
            await description.sendKeys('Nice Foods!');
            await location.sendKeys('Tamp Hub');
            await rating.sendKeys('5');


            // Submit the form
            const addButton = await driver.findElement(By.id('addResourceBtn'));
            await addButton.click();


            // Wait for and handle the success alert
            // const successAlert = await driver(until.alertIsPresent());
            // const successAlertText = await successAlert.getText();
            // expect(successAlertText).to.include("Resource added successfully");
            // console.log('Success Alert text verified');
            // await successAlert.accept();
            // console.log('Success Alert accepted');

            // Verify that the page redirects to home.html
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.include('home.html');

        } catch (error) {
            console.error('Test failed', error);
            throw error; // Rethrowing the error ensures that the test will fail properly
        }
    
        // expect(editNameField).to.equal(testData.editName);
        // expect(editLocationField).to.equal(testData.editLocation);
        // expect(editDescriptionField).to.equal(testData.editDescription);
        // expect(editRatingField).to.equal(testData.editRating);
    
        // Wait for the Edit Resource modal to be visible
        const editResourceModal = await driver.wait(until.elementLocated(By.id('editResourceModal')), 5000);
        await driver.wait(until.elementIsVisible(editResourceModal), 5000);
    
        // Check if the fields in the modal are populated with the correct data from the JSON file
        const editNameField = await driver.findElement(By.id('editName')).getAttribute('value');
        const editLocationField = await driver.findElement(By.id('editLocation')).getAttribute('value');
        const editDescriptionField = await driver.findElement(By.id('editDescription')).getAttribute('value');
        const editRatingField = await driver.findElement(By.id('editRating')).getAttribute('value');
    });
    

    it('Should update the resource with valid data when "Update" button is clicked', async () => {
        const updateButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(),"Update Resource")]')), 5000);
        await updateButton.click();

        const updatedName = 'Updated Name';
        const updatedLocation = 'Updated Location';
        const updatedDescription = 'Updated Description';
        const updatedRating = '4';

        await driver.findElement(By.id('editName')).clear();
        await driver.findElement(By.id('editName')).sendKeys(updatedName);

        await driver.findElement(By.id('editLocation')).clear();
        await driver.findElement(By.id('editLocation')).sendKeys(updatedLocation);

        await driver.findElement(By.id('editDescription')).clear();
        await driver.findElement(By.id('editDescription')).sendKeys(updatedDescription);

        await driver.findElement(By.id('editRating')).clear();
        await driver.findElement(By.id('editRating')).sendKeys(updatedRating);

        const successMessage = await driver.findElement(By.id('editMessage')).getText();
        expect(successMessage).to.equal('Edited Resource: ' + updatedName + '!');
    });

    it('Should display an error message when trying to update with missing fields', async () => {
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();

        await driver.findElement(By.id('editName')).clear();
        await driver.findElement(By.id('editLocation')).clear();

        const updateButton = await driver.findElement(By.xpath("//button[contains(text(),'Update Resource')]"));
        await updateButton.click();

        await driver.wait(until.elementLocated(By.id('editMessage')), 5000);
        const errorMessage = await driver.findElement(By.id('editMessage')).getText();

        expect(errorMessage).to.equal('All fields are required!');
    });
});
