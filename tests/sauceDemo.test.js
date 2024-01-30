const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var counter = 0;
var server;

before(async () => {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        })
    })
});

describe('Testing FoodVentures Web Page', () => {

    // beforeEach(async () => {
    //     server  await new Promise((resolve) => {
    //         server = app.listen(0, 'localhost', () => {
    //             resolve(server);
    //         })
    //     })
    // });

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


    it('Should not add a resource with missing fields', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Leave some fields empty in the resource addition form.
        const name = await driver.findElement(By.id('name'));
        const description = await driver.findElement(By.id('description'));
        const location = await driver.findElement(By.id('location'));
        const rating = await driver.findElement(By.id('rating'));
        
        // Fill out the form fields with valid data.
        await name.sendKeys('');
        await description.sendKeys('');
        await location.sendKeys('');
        await rating.sendKeys('');

        // Find and click the "Add" button to submit the resource addition form.
        const addButton = await driver.findElement(By.id('addResourceBtn'));
        await addButton.click();

        // Check if an error message is displayed indicating that all fields are required.
        await driver.wait(until.elementLocated(By.id('message')), 5000);
        const message = await driver.findElement(By.id('message')).getText();
        expect(message).toEqual("All fields are required!");
    });

    it('Should add a resource with valid data', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();

        // Fill out the form fields with valid data.
        const name = await driver.findElement(By.id('name'));
        const description = await driver.findElement(By.id('description'));
        const location = await driver.findElement(By.id('location'));
        const rating = await driver.findElement(By.id('rating'));
        
        

        await name.sendKeys('Supper Deck');
        await description.sendKeys('Nice Foods!');
        await location.sendKeys('Tamp Hub');
        await rating.sendKeys('5');
        
        // Find and click the "Add" button to submit the resource addition form.
        const addButton = await driver.findElement(By.id('addResourceBtn'));
        await addButton.click();

        // Check if the newly added resource is displayed on the page.
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        expect(alertText).to.include("Resouce added successfully");
        await alert.accept()
    });

    it('Should delete a resource and confirm deletion', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // Confirm the deletion by accepting the confirmation dialog.
        const confirmButton = await driver.findElement(By.id('confirmDeleteButton'));
        await confirmButton.click();

        // Check if the resource is no longer listed.
        const deletedResourceElement = await driver.findElement(By.xpath("//div[contains(text(),'Deleted Resource')]"));
        const isDisplayed = await deletedResourceElement.isDisplayed();
        expect(isDisplayed).to.equal(false); 
    });

    it('Should not delete a resource if deletion is declined', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // Decline the deletion by canceling the confirmation dialog.
        const cancelButton = await driver.findElement(By.id('cancelDeleteButton'));
        await cancelButton.click();

        // Check if the resource is still listed.
        const resourceElement = await driver.findElement(By.xpath("//div[contains(text(),'Resource to Keep')]"));
        const isDisplayed = await resourceElement.isDisplayed();
        expect(isDisplayed).to.equal(true); // Resource should still be displayed.
    });



    it('Should handle adding a resource with the same name', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        // Fill out the form fields with data that matches an existing resource.
        // This assumes you know the name of an existing resource.
        const nameInput = await driver.findElement(By.id('name')); // Replace with actual ID
        await nameInput.sendKeys('Existing Resource Name'); // Replace with the actual existing resource name
        // Fill other required fields similarly...
    
        // Find and click the "Add" button to submit the resource addition form.
        const submitButton = await driver.findElement(By.id('submitButton')); // Replace with actual ID
        await submitButton.click();
    
        // Check if an error message is displayed indicating that a resource with the same name already exists.
        const errorMessage = await driver.findElement(By.id('error-message')); // Replace with actual ID of the error message element
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
        expect(await errorMessage.getText()).to.include('resource with the same name already exists'); // Replace with the actual error message text
    });
    

    it('Should handle adding a resource with a negative rating', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        // Fill out the form fields with data, including a negative rating value.
        await driver.findElement(By.id('name')).sendKeys('Test Resource');
        await driver.findElement(By.id('location')).sendKeys('Test Location');
        await driver.findElement(By.id('description')).sendKeys('Test Description');
        await driver.findElement(By.id('rating')).sendKeys('-5'); // Entering a negative rating
    
        // Find and click the "Add" button to submit the resource addition form.
        const submitButton = await driver.findElement(By.id('submitButton')); // Replace with actual ID
        await submitButton.click();
    
        // Check if an error message is displayed indicating that the rating must be a positive number.
        const errorMessage = await driver.findElement(By.id('error-message')); // Replace with actual ID of the error message element
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
        expect(await errorMessage.getText()).to.include('rating must be a positive number'); // Replace with the actual error message text
    });
    

    // Add more test cases as needed to cover other scenarios or validations for resource addition.



    it('Should delete a resource when "Delete" button is clicked', async () => {
        // You can add a resource to the database here before testing the deletion.
        // Then, navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/instrumented/home.html');

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
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // Wait for the deletion process to complete (you can use ExpectedConditions for this).
        await driver.wait(until.urlIs('http://localhost:5050/instrumented/home.html'));
    });

    it('Should delete a resource when "Delete" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // You can add assertions here to check if the resource is successfully deleted.
        // For example, check if a success message is displayed or if the resource is no longer listed.

        // You may also need to refresh the page or navigate back to the resource list page to validate the deletion.
    });

    it('Should not delete a resource when deletion is canceled', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();

        // In the delete confirmation dialog, find and click the "Cancel" button.

        // Check if the resource is not deleted, and it remains on the page.
    });

    it('Should handle deleting a resource that does not exist', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');

        // Attempt to delete a resource that does not exist (e.g., provide an invalid resource ID).

        // Check if an error message is displayed indicating that the resource does not exist.
    });

    it('Should add a resource when "Add Resource" button is clicked', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        // Fill out the form fields with valid data.
        // Assume that the form fields have corresponding IDs or other selectors to identify them.
        const nameInput = await driver.findElement(By.id('name'));
        const locationInput = await driver.findElement(By.id('location'));
        const descriptionInput = await driver.findElement(By.id('description'));
        const ratingInput = await driver.findElement(By.id('rating'));
    
        await nameInput.sendKeys('Test Resource');
        await locationInput.sendKeys('Test Location');
        await descriptionInput.sendKeys('Test Description');
        await ratingInput.sendKeys('4');
    
        // Find and click the "Add" button to submit the resource addition form.
        const submitButton = await driver.findElement(By.id('submitButton'));
        await submitButton.click();
    
        // Check if the newly added resource is displayed on the page.
        // Assume that added resources are listed in a specific section with an identifiable selector.
        const addedResource = await driver.findElement(By.xpath("//div[contains(text(),'Test Resource')]"));
        const isDisplayed = await addedResource.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });
    
    it('Should not add a resource with missing fields', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        // Find the "Add Resource" button and click it.
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        // Leave some fields empty in the resource addition form.
        // Assuming only the 'name' field is filled.
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys('Incomplete Resource');
    
        // Find and click the "Add" button to submit the resource addition form.
        const submitButton = await driver.findElement(By.id('submitButton'));
        await submitButton.click();
    
        // Check if an error message is displayed indicating that all fields are required.
        const errorMessage = await driver.findElement(By.id('error-message'));
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
        expect(await errorMessage.getText()).to.include('All fields are required');
    });
    
    // Additional test cases follow the same pattern, modifying input values and expected outcomes accordingly.
    
    // Test cases for deleteResource function can be written similarly:
    it('Should delete a resource when "Delete" button is clicked', async () => {
        // Navigate to the page where the resource is listed.
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        // Find a "Delete" button for a specific resource and click it.
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
    
        // Wait for the deletion process to complete (you can use ExpectedConditions for this).
        await driver.wait(until.urlIs('http://localhost:5050/instrumented/home.html'));
    
        // Check if the resource is no longer listed.
        // Assuming the deleted resource had a unique identifier or text.
        const deletedResource = await driver.findElement(By.xpath("//div[contains(text(),'Deleted Resource')]"));
        const isDisplayed = await deletedResource.isDisplayed();
        expect(isDisplayed).to.equal(false);
    });
    


    it('Should not add a resource with invalid data types', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        // Fill out the form fields with invalid data types
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys(123); // Assuming name should be a string
    
        const addButton = await driver.findElement(By.id('addButton'));
        await addButton.click();
    
        const errorMessage = await driver.findElement(By.id('error-message'));
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should handle excessively long inputs', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
        const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
        await addResourceButton.click();
    
        const nameInput = await driver.findElement(By.id('name'));
        await nameInput.sendKeys('VeryLongInputString...');
    
        const addButton = await driver.findElement(By.id('addButton'));
        await addButton.click();
    
        const errorMessage = await driver.findElement(By.id('error-message'));
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.equal(true);
    });

    it('Should delete multiple resources sequentially', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        const deleteButtons = await driver.findElements(By.xpath("//button[contains(text(),'Delete')]"));
        for (let deleteButton of deleteButtons) {
            await deleteButton.click();
            // Handle confirmation if necessary
            // ...
        }
    
        // Assertions to verify deletion
    });

    it('Should handle page refresh during deletion', async () => {
        await driver.get('http://localhost:5050/instrumented/home.html');
    
        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(),'Delete')]"));
        await deleteButton.click();
    
        await driver.navigate().refresh();
    
        // Assertions to verify the status of deletion
    });
    
    
    
    
    // More test cases for deletion can be added as per your scenarios.
    


    // it('Should not allow updating a resource with empty fields', async () => {
    //     // Navigate to the page where the resource is listed.
    //     await driver.get('http://localhost:5050/instrumented/home.html');

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
    //     await driver.get('http://localhost:5050/instrumented/home.html');

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
})