const { readJSON, writeJSON } = require('./UserUtil')
const { Resource } = require('../models/Resource');
const fs = require('fs').promises;

async function addResource(req, res) {
    try {
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const rating = req.body.rating;
        const owner = req.body.owner;

        // Validate the data
        if (!name || !location || !description || !rating || !owner) {
            return res.status(400).json({ message: 'Invalid data. Resource addition failed.' });
        }

        // Create a new resource
        const newResource = new Resource(name, location, description, rating, owner);

        // Update the resources in the JSON file or database (assuming writeJSON works as expected)
        const updatedResources = await writeJSON(newResource, 'utils/resources.json');

        // Return the successful response
        return res.status(201).json(updatedResources);
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ message: error.message });
    }
}

async function viewResources(req, res) {
    try {
        const allResources = await readJSON('utils/resources.json');
        return res.status(201).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function editResource(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const rating = req.body.rating;
        const allResources = await readJSON('utils/resources.json');
        var modified = false;
        for (var i = 0; i < allResources.length; i++) {
            var curcurrResource = allResources[i];
            if (curcurrResource.id == id) {
                allResources[i].name = name;
                allResources[i].location = location;
                allResources[i].description = description;
                allResources[i].rating = rating;

                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/resources.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Resource modified successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function deleteResource(req, res) {
    try {
        const id = req.params.id;
        const allResources = await readJSON('utils/resources.json');
        var index = -1;
        for (var i = 0; i < allResources.length; i++) {
            var curcurrResource = allResources[i];
            if (curcurrResource.id == id)
                index = i;
        }
        if (index != -1) {
            allResources.splice(index, 1);
            await fs.writeFile('utils/resources.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Resource deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function addResourceAndGetId() {
    const res = await chai.request(app)
        .post('/add-resource')
        .send({
            name: 'Test Resource',
            location: 'Test Location',
            description: 'Test Description',
            rating: 'Test Owner',
            owner: 5
        });

    // Assuming the server responds with the added resource
    const addedResource = res.body;

    // Return the ID of the added resource
    return addedResource.id;
}

module.exports = {
    viewResources, addResource, editResource, deleteResource, addResourceAndGetId
}