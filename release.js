#!/usr/bin/env node
'use strict';

var concha = require('conventional-changelog');
var pkg = require('./package.json');
var fs = require('fs');

var CHANGELOG = 'CHANGELOG.md';

concha({
  repository: 'https://github.com/mikberg/codenamer',
  version: pkg.version,
  subtitle: pkg.codename
}, function(err, log) {
  if (err) {
    console.error(err);
  } else {
    fs.writeFile(CHANGELOG, log, {
      flag: 'a'
    }, function(err) {
      if (err) {
        console.error(err);
      }
    });
  }
});
