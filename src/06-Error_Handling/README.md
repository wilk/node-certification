node-certification
==================

SCND Strongloop Certification Exam work out

# Name of section

Error handling in Node can be tricky so it’s import to understand how to do proper error handling. 

The exam will test your understanding of:
* [Domains](https://nodejs.org/docs/latest-v0.12.x/api/domain.html): Domains provide a way to handle multiple different IO operations as a single group. If any of the event emitters or callbacks registered to a domain emit an error event, or throw an error, then the domain object will be notified, rather than losing the context of the error or causing the program to exit immediately.
* [Exceptions](http://www.nodewiz.biz/nodejs-error-handling-pattern): In Node, errors can occur either explicitly, implicitly, on an error event or as a callback argument.
* [Error objects](http://strongloop.com/strongblog/robust-node-applications-error-handling/): The error object is a built-in object that provides a standard set of useful information when an error occurs, such as a stack trace and the error message.

Adam Crabtree of Linkedin has done an excellent presentation on the fundamentals of control flow and error handling. 
You can watch his [presentation here](http://strongloop.com/developers/videos/#Node-js-Asynchrony-Control-flow-and-Error-handling-with-Adam-Crabtree).

## Content

* ./errors.js
* ./domain.js

## License
[Read the LICENSE file (MIT, anyway)](../../LICENSE)

## Reference
[http://strongloop.com/node-js/certification/scnd-study-guide/](http://strongloop.com/node-js/certification/scnd-study-guide/)
