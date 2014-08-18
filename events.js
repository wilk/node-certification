var events = require('events'),
    util = require('util'),
    EventEmitter = events.EventEmitter;

var Observed = function () {};

util.inherits(Observed, EventEmitter);

Observed.prototype.text = function (text) {
    this.emit('message', text);
};

Observed.prototype.json = function (object) {
    this.emit('json', object);
};

var o1 = new Observed();

o1.on('message', function (text) {
    console.log('Listener#1: A new text message is arrived: ' + text);
});

o1.on('message', function (text) {
    console.log('Listener#2: A new text message is arrived: ' + text);
});

o1.on('json', function (object) {
    console.log('A new object message is arrived:');
    console.log(util.inspect(object));
});

o1.text('hello world!');
o1.json({
    hello: 'world'
});

console.log('Listeners attached to the message event: ' + EventEmitter.listenerCount(o1, 'message'));
console.log('Listeners attached to the json event: ' + EventEmitter.listenerCount(o1, 'json'));