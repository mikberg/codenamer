#!/usr/bin/env node
'use strict';

var Codename = require('./');
var argv = require('minimist')(process.argv.slice(2));

Codename.fromTheme(argv._[0] || 'Special:Random')
    .then(function(name) {
        console.log(name.toString());
    })
    .catch(function(error) {
        console.error(error);
    });
