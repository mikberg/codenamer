'use strict';

var pos = require('pos');
var request = require('request');
var S = require('string');
var extractor = require('unfluff');
var Q = require('q');

var URL_REGEX = /^http/i;
var URL_WIKIPEDIA = 'http://en.wikipedia.org/wiki/<theme>';

function getAll(words, classifier) {
    return words.filter(function(word) {
        return word[1].substr(0, classifier.length) === classifier;
    }).map(function(word) {
        return word[0].toLowerCase();
    });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function extractWords(html) {
    var words = new pos.Lexer().lex(extractor(html).text);
    return new pos.Tagger().tag(words);
}

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function codename(theme) {
    var deferred = Q.defer();

    theme = URL_REGEX.test(theme) ?
            theme : URL_WIKIPEDIA.replace('<theme>', theme);

    request(theme, function(error, response, body) {
        var taggedWords = extractWords(body);

        var adjectives = getAll(taggedWords, 'J').filter(onlyUnique);
        var nouns = getAll(taggedWords, 'N').filter(onlyUnique);

        var adjective = randomFromArray(adjectives);
        var noun = randomFromArray(nouns);

        deferred.resolve(S(adjective + ' ' + noun).slugify().s);
    });

    return deferred.promise;
}

module.exports = codename;
