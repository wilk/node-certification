var express = require('express'),
    router = express.Router(),
    logger = require('express-bunyan-logger'),
    fs = require('fs'),
    app = express(),
    repl = require('./repl');

var users = ['foo', 'bar', 'foobar'];
router.param('user', function (req, res, next, id) {
    if (id >= 0 && id < users.length) {
        req.user = users[id];
        next();
    }
    else next(new Error('Non existing user with id ' + id));
});

router.route('/').get(function (req, res) {
    res.send('hello!');
});

router.route('/user/:user').get(function (req, res) {
    res.send('User with id ' + req.param('id') + ': ' + req.user);
});

app.use(logger({
    name: 'logger',
    streams: [/*{
        level: 'info',
        stream: process.stdout
    }, */{
        level: 'info',
        stream: fs.createWriteStream('express.log')
    }]
}));

app.use('/static', express.static(__dirname + '/data'));
app.use('/api/', router);

app.listen(12345, function () {
    console.log('Listening on port 12345');
});