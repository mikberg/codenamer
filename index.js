#!/usr/bin/env node
'use strict';

var codename = require('./src/codename');
var argv = require('minimist')(process.argv.slice(2));

codename(argv._[0] || 'Special:Random').then(function(name) {
    console.log(name);
});
