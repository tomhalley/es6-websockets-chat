var WebSocketServer = require("ws").Server,
    ws = new WebSocketServer({port: 9000});

ws.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});