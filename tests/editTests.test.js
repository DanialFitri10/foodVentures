// const { app } = require('../index');
// const { Builder, By } = require('selenium-webdriver');
// const { describe, it, beforeEach, afterEach, after } = require('mocha');
// const { expect } = require('chai');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const fs = require('fs').promises;

// chai.use(chaiHttp);

// const driver = new Builder().forBrowser('chrome').build();
// let server;
// let resourceId;

// // Set up the server and driver before each test
// beforeEach(async () => {
//     // Start the server
//     server = await new Promise((resolve) => {
//         server = app.listen(0, 'localhost', () => {
//             resolve();
//         });
//     });

//     // Add logic to create a resource and get its ID
//     const res = await chai.request(app)
//         .post('/add-resource')
//         .send({
//             name: 'Resource to Edit',
//             description: 'A resource to edit',
//             owner: 'Test Owner',
//             rating: 3
//         });

//     resourceId = res.body.id;
// });
// describe('Editing and Updating Resources', () => {

//     it('Should open the edit modal when "Edit" button is clicked', (done) => {
//         chai.request(app)
//             .get(`/view-resource/${resourceId}`)
//             .end((err, res) => {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(404); // Assuming 404 for "Edit" button action
//                 done();
//             });
//     });

//     it('Should show error message if text field is empty - Review field cannot be empty', async function () {
//         await driver.get('http://localhost:5050/instrumented/home.html');
//         await driver.wait(until.elementLocated(By.className('restaurant')), 10000);

//         // Assuming the first restaurant in the list will be used for testing 
//         const specificRestaurant = await driver.findElement(By.className('restaurant'));
//         await specificRestaurant.click();
//         // Triggering the action to open review modal for the specific restaurant 
//         const viewReviewsButton = await specificRestaurant.findElement(By.className('view-reviews-btn'));
//         await viewReviewsButton.click();

//         // Wait to ensure review modal is opened 
//         await driver.wait(until.elementIsVisible(driver.findElement(By.id('viewReviewModal'))), 10000);

//         // Additional wait to ensure reviews are loaded 
//         await driver.wait(until.elementLocated(By.className('review')), 100000)
//         const editReviewButton = driver.findElement(By.className('edit-review-btn'));
//         await editReviewButton.click();
//         await driver.findElement(By.id('editReviewModal'));
//         const editReviewField = await driver.findElement(By.id('editReview'));
//         editReviewField.clear();
//         await driver.findElement(By.id('updateButton')).click();

//         await driver.wait(until.elementLocated(By.id('editReviewMessage')), 5000);
//         const errorMessage = await driver.findElement(By.id('editReviewMessage')).getText();
//         expect(errorMessage).to.include('Review field cannot be empty');
//         // await driver.wait(until.elementLocated(By.id('editReviewMessage')), 5000); 
//         // const errorMessage = await driver.findElement(By.id('editReviewMessage')).getText(); 
//         // expect(errorMessage).to.include('Review field cannot be empty'); 
//     });

//     it('Should open the edit modal, enter fields, and click on "Edit Resource" button', async () => {
//         try {
//             // Navigate to the page where the resource is listed.
//             await driver.get('http://localhost:5050/instrumented/home.html');

//             // Find an "Edit" button for a specific resource and click it.
//             const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
//             await editButton.click();

//             // Now, you are inside the modal. You can interact with elements within the modal here.
//             // For example, find and modify input fields, click buttons, etc.

//             // Find and interact with input fields in the modal.
//             const editName = await driver.findElement(By.id('editName'));
//             await editName.clear(); // Clear the existing value
//             await editName.sendKeys('Updated Resource Name');

//             const editLocation = await driver.findElement(By.id('editLocation'));
//             await editLocation.clear();
//             await editLocation.sendKeys('Updated resource location');

//             const editDescription = await driver.findElement(By.id('editDescription'));
//             await editDescription.clear();
//             await editDescription.sendKeys('Updated resource description');

//             const editRating = await driver.findElement(By.id('editRating'));
//             await editRating.clear();
//             await editRating.sendKeys('Updated resource rating');

//             // Similar steps for other fields...

//             // Find and click the "Edit Resource" button to perform the update.
//             const editResourceButton = await driver.findElement(By.id('editResourceBtn'));
//             await editResourceButton.click();

//             // Wait for an alert indicating the success or failure of the update.
//             const successAlert = await driver.wait(until.alertIsPresent(), 5000);
//             const successAlertText = await successAlert.getText();

//             // Verify the success message or handle the error message as needed.
//             expect(successAlertText).to.include('Resource updated successfully');

//             // Optionally, you can check if the updated information is reflected on the page.

//             // Accept the alert.
//             await successAlert.accept();
//         } catch (error) {
//             console.error('Test failed', error);
//             throw error; // Rethrowing the error ensures that the test will fail properly
//         }
//     });
// });

// afterEach(async function () {
//     try {
//         // Additional cleanup logic here

//         // Quit the WebDriver first
//         await driver.quit();

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

// // afterEach(async function () {
// //     try {
// //         // Additional cleanup logic here

// //         // Check for unexpected alerts and dismiss them
// //         try {
// //             const alert = await driver.switchTo().alert();
// //             console.log(`Alert text: ${await alert.getText()}`);
// //             await alert.dismiss();
// //             console.log('Dismissed unexpected alert in "after each" hook');
// //         } catch (alertError) {
// //             // No unexpected alert, continue with the "after each" hook
// //         }

// //         // Save coverage data
// //         const coverageData = await driver.executeScript('return window.__coverage__;');
// //         if (coverageData) {
// //             await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
// //                 JSON.stringify(coverageData));
// //             console.log('Coverage data written to coverage.json');
// //         }
// //     } catch (error) {
// //         console.error('Error in "after each" hook:', error);
// //     } finally {
// //         // Ensure that the driver.quit() is called even if there's an error
// //         await driver.quit();
// //     }
// // });


// // after(async function () {
// //     try {
// //         if (driver) {
// //             await driver.close();
// //         }
// //         // Check if server is defined before trying to close
// //         if (server) {
// //             await server.close();
// //         }

// //         // Process exit after all tests are finished
// //         process.exit(0);
// //     } catch (error) {
// //         console.error('Error in "after" hook:', error);
// //     }
// // });

const { app } = require('../index');
const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs').promises;

chai.use(chaiHttp);

let server;
let resourceId;
let counter = 0;

beforeEach(async () => {
    // Start the server
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve();
        });
    });

    // Add logic to create a resource and get its ID
    const res = await chai.request(app)
        .post('/add-resource')
        .send({
            name: 'Resource to Edit',
            description: 'A resource to edit',
            owner: 'Test Owner',
            rating: 3
        });

    resourceId = res.body.id;
});

describe('Editing and Updating Resources', () => {

    it('Should open the edit modal when "Edit" button is clicked', (done) => {
        const driver = new Builder().forBrowser('chrome').build();
        chai.request(app)
            .get(`/view-resource/${resourceId}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404); // Assuming 404 for "Edit" button action
                driver.quit().then(done);
            });
    });

    it('Should show error message if text field is empty - Review field cannot be empty', async function () {
        const driver = new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:5050/instrumented/home.html');
        const editButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Edit')]")), 10000);
        await editButton.click();
        // await driver.wait(until.elementLocated(By.className('restaurant')), 10000);

        // // Assuming the first restaurant in the list will be used for testing 
        // const specificRestaurant = await driver.findElement(By.className('restaurant'));
        // await specificRestaurant.click();
        // // Triggering the action to open the review modal for the specific restaurant 
        // const viewReviewsButton = await specificRestaurant.findElement(By.className('view-reviews-btn'));
        // await viewReviewsButton.click();

        // Wait to ensure the review modal is opened 
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('viewReviewModal'))), 10000);

        // Additional wait to ensure reviews are loaded 
        await driver.wait(until.elementLocated(By.className('review')), 100000)
        const editReviewButton = driver.findElement(By.className('edit-review-btn'));
        await editReviewButton.click();
        await driver.findElement(By.id('editReviewModal'));
        const editReviewField = await driver.findElement(By.id('editReview'));
        editReviewField.clear();
        await driver.findElement(By.id('updateButton')).click();

        await driver.wait(until.elementLocated(By.id('editReviewMessage')), 5000);
        const errorMessage = await driver.findElement(By.id('editReviewMessage')).getText();
        expect(errorMessage).to.include('Review field cannot be empty');
        await driver.quit();
    });

    it('Should open the edit modal, enter fields, and click on "Edit Resource" button', async function () {
        const driver = new Builder().forBrowser('chrome').build();
        try {
            // Navigate to the page where the resource is listed.
            await driver.get('http://localhost:5050/instrumented/home.html');

            // Wait for the "Edit" button to be present.
            const editButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Edit')]")), 10000);
            await editButton.click();

            // Now, you are inside the modal. You can interact with elements within the modal here.
            // For example, find and modify input fields, click buttons, etc.

            // Find and interact with input fields in the modal.
            const editName = await driver.findElement(By.id('editName'));
            await editName.clear(); // Clear the existing value
            await editName.sendKeys('Updated Resource Name');

            const editLocation = await driver.findElement(By.id('editLocation'));
            await editLocation.clear();
            await editLocation.sendKeys('Updated resource location');

            const editDescription = await driver.findElement(By.id('editDescription'));
            await editDescription.clear();
            await editDescription.sendKeys('Updated resource description');

            const editRating = await driver.findElement(By.id('editRating'));
            await editRating.clear();
            await editRating.sendKeys('Updated resource rating');

            // Similar steps for other fields...

            // Find and click the "Edit Resource" button to perform the update.
            const editResourceButton = await driver.findElement(By.id('editResourceBtn'));
            await editResourceButton.click();

            // Wait for an alert indicating the success or failure of the update.
            const successAlert = await driver.wait(until.alertIsPresent(), 5000);
            const successAlertText = await successAlert.getText();

            // Verify the success message or handle the error message as needed.
            expect(successAlertText).to.include('Resource updated successfully');

            // Optionally, you can check if the updated information is reflected on the page.

            // Accept the alert.
            await successAlert.accept();
        } catch (error) {
            console.error('Test failed', error);
            throw error; // Rethrowing the error ensures that the test will fail properly
        } finally {
            await driver.quit();
        }
    });


    // it('Should open the edit modal, enter fields, and click on "Edit Resource" button', async () => {
    //     const driver = new Builder().forBrowser('chrome').build();
    //     try {
    //         // Navigate to the page where the resource is listed.
    //         await driver.get('http://localhost:5050/instrumented/home.html');

    //         // Find an "Edit" button for a specific resource and click it.
    //         const editButton = await driver.findElement(By.xpath("//button[contains(text(),'Edit')]"));
    //         await editButton.click();

    //         // Now, you are inside the modal. You can interact with elements within the modal here.
    //         // For example, find and modify input fields, click buttons, etc.

    //         // Find and interact with input fields in the modal.
    //         const editName = await driver.findElement(By.id('editName'));
    //         await editName.clear(); // Clear the existing value
    //         await editName.sendKeys('Updated Resource Name');

    //         const editLocation = await driver.findElement(By.id('editLocation'));
    //         await editLocation.clear();
    //         await editLocation.sendKeys('Updated resource location');

    //         const editDescription = await driver.findElement(By.id('editDescription'));
    //         await editDescription.clear();
    //         await editDescription.sendKeys('Updated resource description');

    //         const editRating = await driver.findElement(By.id('editRating'));
    //         await editRating.clear();
    //         await editRating.sendKeys('Updated resource rating');

    //         // Similar steps for other fields...

    //         // Find and click the "Edit Resource" button to perform the update.
    //         const editResourceButton = await driver.findElement(By.id('editResourceBtn'));
    //         await editResourceButton.click();

    //         // Wait for an alert indicating the success or failure of the update.
    //         const successAlert = await driver.wait(until.alertIsPresent(), 5000);
    //         const successAlertText = await successAlert.getText();

    //         // Verify the success message or handle the error message as needed.
    //         expect(successAlertText).to.include('Resource updated successfully');

    //         // Optionally, you can check if the updated information is reflected on the page.

    //         // Accept the alert.
    //         await successAlert.accept();
    //     } catch (error) {
    //         console.error('Test failed', error);
    //         throw error; // Rethrowing the error ensures that the test will fail properly
    //     } finally {
    //         await driver.quit();
    //     }
    // });
});

afterEach(async function () {
    try {
        // Additional cleanup logic here

        // Check for unexpected alerts and dismiss them
        const driver = new Builder().forBrowser('chrome').build();
        try {
            const alert = await driver.switchTo().alert();
            console.log(`Alert text: ${await alert.getText()}`);
            await alert.dismiss();
            console.log('Dismissed unexpected alert in "after each" hook');
        } catch (alertError) {
            // No unexpected alert, continue with the "after each" hook
        } finally {
            await driver.quit();
        }

        // Save coverage data
        const coverageData = await driver.executeScript('return window.__coverage__;');
        if (coverageData) {
            await fs.writeFile(`coverage-frontend/coverage${counter++}.json`,
                JSON.stringify(coverageData));
            console.log('Coverage data written to coverage.json');
        }
    } catch (error) {
        console.error('Error in "after each" hook:', error);
    }
});
