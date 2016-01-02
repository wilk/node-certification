// Based on: https://www.npmjs.com/package/node-menu

'use strict';

var menu = require('node-menu');
var utils = require('./utils');

menu
    .addDelimiter('-', 40, 'SCND Node Certified Program')

    .addItem(
        'Buffers Example',
        function() { utils.runScript('src/buffers',utils.callback); }
    )

    .addDelimiter('-', 40)
    .start();
