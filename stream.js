var stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    Duplex = stream.Duplex,
    Transform = stream.Transform,
    util = require('util'),
    fs = require('fs'),
    readableStreamCounter = 0;

function ReadableStream (cfg) {
    Readable.call(this, cfg);

    this._data = cfg.data || {};
}

util.inherits(ReadableStream, Readable);

ReadableStream.prototype._read = function (chunkSize) {
    chunkSize = 50;

    var self = this;

    if (readableStreamCounter < self._data.length) {
        if ((self._data.length - readableStreamCounter) < chunkSize) {
            self.push(self._data.slice(readableStreamCounter, (self._data.length - readableStreamCounter)));
            readableStreamCounter += (self._data.length - readableStreamCounter);
        }
        else {
            self.push(self._data.slice(readableStreamCounter, readableStreamCounter + chunkSize));
            readableStreamCounter += chunkSize;
        }
    }
    else {
        self.push();
    }
};

function WritebleStream (cfg) {
    Writable.call(this, cfg);

    this._file = cfg.file;
}

util.inherits(WritebleStream, Writable);

WritebleStream.prototype._write = function (chunk, encoding, callback) {
    console.log(typeof chunk);

    fs.writeFile(this._file, chunk, callback);
};

function DuplexStream (cfg) {
    Duplex.call(this, cfg);
}

util.inherits(DuplexStream, Duplex);

function TransformStream (cfg) {
    Transform.call(this, cfg);
}

util.inherits(TransformStream, Transform);

fs.readFile('data/readable.text', {encoding: 'utf8'}, function (err, file) {
    if (err) throw err;

    var rs = new ReadableStream({
        data: file,
        encoding: 'utf8'
    });

    var readData = '';

    rs.on('data', function (chunk) {
        console.log('');
        console.log('Read a chunk of data');
        console.log(chunk);
        console.log('');
        readData += chunk;
    });

    rs.on('end', function () {
        console.log('');
        console.log('ReadableStream: read ' + readData.length + ' bytes of data from readable.text');
        console.log('');
        console.log(readData);
        console.log('');

        var ws = new WritebleStream({
            file: 'data/writeable.text'
        });

        ws.write(readData);
        ws.end('\n\nDONE');

        ws.on('finish', function () {
            console.log('');
            console.log('WriteableStream: written all data!');
            console.log('');
        });
    });
});

/*,
    ws = new me.WritebleStream({
        src: 'tasks/data/readable.text',
        dest: 'tasks/data/writable.text'
    }),
    ds = new me.DuplexStream(),
    ts = new me.TransformStream({
        src: 'tasks/data/transform.csv',
        dest: 'tasks/data/transform.json'
    });*/