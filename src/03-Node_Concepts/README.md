node-certification
==================

SCND Strongloop Certification Exam work out

# Node Concepts

The exam will test your knowledge of these core Node concepts:

* [Event loop](http://strongloop.com/strongblog/node-js-event-loop): An event loop is “an entity that handles and processes external events and converts them into callback invocations”.
* [Callbacks](http://strongloop.com/strongblog/node-js-callback-hell-promises-generators): At an I/O call, your code saves the callback and returns control to the runtime environment. The callback will be called later when the data actually is available.
* [Event emitters](http://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-event-emitters): In Node.js an event can be described simply as a string with a corresponding callback. An event can be “emitted” (or in other words, the corresponding callback be called) multiple times or you can choose to only listen for the first time it is emitted.
* [Streams](http://maxogden.com/node-streams.html): The main tool in Node’s evented toolbox is the Stream. Stream instances are basically Unix pipes. They can be readable, writable or both.
* [Buffers](http://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers): Buffers are instances of the Buffer class in Node, which is designed to handle raw binary data. Each buffer corresponds to some raw memory allocated outside V8.
* [JavaScript closures](http://howtonode.org/why-use-closure): A closure is an inner function that has access to the outer (enclosing) function’s variables—scope chain.

## Content

* ./buffers.js
* ./events.js
* ./stream.js 
  * ./streams/duplex.js 
  * ./streams/readable.js 
  * ./streams/transform.js
  * ./streams/writable.js

## License
[Read the LICENSE file (MIT, anyway)](../../LICENSE)

## Reference
[http://strongloop.com/node-js/certification/scnd-study-guide/](http://strongloop.com/node-js/certification/scnd-study-guide/)
