'use strict';

var pos = require('pos');
var request = require('request');
var S = require('string');
var extractor = require('unfluff');
var Q = require('q');

var URL_WIKIPEDIA = 'http://en.wikipedia.org/wiki/<theme>';

/**
 * Initialize a new Codename
 * @param {string} noun      First word in the codename
 * @param {string} adjective Second word in the codename
 */
function Codename(adjective, noun) {
  this.adjective = adjective;
  this.noun = noun;
}

function NotEnoughWordsError(msg) {
  this.msg = msg;
}

module.exports = Codename;

function getWordType(words, classifier) {
  return words.filter(function(word) {
    return word[1].substr(0, classifier.length) === classifier;
  }).map(function(word) {
    return word[0];
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

Codename.prototype.toString = function() {
  return S(this.adjective + ' ' + this.noun).slugify().s;
};

/**
 * Generate a promise of a codename from a theme. Does a lookup on Wikipedia
 * for the theme in order to find suitable words.
 * @param {string} theme       Theme to find words from.
 * @param {string} urlTemplate Optional template to use for the URL, where
 *                             `<theme>` is replaced with the theme given.
 * @return {promise} Promise of a Codename
 */
Codename.fromTheme = function(theme, urlTemplate) {
  urlTemplate = urlTemplate ? urlTemplate : URL_WIKIPEDIA;
  return Codename.fromUrl(urlTemplate.replace('<theme>', theme));
};

/**
 * Generate a promise of a codename from an URL
 * @param {string} url URL of a page to generate codename from.
 * @return {promise} Promise of a Codename
 */
Codename.fromUrl = function(url) {
  var deferred = Q.defer();

  request(url, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    }

    try {
      deferred.resolve(Codename.fromHtml(body));
    } catch(e) {
      deferred.reject(e.msg);
    }
  });

  return deferred.promise;
};

/**
 * Generate a codename from HTML
 * @param {string} html The HTML to generate codename from.
 * @return {Codename} Generated Codename
 */
Codename.fromHtml = function(html) {
  return Codename.fromText(extractor(html).text);
};

/**
 * Generate a codename from a body of text.
 * @param {string} text Text to generate Codename from.
 * @return {Codename} Generated Codename
 */
Codename.fromText = function(text) {
  var words = new pos.Lexer().lex(text);
  var taggedWords = new pos.Tagger().tag(words);
  var adjectives = getWordType(taggedWords, 'J').filter(onlyUnique);
  var nouns = getWordType(taggedWords, 'N').filter(onlyUnique);

  if (adjectives.length === 0 || nouns.length === 0) {
    throw new NotEnoughWordsError('Not enough words, <a>/<n> adj/noun'
        .replace('<a>', adjectives.length)
        .replace('<n>', nouns.length));
  }

  return new Codename(randomFromArray(adjectives), randomFromArray(nouns));
};
