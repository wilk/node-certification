var cluster = require('cluster'),
    workerPrefix = '[Worker#' + process.pid + ']: ',
    WorkerTask = {};

(function (WorkerTask) {
    var me = WorkerTask;

    // Worker Events
    me.onWorkerMessage = function (msg) {
        if (typeof msg === 'object') {
            console.log(workerPrefix + 'Event: ' + msg.event + '; Message: ' + msg.message);

            cluster.worker.send({
                event: 'hello',
                senderId: process.pid
            });
        }
        else {
            if (msg === 'shutdown') {
                console.log(workerPrefix + 'Shutting down gracefully...');
            }
            else {
                console.log(workerPrefix + 'a new message incoming from Master:');
                console.log('Worker >> ' + msg);

                cluster.worker.send('Hello from Worker#' + process.pid);
            }
        }
    };

    me.onWorkerOnline = function () {
        console.log(workerPrefix + 'I\'m online with PID ' + process.pid);
    };

    me.onWorkerDisconnect = function () {
        console.log(workerPrefix + 'has disconnected');
    };

    me.onWorkerExit = function (code, signal) {
        var signalMessage = signal ? ' and with signal ' + signal : '';
        console.log(workerPrefix + 'has exited with code: ' + code + signalMessage);
    };

    me.onWorkerError = function (err) {
        console.log(workerPrefix + 'something going wrong:');
        console.dir(err);
    };

    me.exec = function () {
        cluster.worker.on('message', me.onWorkerMessage);
        cluster.worker.on('online', me.onWorkerOnline);
        cluster.worker.on('disconnect', me.onWorkerDisconnect);
        cluster.worker.on('exit', me.onWorkerExit);
        cluster.worker.on('error', me.onWorkerError);

        console.log(workerPrefix + 'new process spawned with PID ' + process.pid);

        /*setTimeout(function () {
            cluster.worker.disconnect();
        }, Math.random() * 5000);

        setTimeout(function () {
            cluster.worker.kill();
        }, Math.random() * 5000);*/
    };
})(WorkerTask);

module.exports = WorkerTask;

if (typeof module.require.main === 'undefined') WorkerTask.exec();