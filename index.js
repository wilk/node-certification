var taskName = process.argv[2];

if (typeof taskName === 'undefined' || taskName === null || taskName.length === 0) {
    console.log('Need a task: $ node index cluster');

    process.exit(1);
}

var task = require('./tasks/' + taskName);

task.exec();