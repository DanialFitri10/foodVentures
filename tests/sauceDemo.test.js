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

    it('Should delete a resource when "Delete" button is clicked', async () => {
        // You can add a resource to the database here before testing the deletion.
        // Then, navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // You can add assertions here to check if the resource is successfully deleted
        // For example, you can check if a success message is displayed or if the resource is no longer listed.

        // You may also need to refresh the page or navigate back to the resource list page to validate the deletion.
    });

    it('Should not allow deletion without confirmation', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');

        // Find a "Delete" button for a specific resource and click it without confirmation.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // You can add assertions here to check if a confirmation prompt is displayed.
        // The test should verify that the resource is not deleted without confirmation.
    });



    it('Should cancel deletion when "Cancel" button is clicked in confirmation', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');
    
        // Find a "Delete" button for a specific resource and click it to trigger the confirmation.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
    
        // You can add assertions here to check if the resource is still present on the page without being deleted.
    });
    

    it('Should open the edit modal when "Edit" button is clicked', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');
    
        // Find an "Edit" button for a specific resource and click it.
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();
    
        // You can add assertions here to check if the edit modal is displayed.
        // Verify that the modal contains the fields for editing the resource.
    });
    
    it('Should update a resource when "Update" button is clicked', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');
    
        // Find an "Edit" button for a specific resource and click it to trigger the resource update.
        const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
        await editButton.click();
    
        // Modify the fields in the edit form as needed.
        const editNameField = await driver.findElement(By.id('editName'));
        await editNameField.clear();
        await editNameField.sendKeys('Updated Name');
    
        // Update other fields similarly.
    
        // Find and click the "Update" button to perform the update.
        const updateButton = await driver.findElement(By.id('updateButton'));
        await updateButton.click();
    
        // You can add assertions here to check if the resource is successfully updated.
    });

    
    it('Should not allow updating a resource with empty fields', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');
    
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


});
