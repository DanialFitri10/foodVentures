// // const { Builder, By, Key, until } = require('selenium-webdriver');
// // const { describe, it, beforeEach, afterEach } = require('mocha');
// // const { expect } = require('chai');

// // describe('Testing Edit Functions On Web Page', () => {
// //     var driver;

// //     beforeEach(async () => {
// //         driver = await new Builder().forBrowser('chrome').build();
// //     });

// //     afterEach(async () => {
// //         await driver.quit();
// //     });

// //     it('Should not allow updating a resource with empty fields', async () => {
// //         // Navigate to the page where the resource is listed.
// //         await driver.get('http://localhost:5050/home.html');

// //         // Find an "Edit" button for a specific resource and click it to trigger the resource update.
// //         const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
// //         await editButton.click();

// //         // Clear the fields in the edit form.
// //         const editNameField = await driver.findElement(By.id('editName'));
// //         await editNameField.clear();

// //         // Clear other fields similarly.

// //         // Find and click the "Update" button to perform the update.
// //         const updateButton = await driver.findElement(By.id('updateButton'));
// //         await updateButton.click();

// //         // You can add assertions here to check if an error message is displayed, indicating that all fields are required.
// //     });

// //     it('Should open the edit modal when "Edit" button is clicked', async () => {
// //         // Navigate to the page where the resource is listed.
// //         await driver.get('http://localhost:5050/home.html');

// //         // Find an "Edit" button for a specific resource and click it.
// //         const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
// //         await editButton.click();

// //         // Now, you are inside the modal. You can interact with elements within the modal here.
// //         // For example, find and modify input fields, click buttons, etc.

// //         // After interacting with the modal elements, you can add assertions to verify the expected behavior.
// //         // For example, check if input fields are visible and if a "Save" button is present in the modal.
// //         const editNameField = await driver.findElement(By.id('editName'));
// //         const saveButton = await driver.findElement(By.id('saveButton'));

// //         const isEditNameFieldDisplayed = await editNameField.isDisplayed();
// //         const isSaveButtonDisplayed = await saveButton.isDisplayed();

// //         expect(isEditNameFieldDisplayed).to.equal(true);
// //         expect(isSaveButtonDisplayed).to.equal(true);
// //     });

// // });

// const { app } = require('../index');
// const { Builder, By, Key, until } = require('selenium-webdriver');
// const { describe, it, beforeEach, afterEach } = require('mocha');
// const { expect } = require('chai');
// const fs = require('fs').promises;

// const path = require('path');
// const chrome = require('selenium-webdriver/chrome');
// const chromeOptions = new chrome.Options();
// const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
// var counter = 0;
// var server;

// before(async () => {
//     server = await new Promise((resolve) => {
//         server = app.listen(0, 'localhost', () => {
//             resolve(server);
//         })
//     })
// });

// describe('Testing FoodVentures Web Page', () => {

//     // beforeEach(async () => {
//     //     server  await new Promise((resolve) => {
//     //         server = app.listen(0, 'localhost', () => {
//     //             resolve(server);
//     //         })
//     //     })
//     // });

//     it('Should display the title as "foodVentures"', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');
//         const title = await driver.getTitle();
//         expect(title.toLowerCase()).to.equal("foodventures"); // Compare in lowercase
//     });


//     it('Should have a visible "Profile" button', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');
//         const profileButton = await driver.findElement(By.linkText("Profile"));
//         const isDisplayed = await profileButton.isDisplayed();
//         expect(isDisplayed).to.equal(true);
//     });

//     it('Should have a visible "Logout" button', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');
//         const logoutButton = await driver.findElement(By.linkText("Logout"));
//         const isDisplayed = await logoutButton.isDisplayed();
//         expect(isDisplayed).to.equal(true);
//     });


//     it('Should display a table with headers', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');
//         const table = await driver.findElement(By.css("table.table"));
//         const isDisplayed = await table.isDisplayed();
//         expect(isDisplayed).to.equal(true);

//         const headers = await table.findElements(By.tagName("th"));
//         expect(headers.length).to.equal(7);
//     });

//     it('Should add a resource when "Add Resource" button is clicked', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');

//         // Find the "Add Resource" button and click it.
//         const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
//         await addResourceButton.click();

//     });
//     it('Should add a resource when "Add Resource" button is clicked', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');

//         // Find the "Add Resource" button and click it.
//         const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
//         await addResourceButton.click();

//     });
//     it('Should add a resource when "Add Resource" button is clicked', async () => {
//         await driver.get('http://localhost:5050/instrumented/home.html');

//         // Find the "Add Resource" button and click it.
//         const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
//         await addResourceButton.click();
//     });


//     // it('Should not add a resource with missing fields', async () => {
//     //     await driver.get('http://localhost:5050/instrumented/home.html');

//     //     // Find the "Add Resource" button and click it.
//     //     const addResourceButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Resource')]"));
//     //     await addResourceButton.click();

//     //     // Leave some fields empty in the resource addition form.
//     //     const name = await driver.findElement(By.id('name'));
//     //     const description = await driver.findElement(By.id('description'));
//     //     const location = await driver.findElement(By.id('location'));
//     //     const rating = await driver.findElement(By.id('rating'));

//     //     // Fill out the form fields with valid data.
//     //     await name.sendKeys('');
//     //     await description.sendKeys('');
//     //     await location.sendKeys('');
//     //     await rating.sendKeys('');

//     //     // Find and click the "Add" button to submit the resource addition form.
//     //     const addButton = await driver.findElement(By.id('addButton'));
//     //     await addButton.click();

//     //     // Check if an error message is displayed indicating that all fields are required.
//     //     await driver.wait(until.elementLocated(By.id('message')), 5000);
//     //     const message = await driver.findElement(By.id('message')).getText();

//     //     // Update the assertion method to .to.equal
//     //     expect(message).to.equal("All fields are required!");
//     // });


//     // it('Should add a resource with valid data', async () => {
//     //     try {
//     //         // Navigate to the page
//     //         await driver.get('http://localhost:5050/instrumented/home.html');

//     //         // Wait for and click the "Add Resource" button
//     //         const addResourceButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Add Resource')]")), 10000);
//     //         await addResourceButton.click();

//     //         // Wait for the Add Resource modal to be visible
//     //         const addResourceModal = await driver.findElement(By.id("resourceModal"));
//     //         await driver.wait(until.elementIsVisible(addResourceModal), 5000);

//     //         // Fill out the form
//     //         const name = await driver.findElement(By.id('name'));
//     //         const description = await driver.findElement(By.id('description'));
//     //         const location = await driver.findElement(By.id('location'));
//     //         const rating = await driver.findElement(By.id('rating'));

//     //         await name.sendKeys('Supper Deck');
//     //         await description.sendKeys('Nice Foods!');
//     //         await location.sendKeys('Tamp Hub');
//     //         await rating.sendKeys('5');


//     //         // Submit the form
//     //         const addButton = await driver.findElement(By.id('addButton'));
//     //         await addButton.click();


//     //         // Wait for and handle the success alert
//     //         // const successAlert = await driver(until.alertIsPresent());
//     //         // const successAlertText = await successAlert.getText();
//     //         // expect(successAlertText).to.include("Resource added successfully");
//     //         // console.log('Success Alert text verified');
//     //         // await successAlert.accept();
//     //         // console.log('Success Alert accepted');

//     //         // Verify that the page redirects to home.html
//     //         const currentUrl = await driver.getCurrentUrl();
//     //         expect(currentUrl).to.include('home.html');

//     //     } catch (error) {
//     //         console.error('Test failed', error);
//     //         throw error; // Rethrowing the error ensures that the test will fail properly
//     //     }
//     // });

//     it('Remove unexpected alert', async () => {
//         try {
//             await driver.get('http://localhost:5050/instrumented/home.html');

//             const successAlert = await driver.wait(until.alertIsPresent(), 5000);
//             const successAlertText = await successAlert.getText();

//             if (successAlertText.includes('Resource delete successfully')) {
//                 console.log('Dismissed unexpected success alert after deletion');
//                 await successAlert.dismiss();
//             }
//         } catch (alertError) {
//         }
//     });

//     it('Should not allow updating a resource with empty fields', async () => {
//         // Navigate to the page where the resource is listed.
//         await driver.get('http://localhost:5050/instrumented/home.html');

//         // Find an "Edit" button for a specific resource and click it to trigger the resource update.
//         const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
//         await editButton.click();

//         // Clear the fields in the edit form.
//         const editNameField = await driver.findElement(By.id('editName'));
//         await editNameField.clear();

//         // Clear other fields similarly.

//         // Find and click the "Update" button to perform the update.
//         const updateButton = await driver.findElement(By.id('updateButton'));
//         await updateButton.click();
//         // You can add assertions here to check if an error message is displayed, indicating that all fields are required.
//     });


//     it('Should open the edit modal when "Edit" button is clicked', async () => {
//         // Navigate to the page where the resource is listed.
//         await driver.get('http://localhost:5050/instrumented/home.html');

//         // Find an "Edit" button for a specific resource and click it.
//         const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
//         await editButton.click();

//         // Now, you are inside the modal. You can interact with elements within the modal here.
//         // For example, find and modify input fields, click buttons, etc.

//         // After interacting with the modal elements, you can add assertions to verify the expected behavior.
//         // For example, check if input fields are visible and if a "Save" button is present in the modal.
//         const editNameField = await driver.findElement(By.id('editName'));

//         const isEditNameFieldDisplayed = await editNameField.isDisplayed();

//         expect(isEditNameFieldDisplayed).to.equal(true);
//     });


// });

// afterEach(async function () {
//     try {
//         // Check for unexpected alerts and dismiss them
//         try {
//             const alert = await driver.switchTo().alert();
//             console.log(`Alert text: ${await alert.getText()}`);
//             await alert.dismiss();
//             console.log('Dismissed unexpected alert in "after each" hook');
//         } catch (alertError) {
//             // No unexpected alert, continue with the "after each" hook
//         }

//         // Save coverage data
//         const coverageData = await driver.executeScript('return window.__coverage__;');
//         if (coverageData) {
//             await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
//                 JSON.stringify(coverageData));
//             console.log('Coverage data written to coverage.json');
//         }
//     } catch (error) {
//         console.error('Error in "after each" hook:', error);
//     }
// });

// after(async function () {
//     await driver.quit();
//     await server.close();
//     process.exit(0);
// })