var util = require('util'),
    stream = require('stream'),
    Duplex = stream.Duplex,
    fs = require('fs');

function MyDuplex (cfg) {
    Duplex.call(this, cfg);

    this._output = cfg.output;
    this._input = cfg.input;
    this._index = 0;
};

util.inherits(MyDuplex, Duplex);

MyDuplex.prototype._read = function () {
    var chunkSize = 5;

    if (this._input.length > this._index) {
        this.push(this._input.slice(this._index, this._index + chunkSize));
        this._index += chunkSize;
    }
    else this.push();
};

MyDuplex.prototype._write = function (chunk, encoding, callback) {
    fs.writeFile(this._output, chunk, callback);
};

module.exports = MyDuplex;

if (require.main == module) {
    var ds = new MyDuplex({input: 'this is a message from the future, read bit-per-bit', output: 'tasks/data/writeable.text'});

    ds.pipe(ds);

    ds.on('data', function (chunk) {
        console.log('READING CHUNK');
        console.log('');
        console.log(chunk.toString());
        console.log('');
    });

    ds.on('end', function () {
        console.log('STOP READING');
    });

    ds.on('pipe', function (src) {
        console.log('PIPING');
        assert.equal(src, ds);
    });

    ds.on('finish', function () {
        console.log('STOP WRITING');
    });
}