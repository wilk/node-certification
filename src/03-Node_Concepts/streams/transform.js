var util = require('util'),
    stream = require('stream'),
    Transform = stream.Transform,
    fs = require('fs'),
    MyReadableStream = require('./readable.js'),
    MyWritableStream = require('./writable.js');

function MyTransform (cfg) {
    Transform.call(this, cfg);
}

util.inherits(MyTransform, Transform);

MyTransform.prototype._transform = function (chunk, encoding, callback) {
    console.log(chunk.toString());
    this.push('**' + chunk.toString() + '**');
};

module.exports = MyTransform;

if (require.main == module) {
    var ts = new MyTransform(),
        rs = new MyReadableStream({src: "Reading some data from a long string like this one, a static inline string, 5 byte per time"}),
        ws = new MyWritableStream({file: 'tasks/data/transform.text'});

    rs.pipe(ts).pipe(ws);

    ts.on('finish', function () {
        console.log('Transform stream finished!');
    });

    ws.on('finish', function () {
        console.log('Writeable stream finished!');
    });
}