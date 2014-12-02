#!/usr/bin/env node
'use strict';

var Generator = require('./codenamer/generator.js');
var multiline = require('multiline');
var argv = require('minimist')(process.argv.slice(2));

function showHelp() {
  console.log(multiline(function() {/*
  Generate codenames e.g. for project releases easily. Make sure they stick to
  a common theme of your choice. Optionally ensure they start with a prefix,
  e.g. a specific letter.

  Usage
    codename <url>
    codename <url> --prefix <prefix>

  Example
    codename http://en.wikipedia.org/wiki/Batman
    codename http://en.wikipedia.org/wiki/Batman --prefix a
    codename http://en.wikipedia.org/wiki/Batman --count 10

  Arguments
    url      URL to find text at

  Options
    --prefix  Start every part of this
    --count   Limit number of codenames returned (default: 10)
  */}));
}

if(argv.help || !argv._[0]) {
  showHelp();
} else {
  var url = argv._[0];
  var count = argv.count ? argv.count : 10;
  var g = new Generator('url', url);

  g.generate(count, argv.prefix).then(function(codenames) {
    if (codenames.length === 0) {
      console.log('Not enough words to generate from');
    } else {
      codenames.forEach(function(codename, index) {
        console.log('<i>: \t <cn>'.replace('<i>', index + 1)
        .replace('<cn>', codename));
      });
    }
  }).catch(function(error) {
    console.error(error);
  });
}
