(function() {
    var socket = new WebSocket("ws://127.0.0.1:9000/");

    socket.onopen = function(event) {
        socket.send("Hello World!");
    };

    socket.onclose = function() {
        console.error("Connection closed");
    };

    socket.onmessage = function(event) {
        alert(event.data);
    };

    socket.onerror = function(event) {
        console.log(event);
    }

})();