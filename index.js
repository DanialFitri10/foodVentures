var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import the necessary middleware or route handlers
const { register, login } = require('./utils/UserUtil');
const { addResource, viewResources, editResource, deleteResource } = require('./utils/ResourceUtil');

// Register routes
app.post('/register', register);
app.post('/login', login);
app.post('/add-resource', addResource);
app.get('/view-resources', viewResources);
app.put('/edit-resource/:id', editResource);
app.delete('/delete-resource/:id', deleteResource);

// Static files
app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

app.listen(PORT, function () {
    console.log(`App is running at: http://localhost:${PORT}`);
});
