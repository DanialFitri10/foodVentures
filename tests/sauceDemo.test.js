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


    it('Should display a table with headers', async () => {
        await driver.get('http://localhost:5050/home.html');
        const table = await driver.findElement(By.css("table.table"));
        const isDisplayed = await table.isDisplayed();
        expect(isDisplayed).to.equal(true);

        const headers = await table.findElements(By.tagName("th"));
        expect(headers.length).to.equal(7);
    });

    it('Should add a resource when "Add Resource" button is clicked', async () => {
        await driver.get('http://localhost:5050/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Fill out the form fields with valid data.

        // Find and click the "Add" button to submit the resource addition form.

        // Check if the newly added resource is displayed on the page.
    });

    it('Should not add a resource with missing fields', async () => {
        await driver.get('http://localhost:5050/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Leave some fields empty in the resource addition form.

        // Find and click the "Add" button to submit the resource addition form.

        // Check if an error message is displayed indicating that all fields are required.
    });

    it('Should handle adding a resource with the same name', async () => {
        await driver.get('http://localhost:5050/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Fill out the form fields with data that matches an existing resource.

        // Find and click the "Add" button to submit the resource addition form.

        // Check if an error message is displayed indicating that a resource with the same name already exists.
    });

    it('Should handle adding a resource with a negative rating', async () => {
        await driver.get('http://localhost:5050/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Fill out the form fields with data, including a negative rating value.

        // Find and click the "Add" button to submit the resource addition form.

        // Check if an error message is displayed indicating that the rating must be a positive number.
    });

    // Add more test cases as needed to cover other scenarios or validations for resource addition.



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
    it('Should delete a resource when "Delete" button is clicked', async () => {
        // Store the initial count of resources before deletion.


        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // Wait for the deletion process to complete (you can use ExpectedConditions for this).
        await driver.wait(until.urlIs('http://localhost:5050/home.html'));
    });

    it('Should delete a resource when "Delete" button is clicked', async () => {
        await driver.get('http://localhost:5050/home.html');
    
        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
    
        // You can add assertions here to check if the resource is successfully deleted.
        // For example, check if a success message is displayed or if the resource is no longer listed.
    
        // You may also need to refresh the page or navigate back to the resource list page to validate the deletion.
    });
    
    it('Should not delete a resource when deletion is canceled', async () => {
        await driver.get('http://localhost:5050/home.html');
    
        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
    
        // In the delete confirmation dialog, find and click the "Cancel" button.
    
        // Check if the resource is not deleted, and it remains on the page.
    });
    
    it('Should handle deleting a resource that does not exist', async () => {
        await driver.get('http://localhost:5050/home.html');
    
        // Attempt to delete a resource that does not exist (e.g., provide an invalid resource ID).
    
        // Check if an error message is displayed indicating that the resource does not exist.
    });
    
    // Add more test cases as needed to cover other scenarios or validations for resource deletion.
    


    // it('Should not allow updating a resource with empty fields', async () => {
    //     // Navigate to the page where the resource is listed.
    //     await driver.get('http://localhost:5050/home.html');

    //     // Find an "Edit" button for a specific resource and click it to trigger the resource update.
    //     const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
    //     await editButton.click();

    //     // Clear the fields in the edit form.
    //     const editNameField = await driver.findElement(By.id('editName'));
    //     await editNameField.clear();

    //     // Clear other fields similarly.

    //     // Find and click the "Update" button to perform the update.
    //     const updateButton = await driver.findElement(By.id('updateButton'));
    //     await updateButton.click();
    //     // You can add assertions here to check if an error message is displayed, indicating that all fields are required.
    // });


    // it('Should open the edit modal when "Edit" button is clicked', async () => {
    //     // Navigate to the page where the resource is listed.
    //     await driver.get('http://localhost:5050/home.html');

    //     // Find an "Edit" button for a specific resource and click it.
    //     const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
    //     await editButton.click();

    //     // Now, you are inside the modal. You can interact with elements within the modal here.
    //     // For example, find and modify input fields, click buttons, etc.

    //     // After interacting with the modal elements, you can add assertions to verify the expected behavior.
    //     // For example, check if input fields are visible and if a "Save" button is present in the modal.
    //     const editNameField = await driver.findElement(By.id('editName'));

    //     const isEditNameFieldDisplayed = await editNameField.isDisplayed();

    //     expect(isEditNameFieldDisplayed).to.equal(true);
    // });


});
