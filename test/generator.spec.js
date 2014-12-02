'use strict';

var Generator = require('../codenamer/generator.js');
var fs = require('fs');

describe('Generator', function() {

  var dummyUrl = 'http://example.com/text.html';
  var dummyText = 'The quick brown fox jumps over the lazy dog';

  describe('constructor', function() {
    it('exists', function() {
      expect(typeof(Generator)).toBe('function');
    });

    it('accepts a mode and an identifier', function() {
      var g = new Generator('url', 'file.json');
      expect(g.mode).toBe('url');
      expect(g.identifier).toBe('file.json');
    });

    it('throws on invalid mode', function() {
      expect(function() {
        new Generator('blupp', 'file.json');
      }).toThrow();
    });
  });

  describe('mode array', function() {
    it('includes url', function() {
      expect(Generator.modes.indexOf('url')).not.toBe(-1);
    });
  });

  describe('URL factory', function() {
    it('returns an instance with url and identifier', function() {
      var g = Generator.url(dummyUrl);
      expect(g.mode).toBe('url');
      expect(g.identifier).toEqual(dummyUrl);
    });
  });

  describe('_getContents', function() {
    it('calls _getContentsUrl in URL mode', function() {
      var g = Generator.url(dummyUrl);
      spyOn(g, '_getContentsUrl');
      g._getContents();
      expect(g._getContentsUrl).toHaveBeenCalled();
    });

    it('returns _getContentsUrl() in URL mode', function() {
      var g = Generator.url(dummyUrl);
      spyOn(g, '_getContentsUrl').andCallFake(function() {
        return 42;
      });
      expect(g._getContents()).toBe(42);
    });
  });

  describe('URL', function() {

    var g;
    var url = 'http://example.com';
    var contents = fs.readFileSync('test/fixtures/batman.html');
    var request = require('request');

    beforeEach(function() {
      g = Generator.url(url);
      spyOn(request, 'get').andCallFake(function(_url, callback) {
        if (_url === url) {
          callback(undefined, {}, contents);
        } else {
          callback('error');
        }
      });
    });

    describe('_getContentsUrl', function() {
      it('calls the correct URL', function() {
        g._getContentsUrl();
        expect(request.get).toHaveBeenCalled();
        expect(request.get.mostRecentCall.args[0]).toBe(url);
      });

      it('returns a promise', function() {
        expect(g._getContentsUrl().then).toBeDefined();
      });

      it('rejects promise on request error', function() {
        g.identifier = 'http://invalid.com';
        g._getContentsUrl().then(null, function(reason) {
          expect(reason).toBeDefined();
        });
      });

      it('populates the generator with a text', function() {
        g._getContentsUrl().then(function() {
          expect(typeof(g.text)).toBe('string');
          expect(g.text).toContain('Will Brooker');
        });
      });
    });

    describe('full', function() {
      it('generates valid codenames', function() {
        g.generate(2, 'a').then(function(codenames) {
          expect(codenames.length).toBe(2);
        });
      });
    });

  });

  describe('_parse', function() {

    var g;
    beforeEach(function() {
      g = new Generator('url', dummyUrl);
      g.text = dummyText;
    });

    it('throws if there\'s no text', function() {
      delete g.text;
      expect(function() {
        g._parse();
      }).toThrow();
    });

    it('correctly parses the text', function() {
      g._parse();
      expect(g.nouns).toEqual(['fox', 'dog']);
      expect(g.adjectives).toEqual(['quick', 'brown', 'lazy']);
    });
  });

  describe('_generate', function() {

    var g;
    beforeEach(function(){
      g = new Generator('url', dummyUrl);
      g.nouns = ['Oslo', 'lexicon', 'batman', 'superman', 'spiderman'];
      g.adjectives = ['pink', 'blue', 'green', 'purple'];
    });

    it('generates four codenames', function() {
      var codenames = g._generate();
      expect(codenames.length).toBe(4);
    });

    it('respects count', function() {
      expect(g._generate(1).length).toBe(1);
    });
  });

  describe('_alliterate', function() {

    var g;
    beforeEach(function() {
      g = new Generator('url', dummyUrl);
      g.nouns = ['ab', 'ac', 'ad', 'bd', 'bad'];
      g.adjectives = ['db', 'ad', 'dc', 'ak'];
    });

    it('filters by prefix', function() {
      g._alliterate('a');
      expect(g.nouns).toEqual(['ab', 'ac', 'ad']);
      expect(g.adjectives).toEqual(['ad', 'ak']);
    });

  });


});
