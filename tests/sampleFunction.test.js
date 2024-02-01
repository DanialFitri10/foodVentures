const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addResource } = require('../utils/ResourceUtil');
const { register } = require('../utils/UserUtil');
const { User } = require('../models/User');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { app } = require('../index');
const chrome = require('selenium-webdriver/chrome');
const exp = require('constants');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');

const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;

var counter = 0;

before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});


describe('User Registration Tests', () => {
    const testUsers = [
        new User('fitri@gmail', '123456'),
        new User('another@test.com', 'letmein'),
    ];

    // Test successful registration
    it('Successful Registration Test Message', async () => {
        const req = {
            body: {
                email: 'fitri@gmail',
                password: 'newpassword',
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Your registration logic here, e.g., calling the registration function
        // and checking if the user is successfully registered.
        // You can use testUsers array to check if the new user is added to your system.

    });

    // Test unsuccessful registration
    it('Unsuccessful Registration Test Message', async () => {
        const req = {
            body: {
                email: 'danskaters@gmail.com', // Use an existing email to simulate a duplicate registration
                password: '123456',
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Your registration logic here, e.g., calling the registration function
        // and checking if the registration fails due to duplicate email or other reasons.

    });
});

describe('Add Resource Tests', () => {
    const testResources = [
        // Define test resources as needed
    ];

    beforeEach(() => {
        // Reset or prepare any necessary state before each test
    });

    // Test successful resource addition
    it('Successful Add Resource Test', async () => {
        const req = {
            body: {
                name: 'Test Resource',
                location: 'Test Location',
                description: 'Test Description',
                rating: 5,
                owner: 'Test Owner',
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Call the addResource function
        const result = await addResource(req, res);

        // Assert that the resource addition was successful
        expect(result.code).to.equal(201);
        expect(result.data).to.be.an('array'); // Adjust this based on your actual response structure

        // You can further check if the new resource is added to your system, e.g., by querying the database or checking an in-memory array
    });

    // Test unsuccessful resource addition
    it('Unsuccessful Add Resource Empty Test', async () => {
        const req = {
            body: {
                name: '',
                location: 'Test Location',
                description: 'Test Description',
                rating: 5,
                owner: 'Test Owner',
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Call the addResource function
        const result = await addResource(req, res);

        // Assert that the resource addition failed
        expect(result.code).to.equal(400);
        expect(result.data.message).to.equal('Invalid data. Resource addition failed.');

        // You can further check if the new resource is not added to your system
    });
    describe('Testing login ui Web Page', () => {
        // var driver;

        // beforeEach(async () => {
        //     driver = await new Builder().forBrowser('chrome').build();
        // });

        // afterEach(async () => {
        //     await driver.quit();
        // });


        it('Should have a visible email input field', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const emailField = await driver.findElement(By.id("email"));
            const isDisplayed = await emailField.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });

        it('Should have a visible password input field', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const passwordField = await driver.findElement(By.id("password"));
            const isDisplayed = await passwordField.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });
        it('Should have a visible "Login" button', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(),'Login')]"));
            const isDisplayed = await loginButton.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });
        it('Should have a visible "Forget Password" button', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const forgetPasswordButton = await driver.findElement(By.xpath("//button[contains(text(),'Forget Password')]"));
            const isDisplayed = await forgetPasswordButton.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });
        it('Should have a visible "New user? Register here" link', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const registerLink = await driver.findElement(By.linkText("New user? Register here"));
            const isDisplayed = await registerLink.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });

        it('Should navigate to the registration page when "New user? Register here" link is clicked', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);
            const registerLink = await driver.findElement(By.linkText("New user? Register here"));
            await registerLink.click();
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.include("register.html");
        });

        it('Should display an error message for invalid login credentials', async () => {
            const baseUrl = 'http://localhost:' + server.address().port + '/instrumented' + '/index.html';
            await driver.get(baseUrl);


            // Enter invalid login credentials (you may need to adjust based on your validation logic).
            await driver.findElement(By.id("email")).sendKeys("invalid@example.com");
            await driver.findElement(By.id("password")).sendKeys("invalidPassword");

            // Click the login button.
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(),'Login')]"));
            await loginButton.click();

            // Check for the presence of the error message.
            const errorMessage = await driver.findElement(By.id("error"));
            const isDisplayed = await errorMessage.isDisplayed();
            expect(isDisplayed).to.equal(true);
        });

    });
});
afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
            await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
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

});