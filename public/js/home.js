function addResource() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.location = document.getElementById("location").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.description = document.getElementById("rating").value;

    jsonData.owner = sessionStorage.getItem("email");
    if (jsonData.name == "" || jsonData.location == "" || jsonData.description == "" || jsonData.rating == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Resource: ' +
                jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            document.getElementById("description").value = "";
            document.getElementById("rating").value = "";

            window.location.href = 'home.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add resource!'; document.getElementById("message").setAttribute("class", "text-danger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}
function viewResources() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-resources', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = ''
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + response[i].name + '</td>' +
                '<td>' + response[i].location + '</td>' +
                '<td>' + response[i].description + '</td>' +
                '<td>' + response[i].rating + '</td>' +
                '<td>' + response[i].owner + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-warning" onclick="editResource(\'' +
                JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit </button> ' +
                '<button type="button" class="btn btn-danger" onclick="deleteResource(' +
                response[i].id + ')"> Delete</button>' +
                '</td>' +
                '</tr>'
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}