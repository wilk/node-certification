// Using: http://stackoverflow.com/questions/22646996/how-do-i-run-a-node-js-script-from-within-another-node-js-script

'use strict';

var childProcess = require('child_process');

module.exports = {

    runScript : function (scriptPath, pointers, callback) {

        var self = this;

        // Clean previous executions (like express);
        for (var i in pointers) {
            pointers[i].shutdown();

        }

        pointers = [];

        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;
        var process = childProcess.fork(scriptPath);
        pointers.push(process);

        // Function to propagate errors
        process.callbackError = function (code) {

            if (invoked) { return }
            invoked = true;

            var err = code === 0 ? null : new Error('exit code ' + code);
            self.callback(err);
        };

        // Own kill function, remove listener and kill itself
        process.shutdown = function () {
            // Get rid of the exit listener since this is a planned exit.
            this.removeListener("exit", this.callbackError);
            this.kill("SIGTERM");
        };

        // execute the callback once the process has finished running
        process.on('exit', process.callbackError);

        // listen for errors as they may prevent the exit event from firing
        process.on('error',function (err) {

            if (invoked) { return }
            invoked = true;

            callback(err);
        });

        return pointers;
    },

    callback: function (err) {

        if (err) {
            console.log('Error running script');
            console.log(err);
        }

        console.log('Pres any key to go back to menu');
    }
};