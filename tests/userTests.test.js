const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { register, login } = require('../utils/UserUtil');

describe('Testing Register Function', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = [];

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should register a new user successfully', async () => {
        const req = {
            body: {
                email: 'mary@gmail.com',
                password: '123456',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].email).to.equal(req.body.email);
                expect(data[orgContent.length].password).to.equal(req.body.password);
            },
        };

        await register(req, res);
    });

    it('Should show a validation error due to an invalid email format', async () => {
        const req = {
            body: {
                email: 'simon#gmail.com',
                password: '123456',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Validation error');
            },
        };

        await register(req, res);
    });

    it('Should show a validation error due to a password length less than 6', async () => {
        const req = {
            body: {
                email: 'simon@gmail.com',
                password: '123',
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Validation error');
            },
        };

        await register(req, res);
    });


    
});

describe('Testing Login Function', () => {
    let orgContent = [];

    beforeEach(async () => {
        try {
            const usersFilePath = 'utils/users.json';
            const usersData = await fs.readFile(usersFilePath, 'utf8');
            orgContent = JSON.parse(usersData);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    });

    it('Should login successfully', async () => {
        const req = {
            body: {
                email: orgContent[0].email,
                password: orgContent[0].password,
            },
        };

        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Login successful!');
            },
        };

        await login(req, res);
    });


    it('Should show an error if there are no registered users in the JSON file', async () => {
        // Clear the orgContent array or use a JSON file with no users
        const req = {
            body: {
                email: 'nonexistent@example.com',
                password: 'incorrectpassword',
            },
        };
    
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('No registered users found'); // Updated the error message
            },
        };
    
        await login(req, res);
    });
    
});
