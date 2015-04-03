var userId;
var clients = [];

var refreshClientsList = function(updatedClients) {
    clients = updatedClients;
    console.log(clients);

    $('#chatbox select').empty();
    console.log(updatedClients);
    for(var userId in updatedClients) {
        $('#chatbox select').append("<option value='" + userId + "'>" + updatedClients[userId].username + "</option>");
    }
};

var connect = function(username) {
    var socket = new WebSocket("ws://192.168.1.9:8000/");

    socket.onopen = function(event) {
        socket.send(JSON.stringify({type: "CONNECT", username: username}));
    };

    socket.onclose = function() {
        alert("Connection lost");
    };

    socket.onmessage = function(event) {
        console.log(event.data);
        var data = JSON.parse(event.data);

        switch(data.type)
        {
            case "CLIENT_LIST":
                refreshClientsList(data.body);
                break;
            case "USER_ID":
                userId = data.body;
                break;
            case "MESSAGE":
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

    $(document).on('dblclick', 'option', function() {
        var targetUserId = $(this).val();
        console.log(userId);

        var message = prompt("Message", "");

        var obj = {
            type: "MESSAGE",
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
