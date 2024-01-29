const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addResource } = require('../utils/ResourceUtil');
const { register, login } = require('../utils/UserUtil');
const { User } = require('../models/User');

describe('User Registration Tests', () => {
    const testUsers = [
        new User('fitri@gmail', '123456'),
        new User('another@test.com', 'letmein'),
    ];

    beforeEach(() => {
        // Reset or prepare any necessary state before each test
    });

    afterEach(async () => {
        // Clean up any changes made during the tests
        // You may want to remove any newly registered users from your system or database
    });

    // Test successful registration
    it('Successful Registration Test', async () => {
        const req = {
            body: {
                email: 'newuser@test.com',
                password: 'newpassword',
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Call the register function
        const result = await register(req, res);

        // Assert that the registration was successful
        expect(result.code).to.equal(201);
        expect(result.data).to.be.an('array'); // Adjust this based on your actual response structure

        // You can further check if the new user is added to your system, e.g., by querying the database or checking an in-memory array
    });


    // Test unsuccessful registration (invalid data)
    it('Unsuccessful Registration Invalid Data Test', async () => {
        const req = {
            body: {
                email: 'invalid-email', // Use an invalid email format
                password: '123', // Use a password with less than 6 characters
            },
        };
        const res = {
            status: (code) => ({ json: (data) => ({ code, data }) }),
        };

        // Call the register function
        const result = await register(req, res);

        // Assert that the registration fails due to invalid data
        expect(result.code).to.equal(500);
        expect(result.data.message).to.equal('Validation error'); // Corrected message

        // You can further check if the new user is not added to your system
    });
});

describe('Add Resource Tests', () => {
    const testResources = [
        // Define test resources as needed
    ];

    beforeEach(() => {
        // Reset or prepare any necessary state before each test
    });

    afterEach(async () => {
        // Clean up any changes made during the tests
        // You may want to remove any newly added resources from your system or database
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

    // Test unsuccessful resource addition (invalid data)
    it('Unsuccessful Add Resource Invalid Data Test', async () => {
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

        // Assert that the resource addition fails due to invalid data
        expect(result.code).to.equal(400);
        expect(result.data.message).to.equal('Invalid data. Resource addition failed.'); // Corrected message

        // You can further check if the new resource is not added to your system
    });
});
