var cluster = require('cluster'),
    cpus = require('os').cpus().length,
    clusterPrefix = '[Cluster] -> ';

function onClusterDisconnect (worker) {
    console.log(clusterPrefix + 'a worker with PID ' + worker.process.pid + ' has been disconnected');
}

function onClusterExit (worker, code, signal) {
    var signalMessage = signal ? ' and with signal ' + signal : '';
    console.log(clusterPrefix + 'a worker with PID ' + worker.process.pid + ' has been exited with code ' + code + signalMessage);

    cpus--;

    if (cpus === 0) {
        console.log(clusterPrefix + 'no more worker available. Exiting.');
        process.exit(0);
    }
}

function onClusterFork (worker) {
    console.log(clusterPrefix + 'a new worker has been forked with PID ' + worker.process.pid);
}

function onClusterOnline (worker) {
    console.log(clusterPrefix + 'a new worker is online with PID ' + worker.process.pid);

    //worker.send('Hi worker! Welcome to the virtual world!');

    worker.send({
        event: 'hello',
        message: 'Hi worker! Welcome to the virtual world!'
    });

    worker.on('message', onClusterMessage);
}

function onClusterListening (worker, addressInfo) {
    console.log(clusterPrefix + 'listening on a worker PID ' + worker.process.pid + ', @ ' + addressInfo.address + ', port: ' + addressInfo.port + ', type: ' + addressInfo.addressType);
}

function onClusterSetup () {
    console.log(clusterPrefix + 'setup a worker');
}

function onClusterMessage (msg) {
    if (typeof msg === 'object') {
        console.log(clusterPrefix + 'Event: ' + msg.event + '; SenderId: ' + msg.senderId);
    }
    else {
        console.log(clusterPrefix + 'incoming message from worker:');
        console.log('Cluster >> ' + msg);
    }
}

 if (cluster.isMaster) {
    cluster.on('disconnect', onClusterDisconnect);
    cluster.on('exit', onClusterExit);
    cluster.on('fork', onClusterFork);
    cluster.on('online', onClusterOnline);
    cluster.on('setup', onClusterSetup);
    cluster.on('listening', onClusterListening);

    // This let to move a worker code from the main master file to a different one (the worker file)
    console.log(clusterPrefix + 'setup Master to fork workers in an external file');
    cluster.setupMaster({
        exec: 'workers/worker1.js',
        args: ['--use', 'https'],
        silent: false
    });

    for (var i = 0; i < cpus; i++) {
        console.log(clusterPrefix + 'spawning a new process');
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