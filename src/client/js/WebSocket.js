var userId;
var clients = [];

var refreshClientsList = function(updatedClients) {
    clients = updatedClients;

    $('#chatbox select').empty();
    for(var userId in updatedClients) {
        $('#chatbox select').append("<option value='" + userId + "'>" + updatedClients[userId].username + "</option>");
    }
};

var connect = function(username) {
    var socket = new WebSocket("ws://192.168.1.9:9000/");

    socket.onopen = function(event) {
        socket.send(JSON.stringify({type: constants.CONNECT, username: username}));
    };

    socket.onclose = function() {
        alert("You were disconnected from the server");
    };

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);

        switch(data.type)
        {
            case constants.CLIENT_LIST:
                refreshClientsList(data.body);
                break;
            case constants.USER_ID:
                userId = data.body;
                break;
            case constants.MESSAGE:
                alert(data.body.username + ": " + data.body.message);
                break;
        }
    };

    socket.onerror = function(event) {
        console.log(event);
    };

    window.onbeforeunload = function() {
        socket.onclose = function () {};
        socket.close()
    };

    $("#send-message").click(function(e) {
        console.log("Form submitted");
        e.preventDefault();

        var targetUserId = $("#chatbox").find('select :selected').val();

        console.log(targetUserId);

        var message = $("#message").val();

        var obj = {
            type: constants.MESSAGE,
            target: targetUserId,
            userId: userId,
            message: message
        };

        socket.send(JSON.stringify(obj));
    })
};

(function() {
    var username = prompt("Username", "");

    connect(username);
})();
