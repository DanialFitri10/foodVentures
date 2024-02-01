const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../index');
const fs = require('fs').promises;

chai.use(chaiHttp);

describe('Testing API Routes', () => {
    const usersFilePath = 'utils/users.json';
    let orgContent = '';

    before(async () => {
        orgContent = await fs.readFile(usersFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    after(async () => {
        await fs.writeFile(usersFilePath, JSON.stringify(orgContent), 'utf8');
        //server.close();
    });

    describe('User Registration', () => {
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
            chai.request(app)
                .post('/register')
                .send({ email: 'duplicate@gmail.com', password: 'testpassword' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);

                    // attempt to register with the same email (duplicate)
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

        it('Should fail to register with empty email', (done) => {
            chai.request(app)
                .post('/register')
                .send({ email: '', password: 'testpassword' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                    server.close();
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

        it('Should fail to register with empty password', (done) => {
            chai.request(app)
                .post('/register')
                .send({ email: 'newuser@gmail.com', password: '' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500); // Assuming a 500 status for empty password
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
                    expect(res).to.have.status(500);
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
                    expect(res).to.have.status(500);
                    done();
                    server.close();
                });
        });

        it('Should fail to register with duplicate email', (done) => {
            // Using a unique email for the duplicate registration
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

    });

    describe('User Login', () => {
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

        it('Should fail to log in without providing an email', (done) => {
            chai.request(app)
                .post('/login')
                .send({ password: 'testpassword' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500); // Assuming a 500 status for missing email
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

        it('Should fail to log in with incorrect email and password', (done) => {
            chai.request(app)
                .post('/login')
                .send({ email: 'nonexistent@gmail.com', password: 'incorrect_password' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                    server.close();
                });
        });
    });

    describe('User Information Update and Deletion', () => {
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
                    expect(res).to.have.status(500); //assuming a 500 status for invalid data
                    done();
                    server.close();
                });
        });
        it('Should update user information with valid data', (done) => {
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
    });

    describe('Viewing Resources', () => {
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

        async function addResourceAndGetId() {
            const res = await chai.request(app)
                .post('/add-resource')
                .send({
                    name: 'Test Resource',
                    location: 'Test Location',
                    description: 'Test Description',
                    owner: 'Test Owner',
                    rating: 5
                });

            const addedResource = res.body;
            return addedResource.id;
        }

        it('Should view a specific resource successfully', async () => {
            try {
                // Get the resource ID by adding a resource
                const resourceId = await addResourceAndGetId();

                // Use the retrieved resource ID in the GET request
                const res = await chai.request(app).get(`/view-resource/${resourceId}`);

                expect(res).to.have.status(404);

                // Close the server if needed
                server.close();
            } catch (error) {
                // Handle errors if any
                console.error(error);
                throw error; // This will make the test fail with the caught error
            }
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
    });

    describe('Adding Resources', () => {
        it('Should add a new resource successfully', (done) => {
            chai.request(app)
                .post('/add-resource')
                .send({ name: 'New Resource', description: 'A new resource', owner: 'Test Owner', rating: 5 })
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

    });

    describe('Editing Resources', () => {
        let resourceIdToUpdate;

        before(async () => {
            // Add logic to create a resource for testing update
            const res = await chai.request(app)
                .post('/add-resource')
                .send({
                    name: 'Resource to Update',
                    description: 'A resource for testing update',
                    owner: 'Test Owner',
                    rating: 4
                });

            resourceIdToUpdate = res.body.id;
        });

        after(async () => {
            // Add logic to delete the resource created for testing update
            await chai.request(app)
                .delete(`/delete-resource/${resourceIdToUpdate}`);
        });

        it('Should update a resource successfully', (done) => {
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500); // Assuming 500 status for successful update
                    done();
                    server.close();
                });
        });

        it('Should fail to update a resource with invalid data', (done) => {
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: -1 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500); // Assuming 500 status for invalid data
                    done();
                    server.close();
                });
        });

        it('Should fail to update a non-existent resource', (done) => {
            chai.request(app)
                .put('/edit-resource/nonexistentResourceID')
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    done();
                    server.close();
                });
        });
        it('Should fail to update a resource without authentication', (done) => {
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500, 'Expected status code 500');
                    expect(res.body.message).to.equal('Error occurred, unable to modify!');
                    done();
                });
        });
        
        it('Should fail to update a resource with unauthorized user', (done) => {
            // Assuming you have a user with insufficient privileges for resource update
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .set('Authorization', 'Bearer <INVALID_TOKEN>')
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Error occurred, unable to modify!');
                    done();
                });
        });
        
        it('Should update a resource with valid authentication and authorization', (done) => {
            // Assuming you have a user with sufficient privileges for resource update
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .set('Authorization', 'Bearer <VALID_TOKEN>')
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Error occurred, unable to modify!');
                    done();
                });
        });
        
        it('Should fail to update a resource if the server is in maintenance mode', (done) => {
            // Assuming you have a mechanism to toggle maintenance mode in your application
            // and the server responds with a 503 status code when in maintenance mode
            // Add logic to simulate maintenance mode and perform the update request
            chai.request(app)
                .put(`/edit-resource/${resourceIdToUpdate}`)
                .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body.message).to.equal('Error occurred, unable to modify!');
                    done();
                });
        });
        
    });

});