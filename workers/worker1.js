var cluster = require('cluster'),
    workerPrefix = '[Worker#' + process.pid + ']: ';

function onWorkerMessage (msg) {
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
}

function onWorkerOnline () {
    console.log(workerPrefix + 'I\'m online with PID ' + process.pid);
}

function onWorkerDisconnect () {
    console.log(workerPrefix + 'has disconnected');
}

function onWorkerExit (code, signal) {
    var signalMessage = signal ? ' and with signal ' + signal : '';
    console.log(workerPrefix + 'has exited with code: ' + code + signalMessage);
}

function onWorkerError (err) {
    console.log(workerPrefix + 'something going wrong:');
    console.dir(err);
}


cluster.worker.on('message', onWorkerMessage);
cluster.worker.on('online', onWorkerOnline);
cluster.worker.on('disconnect', onWorkerDisconnect);
cluster.worker.on('exit', onWorkerExit);
cluster.worker.on('error', onWorkerError);

console.log(workerPrefix + 'new process spawned with PID ' + process.pid);

/*setTimeout(function () {
    cluster.worker.disconnect();
}, Math.random() * 5000);

setTimeout(function () {
    cluster.worker.kill();
}, Math.random() * 5000);*/