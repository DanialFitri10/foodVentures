const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addResource } = require('../utils/ResourceUtil')
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



