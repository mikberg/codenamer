import test from 'ava';
import fs from 'fs';
import uniq from 'lodash.uniq';
import normalize from '../codenamer/normalize';

const HTML = fs.readFileSync('./fixtures/batman.html', { encoding: 'utf-8' });

test('it returns a list of words', t => {
  const fixture = 'this is some normal text';
  const result = normalize(fixture);
  t.same(result, fixture.split(' '));
});

test('it lowercases', t => {
  const result = normalize('THIS iS SOmE normal text');
  t.same(result.filter(w => w.toLowerCase() !== w), []);
});

test('it removes punctuation', t => {
  const result = normalize('this, has some. punctuation');
  t.same(result, ['this', 'has', 'some', 'punctuation']);
});

test('it removes numbers', t => {
  const result = normalize('in the 1990s we had 9 cats');
  t.same(result, ['in', 'the', 's', 'we', 'had', 'cats']);
});

test('it combines hyphened words', t => {
  const result = normalize('this is bat-spray');
  t.same(result, ['this', 'is', 'batspray']);
});

test('it grabs the main portion of text from html', t => {
  const result = normalize(HTML);
  t.same(result.filter(w => !/^\w+$/.test(w)), []);
  t.ok(result.indexOf('disclaimers') === -1);
  t.ok(result.indexOf('interwiki') === -1);
});

test('it returns a unique list', t => {
  const result = normalize(HTML);
  t.same(result, uniq(result));
});
