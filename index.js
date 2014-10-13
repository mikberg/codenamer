'use strict';

var pos = require('pos');
var request = require('request');
var S = require('string');
var extractor = require('unfluff');

var URL = 'https://en.wikipedia.org/wiki/Newspaper';

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

request(URL, function(error, response, body) {
    var text = extractor(body).text;
    var words = new pos.Lexer().lex(text);
    var taggedWords = new pos.Tagger().tag(words);

    var adjectives = getAll(taggedWords, 'J').filter(onlyUnique);
    var nouns = getAll(taggedWords, 'N').filter(onlyUnique);

    var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    var noun = nouns[Math.floor(Math.random() * nouns.length)];

    var codename = S(adjective + ' ' + noun).slugify().s;
    console.log(codename);
});
