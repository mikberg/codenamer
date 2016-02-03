import test from 'ava';
import grab, { chooseSource } from '../codenamer/grab';

const res = Promise.resolve('data');
const get = () => res;

const detect = () => true;
const neglect = () => false;

test('chooseSource returns a source if it detects', t => {
  const source = { detect };
  t.is(chooseSource('hi', [source]), source);
  t.is(chooseSource('hi', [source, source]), source);
});

test('chooseSource returns undefined if no sources detect', t => {
  const source = { detect: neglect };
  t.is(chooseSource('hi', [source]), undefined);
  t.is(chooseSource('hi', [source, source]), undefined);
});

test('chooseSource returns the first source which detects', t => {
  const sourceOne = { detect };
  const sourceTwo = { ...sourceOne };
  t.is(chooseSource('hi', [sourceOne, sourceTwo]), sourceOne);
});

test('chooseSource returns returns the one which detects', t => {
  const sourceOne = { detect: neglect };
  const sourceTwo = { detect };
  t.is(chooseSource('hi', [sourceOne, sourceTwo]), sourceTwo);
});

test('grab returns a promise', t => {
  const source = { detect, get };
  t.same(grab('hi', [source]), res);
});

test('grab returns a promise even if no sources detect', t => {
  const source = { detect: neglect, get };
  t.plan(1);
  return grab('hi', [source]).catch(() => t.pass());
});
