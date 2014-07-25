var cluster = require('cluster'),
    cpus = require('os').cpus().length,
    ClusterTask = {};

(function (ClusterTask) {
    var me = ClusterTask;

    me.clusterPrefix = '[Cluster] -> ';

    // Cluster Events

    me.onClusterDisconnect = function (worker) {
        console.log(me.clusterPrefix + 'a worker with PID ' + worker.process.pid + ' has been disconnected');
    };

    me.onClusterExit = function (worker, code, signal) {
        var signalMessage = signal ? ' and with signal ' + signal : '';
        console.log(me.clusterPrefix + 'a worker with PID ' + worker.process.pid + ' has been exited with code ' + code + signalMessage);

        cpus--;

        if (cpus === 0) {
            console.log(me.clusterPrefix + 'no more worker available. Exiting.');
            process.exit(0);
        }
    };

    me.onClusterFork = function (worker) {
        console.log(me.clusterPrefix + 'a new worker has been forked with PID ' + worker.process.pid);
    };

    me.onClusterOnline = function (worker) {
        console.log(me.clusterPrefix + 'a new worker is online with PID ' + worker.process.pid);

        //worker.send('Hi worker! Welcome to the virtual world!');

        worker.send({
            event: 'hello',
            message: 'Hi worker! Welcome to the virtual world!'
        });

        worker.on('message', me.onClusterMessage);
    };

    me.onClusterListening = function (worker, addressInfo) {
        console.log(me.clusterPrefix + 'listening on a worker PID ' + worker.process.pid + ', @ ' + addressInfo.address + ', port: ' + addressInfo.port + ', type: ' + addressInfo.addressType);
    };

    me.onClusterSetup = function () {
        console.log(me.clusterPrefix + 'setup a worker');
    };

    me.onClusterMessage = function (msg) {
        if (typeof msg === 'object') {
            console.log(me.clusterPrefix + 'Event: ' + msg.event + '; SenderId: ' + msg.senderId);
        }
        else {
            console.log(me.clusterPrefix + 'incoming message from worker:');
            console.log('Cluster >> ' + msg);
        }
    };

    me.exec = function () {
        if (cluster.isMaster) {
            cluster.on('disconnect', me.onClusterDisconnect);
            cluster.on('exit', me.onClusterExit);
            cluster.on('fork', me.onClusterFork);
            cluster.on('online', me.onClusterOnline);
            cluster.on('setup', me.onClusterSetup);

            // This let to move a worker code from the main master file to a different one (the worker file)
            console.log(me.clusterPrefix + 'setup Master to fork workers in an external file');
            cluster.setupMaster({
                exec: 'tasks/workers/worker1.js',
                args: ['--use', 'https'],
                silent: false
            });

            for (var i = 0; i < cpus; i++) {
                console.log(me.clusterPrefix + 'spawning a new process');
                cluster.fork();
            }

            setTimeout(function () {
                for (var wid in cluster.workers) {
                    var worker = cluster.workers[wid];

                    worker.send('shutdown');
                    worker.disconnect();
                }
            }, 6000);

            setTimeout(function () {
                cluster.disconnect();
            }, 12000);
        }
        else {
            /*console.log('Worker: new process spawned with PID ' + process.pid);

            setTimeout(function () {
                cluster.worker.disconnect();
            }, Math.random() * 5000);

            setTimeout(function () {
                cluster.worker.kill();
            }, Math.random() * 5000);*/
        }
    };
})(ClusterTask);

module.exports = ClusterTask;