var buf = new Buffer('hello world ☃', 'utf-8');

console.log(buf.toString());
console.log('Buffer lenght ' + buf.length);
console.log('String byteLength ' + Buffer.byteLength(buf.toString()));
console.log('String length ' + buf.toString().length);

var buf2 = new Buffer(1024); // 1KB

buf2.write('Hello world! ☃', 'utf-8');

console.log(buf2.toString());
console.log('Buffer length ' + buf2.length);
console.log('String length ' + buf2.toString().length);

var buf3 = new Buffer('Winter is coming!', 'utf-8');

buf3.copy(buf2, 17);

console.log(buf3.toString());
console.log(buf2.toString());

var aBuf = new Buffer('Dude', 'utf-8'),
    bBuf = new Buffer('Dude', 'utf-8');

console.log(aBuf.toString() === bBuf.toString());