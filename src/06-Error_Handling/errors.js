try {
    throw new Error('Caught error');
}
catch (err) {
    console.dir(err);
}

try {
    var thrower = function () {
        throw new Error('Caugth error#2');
    };

    thrower();
}
catch (err) {
    console.error(err);
}

try {
    var thrower = function () {
        //throw new Error('Uncaught error');
    };

    process.nextTick(thrower)
}
catch (err) {
    console.error(err);
}

try {
    var thrower = function () {
        throw new Error('Caught error#3');
    };

    process.nextTick(function () {
        try {
            thrower();
        }
        catch (err) {
            console.error(err);
        }
    });

    thrower();
}
catch (err) {
    console.error(err);
}

var async = require('async');

async.waterfall([
    function (cb) {
        //throw new Error('Uncaught error#2');
        cb();
    },
    function (cb) {
        try {
            throw new Error('Caught error#4');
        }
        catch (err) {
            cb(err);
        }
    }
], function (err, result) {
    if (err) console.error(err);
    else console.log(result);
});

var q = require('q');

function first () {
    var dfd = q.defer();

    process.nextTick(function () {
        try {
            throw new Error('promise error');
        }
        catch (err) {
            dfd.reject(err);
        }
    });

    return dfd.promise;
}

function second () {
    var dfd = q.defer();

    process.nextTick(function () {
        throw new Error('promise error');
    });

    return dfd.promise;
}

function third () {
    var dfd = q.defer();

    process.nextTick(function () {
        throw new Error('promise error');
    });

    return dfd.promise;
}

first()
    .then(second)
    .then(third)
    .then(function () {

    }, function (err) {
        console.error(err);
    });