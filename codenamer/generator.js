'use strict';

var request = require('request');
var Q = require('q');
var extractor = require('unfluff');
var pos = require('pos');
var S = require('string');

function Generator(mode, identifier) {
  if (Generator.modes.indexOf(mode) === -1) {
    throw new Error('Mode must be in ' + Generator.modes);
  }
  this.mode = mode;
  this.identifier = identifier;
}

Generator.modes = ['file', 'url'];

Generator.url = function(url) {
  return new Generator('url', url);
};

Generator.prototype._getContents = function() {
  if (this.mode === 'url') {
    return this._getContentsUrl();
  }
};

Generator.prototype._getContentsUrl = function() {
  var deferred = Q.defer();
  var g = this;

  request.get(this.identifier, function(error, response, body) {
    if (error) {
      deferred.reject(error);
      return;
    }

    g.text = extractor(body).text;
    deferred.resolve(g.text);
  });

  return deferred.promise;
};

Generator.prototype._parse = function() {
  if (!this.text) {
    throw new Error('Doesn\'t have a text to work with');
  }

  var words = new pos.Lexer().lex(this.text);
  var tagged = new pos.Tagger().tag(words);

  this.nouns = tagged.filter(function(tag) {
    return ['NN', 'NNP', 'NNPS'].indexOf(tag[1]) !== -1;
  }).map(function(tag) { return tag[0]; });

  this.adjectives = tagged.filter(function(tag) {
    return ['JJ', 'JJR', 'JJS'].indexOf(tag[1]) !== -1;
  }).map(function(tag) { return tag[0]; });
};

Generator.randIndex = function(array) {
  return Math.floor(Math.random() * array.length);
};

Generator.slugify = function(text) {
  return S(text).slugify().s;
};

Generator.prototype._generate = function(count) {
  var codenames = [];
  var nouns = this.nouns.slice(0); // copy
  var adjs = this.adjectives.slice(0); // copy

  count = count ? count : 1000;
  var max = Math.min(count, Math.min(nouns.length, adjs.length));
  for (var i = 0; i < max; i++) {
    var a = adjs.splice(Generator.randIndex(adjs), 1);
    var n = nouns.splice(Generator.randIndex(nouns), 1);
    codenames.push(Generator.slugify(a + ' ' + n));
  }

  return codenames;
};

Generator.prototype._filterHyphens = function() {
  function hyphenFilter(item) {
    return item.indexOf('-') === -1;
  }

  this.nouns = this.nouns.filter(hyphenFilter);
  this.adjectives = this.adjectives.filter(hyphenFilter);
};

Generator.prototype._alliterate = function(prefix) {
  function prefixFilter(item) {
    return item.substr(0, prefix.length) === prefix;
  }

  this.nouns = this.nouns.filter(prefixFilter);
  this.adjectives = this.adjectives.filter(prefixFilter);
};

Generator.prototype.generate = function(count, alliterate) {
  var self = this;
  var deferred = Q.defer();

  this._getContents().then(function() {
    self._parse();
    self._filterHyphens();
    if (alliterate) {
      self._alliterate(alliterate);
    }
    deferred.resolve(self._generate(count));
  }, function(reason) {
    deferred.reject(reason);
  });

  return deferred.promise;
};

module.exports = Generator;
