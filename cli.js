#!/usr/bin/env node
'use strict';

var Codename = require('./');
var multiline = require('multiline');
var argv = require('minimist')(process.argv.slice(2));

function showHelp() {
  console.log(multiline(function() {/*
  Generate codenames e.g. for project releases easily. Make sure they stick to
  a common theme of your choice.

  Usage
    codename
    codename <theme>

  Example
    codename batman
    codename artificial_intelligence

  Arguments
    theme     Name of a Wikipedia article from which to generate codenames.
  */}));
}

if(argv.help) {
  showHelp();
} else {
  Codename.fromTheme(argv._[0] || 'Special:Random')
      .then(function(name) {
        console.log(name.toString());
      })
      .catch(function(error) {
        console.error(error);
      });
}
