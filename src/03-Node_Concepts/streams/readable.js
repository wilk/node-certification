var stream = require('stream'),
    util = require('util'),
    ReadableStream = stream.Readable;

// Read an input string

var MyReadableStream = function (cfg) {
    ReadableStream.call(this, cfg);

    this._src = cfg.src;
    this._index = 0;
};

util.inherits(MyReadableStream, ReadableStream);

MyReadableStream.prototype._read = function () {
    var chunkSize = 5;

    if (this._src.length > this._index) {
        this.push(this._src.slice(this._index, this._index + chunkSize));
        this._index += chunkSize;
    }
    else this.push();
};

module.exports = MyReadableStream;

if (require.main === module) {
    var rs = new MyReadableStream({src: "Reading some data from a long string like this one, a static inline string, 5 byte per time"});

    rs.on('data', function (chunk) {
        console.log('Here\'s some data:');
        console.log('');
        console.log(chunk.toString());
        console.log('');
    });

    rs.on('end', function () {
        console.log('Finished reading data');
    });
}