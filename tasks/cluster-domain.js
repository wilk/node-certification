var cluster = require('cluster'),
    cpus = require('os').cpus().length,
    ClusterDomainTask = {};

(function (ClusterDomainTask) {
    var me = ClusterDomainTask;

    me.exec = function () {
        cluster.setupMaster({
            exec: 'tasks/workers/domain-worker.js'
        });

        for (var i = 0; i < cpus; i++) cluster.fork();

        cluster.on('disconnect', function (worker) {
            console.log('Worker disconnected. Forking again');
            cluster.fork();
        });
    };
})(ClusterDomainTask);

module.exports = ClusterDomainTask;