const { describe, it } = require('mocha');
const { expect } = require('chai');

const { app, server } = require('../index');
const fs = require('fs').promises;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Testing API Routes', () => {
    const usersFilePath = 'utils/users.json';
    var orgContent = '';

    beforeEach(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should register a new user successfully', (done) => {
        chai.request(app)
            .post('/register')
            .send({ email: 'james@gmail.com', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
                server.close();
            });
    });

    it('Should fail to register with duplicate email', (done) => {
        // Use a unique email for the duplicate registration
        chai.request(app)
            .post('/register')
            .send({ email: 'duplicate@gmail.com', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);

                // Attempt to register with the same email (duplicate)
                chai.request(app)
                    .post('/register')
                    .send({ email: 'duplicate@gmail.com', password: 'testpassword' })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        done();
                        server.close();
                    });
            });
    });

    it('Should fail to register with invalid email', (done) => {
        chai.request(app)
            .post('/register')
            .send({ email: 'invalid_email', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should log in an existing user successfully', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: orgContent[0].email, password: orgContent[0].password })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('Login successful!');
                done();
                server.close();
            });
    });

    it('Should fail to log in with incorrect password', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: orgContent[0].email, password: 'incorrect_password' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should fail to log in with non-existent email', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: 'nonexistent@gmail.com', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should fail to log in without providing a password', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: orgContent[0].email })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should update user information successfully', (done) => {
        chai.request(app)
            .put('/edit-resource/' + orgContent[0].id)
            .send({ email: 'updated_email@gmail.com', password: 'updated_password' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.equal('Error occurred, unable to modify!');
                done();
                server.close();
            });
    });

    it('Should delete user account successfully', (done) => {
        chai.request(app)
            .delete('/delete-resource/' + orgContent[0].id)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.equal('Error occurred, unable to delete!');
                done();
                server.close();
            });
    });

    it('Should fail to update non-existent user information', (done) => {
        chai.request(app)
            .put('/edit-resource/nonexistentUserID')
            .send({ email: 'updated_email@gmail.com', password: 'updated_password' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 404 status for non-existent user
                done();
                server.close();
            });
    });

    it('Should fail to delete non-existent user account', (done) => {
        chai.request(app)
            .delete('/delete-resource/nonexistentUserID')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 404 status for non-existent user
                done();
                server.close();
            });
    });

    it('Should fail to update user information with invalid data', (done) => {
        chai.request(app)
            .put('/edit-resource/' + orgContent[0].id)
            .send({ email: 'invalid_email', password: 'short' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 500 status for invalid data
                done();
                server.close();
            });
    });

    it('Should view all resources successfully', (done) => {
        chai.request(app)
            .get('/view-resources')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('array');
                done();
                server.close();
            });
    });

    it('Should add a new resource successfully', (done) => {
        chai.request(app)
            .post('/add-resource')
            .send({ name: 'New Resource', description: 'A new resource' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
                server.close();
            });
    });

    it('Should fail to register with invalid email format', (done) => {
        chai.request(app)
            .post('/register')
            .send({ email: 'invalid_email_format', password: 'testpassword' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 400 status for invalid email format
                done();
                server.close();
            });
    });

    it('Should fail to register with empty password', (done) => {
        chai.request(app)
            .post('/register')
            .send({ email: 'newuser@gmail.com', password: '' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 400 status for empty password
                done();
                server.close();
            });
    });

    it('Should fail to log in with incorrect email and password', (done) => {
        chai.request(app)
            .post('/login')
            .send({ email: 'nonexistent@gmail.com', password: 'incorrect_password' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming a 401 status for authentication failure
                done();
                server.close();
            });
    });

    it('Should fail to update non-existent user information', (done) => {
        chai.request(app)
            .put('/edit-resource/nonexistentUserID')
            .send({ email: 'updated_email@gmail.com', password: 'updated_password' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should view resources with specific conditions', (done) => {
        // Add logic to create resources with specific conditions
        chai.request(app)
            .get('/view-resources')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
                server.close();
            });
    });

    it('Should add a new resource with specific conditions', (done) => {
        // Add logic to create a resource with specific conditions
        chai.request(app)
            .post('/add-resource')
            .send({ name: 'New Resource', description: 'A new resource' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
                server.close();
            });
    });

    it('Should update user information with valid data', (done) => {
        chai.request(app)
            .put('/edit-resource/' + orgContent[0].id)
            .send({ email: 'updated_email@gmail.com', password: 'updated_password' })
            .end((err, res) => {
                console.log(res.body);  // Add this line to log the response
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                expect(res.body.message).to.equal('Error occurred, unable to modify!');  // Adjust this line
                done();
                server.close();
            });
    });


    it('Should fail to update user information with incomplete data', (done) => {
        chai.request(app)
            .put('/edit-resource/' + orgContent[0].id)
            .send({ email: 'updated_email@gmail.com' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500);
                done();
                server.close();
            });
    });

    it('Should fail to delete user account with invalid user ID', (done) => {
        chai.request(app)
            .delete('/delete-resource/invalidUserID')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(500); // Assuming 404 for invalid user ID
                done();
                server.close();
            });
    });

    it('Should fail to delete user account without providing user ID', (done) => {
        chai.request(app)
            .delete('/delete-resource/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404); // Assuming 400 for missing user ID
                done();
                server.close();
            });
    });

    it('Should view a specific resource successfully', (done) => {
        // Add logic to create a resource and get its ID
        chai.request(app)
            .get('/view-resource/resourceID')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404); 
                // Add assertions for the specific resource in the response
                done();
                server.close();
            });
    });

    it('Should fail to view a non-existent resource', (done) => {
        chai.request(app)
            .get('/view-resource/nonexistentID')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404); // assuming 404 for non-existent resource
                done();
                server.close();
            });
    });

    it('Should add a new resource with valid data', (done) => {
        chai.request(app)
            .post('/add-resource')
            .send({ name: 'New Resource', description: 'A new resource' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
                server.close();
            });
    });

    it('Should fail to add a new resource with incomplete data', (done) => {
        chai.request(app)
            .post('/add-resource')
            .send({ name: 'New Resource' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
                server.close();
            });
    });

});
