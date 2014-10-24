'use strict';

var Codename = require('../index.js');

describe('Codename', function() {

  describe('constructor', function() {
    it('sets adjective and noun', function() {
      var c = new Codename('adj', 'noun');
      expect(c.adjective).toBe('adj');
      expect(c.noun).toBe('noun');
    });
  });

  describe('toString', function() {
    var c;
    beforeEach(function() {
      c = new Codename('adj', 'noun');
    });

    it('returns a string', function() {
      expect(typeof(c.toString())).toBe('string');
    });

    it('returns adj-noun', function() {
      expect(c.toString()).toBe('adj-noun');
    });

    it('slugifies', function() {
      expect((new Codename('Aa$', 'Hæøå')).toString()).toBe('aa-haeoa');
    });
  });

  describe('fromText', function() {
    var c;
    beforeEach(function() {
      c = Codename.fromText('green text');
    });

    it('returns a codename instance', function() {
      expect(c.constructor).toBe(Codename);
    });

    it('identifies green and text correctly', function() {
      expect(c.toString()).toBe('green-text');
    });

    it('throws if there\'s not enough words', function() {
      function fn() {
        new Codename.fromText('word');
      }
      expect(fn).toThrow();
    });
  });

  // describe('fromHtml', function() {
  //   var c;
  //   beforeEach(function() {
  //     spyOn(Codename, 'fromText').andCallThrough();
  //     c = Codename.fromHtml('<html><body><p>more green text here</p></body></html>');
  //   });
  //
  //   it('returns a codename instance', function() {
  //     expect(c.constructor).toBe(Codename);
  //   });
  //
  //   it('identifies green and text correctly', function() {
  //     expect(Codename.fromText).toHaveBeenCalledWith('green text');
  //   });
  // });

});
