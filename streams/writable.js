var util = require('util'),
    stream = require('stream'),
    Writable = stream.Writable,
    fs = require('fs'),
    MyReadableStream = require('./readable');

function MyWritableStream (cfg) {
    Writable.call(this, cfg);

    this._file = cfg.file;
}

util.inherits(MyWritableStream, Writable);

MyWritableStream.prototype._write = function (chunk, encoding, callback) {
    fs.appendFile(this._file, chunk + '\n', callback);
};

module.exports = MyWritableStream;

if (require.main == module) {
    var ws = new MyWritableStream({file: 'tasks/data/writeable.text'}),
        rs = new MyReadableStream({src: "Reading some data from a long string like this one, a static inline string, 5 byte per time"});

    rs.pipe(ws);

    ws.on('pipe', function (src) {
        console.log('Someone is piping something here!');
    });

    ws.on('finish', function () {
        console.log('Finished writing!');
    });
}