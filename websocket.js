var io = require('socket.io')(12345);

io.on('connection', function (socket) {
    console.log('A socket has connected');

    socket.on('ping', function (data) {
        console.log('Intercepted event: ping');
        console.log('Data is: ');
        console.dir(data);

        socket.emit('pong', data);
    });

    socket.on('broadcast', function (data) {
        console.log('Intercepted event: broadcast');
        console.log('Data is: ');
        console.dir(data);
        socket.broadcast.emit('message', data);
    });

    socket.on('all', function (data) {
        console.log('Intercepted event: all');
        console.log('Data is: ');
        console.dir(data);
        io.sockets.emit('message', data);
    });

    socket.on('disconnect', function () {
        console.log('SOCKET DISCONNECTED');
    });
});