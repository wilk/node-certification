var util = require('util');

process.on('exit', function (code) {
    console.log('bye bye with code ' + code);

    setTimeout(function () {
        console.log('This code won\'t execute :(');
    }, 1000);

    console.log('Mario!');
});

var sigintCounter = 0;
process.on('SIGINT', function () {
    console.log('CTRL+C intercepted, phuqer!');

    if (sigintCounter > 1) {
        process.kill();
    }

    sigintCounter++;
});

setTimeout(function () {
    console.log('This need to continue the process execution for 10 seconds');
}, 10000);

process.stderr.write('DUUUUDE, an error!');
process.stdout.write('Dude, outputting!' + "\n");

process.stdin.on('readable', function () {
    var chunk = process.stdin.read();

    if (chunk !== null) {
        switch (chunk.slice(0, chunk.length - 1).toString()) {
            case 'argv':
                process.stdout.write('argv > ');
                process.stdout.write(util.inspect(process.argv));
                process.stdout.write("\n");
                break;
            case 'kill':
                process.stdout.write('Killing myself');
                process.kill();
                break;
            case 'memory':
                process.stdout.write('Memory usage > ');
                process.stdout.write(util.inspect(process.memoryUsage()));
                process.stdout.write("\n");
                break;
            case 'info':
                process.stdout.write('Info > ');
                process.stdout.write('Arch: ' + process.arch + "\n");
                process.stdout.write('Title: ' + process.title + "\n");
                process.stdout.write('Platform: ' + process.platform + "\n");
                process.stdout.write('Version: ' + process.version + "\n");
                process.stdout.write('Lib versions: \n');
                process.stdout.write(util.inspect(process.versions) + "\n");
                break;
            default:
                process.stdout.write('Unknown command > ' + chunk);
        }
    }
});

process.stdin.on('end', function () {
    process.stdout.write('end');
});