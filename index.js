// Based on: https://www.npmjs.com/package/node-menu

'use strict';

var menu = require('node-menu');
var utils = require('./utils');

menu
    .addDelimiter('-', 40, 'SCND Node Certified Program')

    // 01-What_is_Node // ----------------------------------------------------------------------

    // 02-Working_with_npm_and_modules // ------------------------------------------------------
    .addItem(
        'Working with NPM and modules? - Modules Exercise',
        function() { utils.runScript('src/02-Working_with_npm_and_modules/module_2/index.js',utils.callback); }
    )

    // 03-Node_Concepts // ---------------------------------------------------------------------
    .addItem(
        'Node Concepts - Events Exercise',
        function() { utils.runScript('src/03-Node_Concepts/events.js',utils.callback); }
    )
    .addItem(
        'Node Concepts - Stream Exercise',
        function() { utils.runScript('src/03-Node_Concepts/stream.js',utils.callback); }
    )
    .addItem(
        'Node Concepts - Buffer Exercise',
        function() { utils.runScript('src/03-Node_Concepts/buffers.js',utils.callback); }
    )

    // 04-Working_with_Express // --------------------------------------------------------------
    .addItem(
        'Working with Express - Express Exercise',
        function() { utils.runScript('src/04-Working_with_Express/express.js',utils.callback); }
    )
    .addItem(
        'Working with Express - Express with domain Exercise',
        function() { utils.runScript('src/04-Working_with_Express/express-domain.js',utils.callback); }
    )

    // 05-Working_with_the_Process_API // ------------------------------------------------------
    .addItem(
        'Working with the process API - Process Exercise',
        function() { utils.runScript('src/05-Working_with_the_Process_API/process.js',utils.callback); }
    )

    // 06-Error_Handling // --------------------------------------------------------------------
    .addItem(
        'Error Handling - Domain Exercise',
        function() { utils.runScript('src/06-Error_Handling/domain.js',utils.callback); }
    )

    .addItem(
        'Error Handling - Error Exercise',
        function() { utils.runScript('src/06-Error_Handling/errors.js',utils.callback); }
    )

    // 07-Sockets // ---------------------------------------------------------------------------
    .addItem(
        'Sockets - WebSockets Exercise',
        function() { utils.runScript('src/07-Sockets/websocket.js',utils.callback); }
    )

    // 08-Clustering_and_Multi-Process // ------------------------------------------------------
    .addItem(
        'Clustering and Multi-Process - Exercise',
        function() { utils.runScript('src/08-Clustering_and_Multi-Process/cluster.js',utils.callback); }
    )
    .addItem(
        'Clustering and Multi-Process - Cluster Domain Exercise',
        function() { utils.runScript('src/08-Clustering_and_Multi-Process/cluster-domain.js',utils.callback); }
    )

    // 09-Deployment // ------------------------------------------------------------------------

    // 10-Troubleshooting // -------------------------------------------------------------------
    .addItem(
        'Troubleshooting - REPL Exercise',
        function() { utils.runScript('src/10-Troubleshooting/repl.js',utils.callback); }
    )

    .customHeader(function() {
        process.stdout.write("███████╗ ██████╗███╗   ██╗██████╗\n" +
                             "██╔════╝██╔════╝████╗  ██║██╔══██╗\n" +
                             "███████╗██║     ██╔██╗ ██║██║  ██║\n" +
                             "╚════██║██║     ██║╚██╗██║██║  ██║\n" +
                             "███████║╚██████╗██║ ╚████║██████╔╝\n" +
                             "╚══════╝ ╚═════╝╚═╝  ╚═══╝╚═════╝\n\n");
        process.stdout.write("Strongloop Certification Node Certification - Exam work out\n\n");
    })

    .addDelimiter('-', 40)
    .start();
