var repl = require('repl'),
    net = require('net');

module.exports = net.createServer(function (socket) {
    console.log('Server started');
    var r = repl.start({
        prompt: ['[', process.pid, '] - ', socket.remoteAddress, ':', socket.remotePort, ' > '].join(''),
        input: socket,
        output: socket
    }).on('exit', function () {
        socket.end();
    });
}).listen(1337, function () {
    console.log('TCP Server listening on 1337');
});