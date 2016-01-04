var cluster = require('cluster'),
    cpus = require('os').cpus().length;

cluster.setupMaster({
    exec: __dirname  + '/workers/domain-worker.js'
});

for (var i = 0; i < cpus; i++) cluster.fork();

cluster.on('disconnect', function (worker) {
    console.log('Worker disconnected. Forking again');
    cluster.fork();
});