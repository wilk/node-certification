var cluster = require('cluster'),
    domain = require('domain'),
    masterDomain = domain.create();

masterDomain.on('error', function (err) {
    console.error('Error: ', err.stack);

    try {
        // Disconnecting domain
        cluster.worker.disconnect();
    }
    catch (err) {
        console.error('Error', err.stack);
    }
});

masterDomain.run(function () {
    var express = require('express'),
        router = express.Router(),
        app = express();

    router.route('/').get(function (req, res, next) {
        console.log('GET /');
        console.log('Responding with "Hello world!"');

        // Throw an expection
        lol();

        res.status(200).send('Hello world!');
    });

    app.use('/api/', router);
    // Error handler
    app.use(function (err, req, res, next) {
        console.error('Error', err.stack);

        try {
            console.log('Closing web server and disconnecting worker');
            server.close();
            cluster.worker.disconnect();

            res.status(500).send(err.message);
        }
        catch (err) {
            console.error('Error', err.stack);
        }
    });

    var server = app.listen(12345, function () {
        console.log('HTTP Server listening on port 12345');
    });
});