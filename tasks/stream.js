var stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    Duplex = stream.Duplex,
    Transform = stream.Transform,
    util = require('util'),
    fs = require('fs'),
    StreamTask = {};

(function (StreamTask) {
    var me = StreamTask;

    me.readableStreamCounter = 0;

    me.ReadableStream = function (cfg) {
        Readable.call(this, cfg);

        this._data = cfg.data || {};
    };

    util.inherits(me.ReadableStream, Readable);

    me.ReadableStream.prototype._read = function (chunkSize) {
        chunkSize = 50;

        var self = this;

        if (me.readableStreamCounter < self._data.length) {
            if ((self._data.length - me.readableStreamCounter) < chunkSize) {
                self.push(self._data.slice(me.readableStreamCounter, (self._data.length - me.readableStreamCounter)));
                me.readableStreamCounter += (self._data.length - me.readableStreamCounter);
            }
            else {
                self.push(self._data.slice(me.readableStreamCounter, me.readableStreamCounter + chunkSize));
                me.readableStreamCounter += chunkSize;
            }
        }
        else {
            self.push();
        }
    };

    me.WritebleStream = function (cfg) {
        Writable.call(this, cfg);

        this._file = cfg.file;
    };

    util.inherits(me.WritebleStream, Writable);

    me.WritebleStream.prototype._write = function (chunk, encoding, callback) {
        console.log(typeof chunk);

        fs.writeFile(this._file, chunk, callback);
    };

    me.DuplexStream = function (cfg) {
        Duplex.call(this, cfg);
    };

    util.inherits(me.DuplexStream, Duplex);

    me.TransformStream = function (cfg) {
        Transform.call(this, cfg);
    };

    util.inherits(me.TransformStream, Transform);

    me.exec = function () {
        fs.readFile('tasks/data/readable.text', {encoding: 'utf8'}, function (err, file) {
            if (err) throw err;

            var rs = new me.ReadableStream({
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

                var ws = new me.WritebleStream({
                    file: 'tasks/data/writeable.text'
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
    };
})(StreamTask);

module.exports = StreamTask;