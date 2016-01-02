var express = require('express'),
    app = express(),
    router = express.Router(),
    domain = require('domain');

app.use(function (req, res, next) {
    var expressDomain = domain.create();
    expressDomain.add(req);
    expressDomain.add(res);
    expressDomain.on('error', next);
    expressDomain.run(next);

    console.log('DOMAIN STARTED');
});

router.route('/').get(function (req, res) {
    console.log('GET /');
    console.log('');

    process.nextTick(function () {
        throw new Error('An error from within!');
    });

    //res.status(200).send('Hello world!');
});
app.use('/api', router);

app.use(function (err, req, res, next) {
    console.log('HERE WE ARE!');
    console.log(err);
    console.log(err.domain);

    if (err.domain) {
        res.status(500).send('Server crashed!');

        server.close();
    }
});

var server = app.listen(12345);
console.log('Express App listening on 12345');
