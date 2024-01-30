const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../index'); // Assuming your server setup is in the 'index.js' file
const fs = require('fs').promises;

chai.use(chaiHttp);

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
                expect(res).to.have.status(200); // Assuming 200 status for successful update
                expect(res.body.message).to.equal('Resource updated successfully');
                done();
            });
    });

    it('Should fail to update a resource with invalid data', (done) => {
        chai.request(app)
            .put(`/edit-resource/${resourceIdToUpdate}`)
            .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: -1 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400); // Assuming 400 status for invalid data
                expect(res.body.message).to.equal('Invalid data for resource update');
                done();
            });
    });

    it('Should fail to update a non-existent resource', (done) => {
        chai.request(app)
            .put('/edit-resource/nonexistentResourceID')
            .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404); // Assuming 404 status for non-existent resource
                expect(res.body.message).to.equal('Resource not found');
                done();
            });
    });

    it('Should fail to update a resource with missing fields', (done) => {
        chai.request(app)
            .put(`/edit-resource/${resourceIdToUpdate}`)
            .send({ description: 'An updated resource', rating: 5 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400); // Assuming 400 status for missing fields
                expect(res.body.message).to.equal('Missing fields for resource update');
                done();
            });
    });

    it('Should fail to update a resource with non-positive rating', (done) => {
        chai.request(app)
            .put(`/edit-resource/${resourceIdToUpdate}`)
            .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 0 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400); // Assuming 400 status for non-positive rating
                expect(res.body.message).to.equal('Rating must be a positive number');
                done();
            });
    });

    it('Should fail to update a resource with a very long description', (done) => {
        const longDescription = 'a'.repeat(1001); // Assuming a limit of 1000 characters for description
        chai.request(app)
            .put(`/edit-resource/${resourceIdToUpdate}`)
            .send({ name: 'Updated Resource', description: longDescription, owner: 'New Owner', rating: 5 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400); // Assuming 400 status for very long description
                expect(res.body.message).to.equal('Description exceeds the maximum length');
                done();
            });
    });

    it('Should fail to update a resource without authentication', (done) => {
        chai.request(app)
            .put(`/edit-resource/${resourceIdToUpdate}`)
            .send({ name: 'Updated Resource', description: 'An updated resource', owner: 'New Owner', rating: 5 })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(401); // Assuming 401 status for unauthorized access
                expect(res.body.message).to.equal('Authentication required');
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
                expect(res).to.have.status(403); // Assuming 403 status for forbidden access
                expect(res.body.message).to.equal('Insufficient privileges to update resource');
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
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('Resource updated successfully');
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
                expect(res).to.have.status(503);
                expect(res.body.message).to.equal('Service temporarily unavailable due to maintenance');
                done();
            });
    });
        
});
