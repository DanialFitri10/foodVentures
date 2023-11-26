const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addResource } = require('../utils/ResourceUtil');
const { register } = require('../utils/UserUtil');
const { User } = require('../models/User');

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
});