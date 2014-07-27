var domain = require('domain'),
    DomainTask = {};

(function (DomainTask) {
    var me = DomainTask;

    me.domainErrorHandler = function (err) {
        console.log('Raised an error and catched from master domain: ' + err.message);
        console.error('error', err.stack);

        console.log('Setting up a killer timer to force the exit of the process, even if there are other running async functions!');
        var killerTimer = setTimeout(function () {
            console.log('Forcing process to exit!');
            process.exit();
        }, 8000);
        // Don't keep the process open for the killertimer
        killerTimer.unref();

        console.log('Wait the end of the process until the async function is done');
        setTimeout(function () {
            console.log('Now exit!');
        }, 10000);
    };

    me.subdomainErrorHandler = function (err) {
        console.log('Raised an error and catched from subdomain: ' + err.message);
        console.error('error', err.stack);

        console.log('Setting up a killer timer to force the exit of the process, even if there are other running async functions!');
        var killerTimer = setTimeout(function () {
            console.log('Forcing process to exit!');
            process.exit();
        }, 8000);
        // Don't keep the process open for the killertimer
        killerTimer.unref();

        console.log('Wait the end of the process until the async function is done');
        setTimeout(function () {
            console.log('Now exit!');
        }, 10000);
    };

    me.exec = function () {
        var d1 = domain.create();

        d1.on('error', me.domainErrorHandler);

        d1.run(function () {
            console.log('DomainTask started!');
            console.log('Simulating an error in 5 secs!');

            setTimeout(function () {
                lol();
            }, 5000);

            var d2 = domain.create();

            d2.on('error', me.subdomainErrorHandler);
            d2.run(function () {
                console.log('SubDomainTask started!');
                console.log('Simulating an error in 2 secs!');

                setTimeout(function () {
                    lol();
                }, 2000);
            });
        });
    };
})(DomainTask);

module.exports = DomainTask;