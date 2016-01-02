// Using: http://stackoverflow.com/questions/22646996/how-do-i-run-a-node-js-script-from-within-another-node-js-script

'use strict';

var childProcess = require('child_process');

module.exports = {

    runScript : function (scriptPath, callback) {

        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;
        var process = childProcess.fork(scriptPath);

        // listen for errors as they may prevent the exit event from firing
        process.on('error', function (err) {

            if (invoked) { return }
            invoked = true;

            callback(err);
        });

        // execute the callback once the process has finished running
        process.on('exit', function (code) {

            if (invoked) { return }
            invoked = true;

            var err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    },

    callback: function (err) {

        if (err) {
            console.log(err);
            console.log('Error running script');
            throw err;

        } else {
            console.log('Script successfully ended - press enter go back to menu');
        }
    }
};