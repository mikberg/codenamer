import test from 'ava';
import arrange from '../codenamer/arrange';
import words from './fixtures/words';
import { prefix } from '../codenamer/score';

const onlyLength = length => wo => {
  const total = wo
    .map(w => w.length)
    .reduce((le, ri) => le + ri, 0);
  return total === length ? 1 : 0;
};

test('it returns empty list for no filters', t => {
  t.same(arrange(words, []), []);
});

test('it can filter using a single filter on single words', t => {
  const filters = [[prefix('a')]];
  const results = arrange(words, filters);
  t.ok(results.length);
  t.ok(results.every(rel => rel.words[0].startsWith('a')));
});

test('it can use a series of filters for single words', t => {
  const filters = [[prefix('a'), onlyLength(4)]];
  const results = arrange(words, filters);
  t.ok(results.length);
  t.ok(results.every(rel => rel.words[0].startsWith('a')));
  t.ok(results.every(rel => rel.words[0].length === 4));
});

test('it can create multi-word solutions', t => {
  const filters = [
    [prefix('a'), onlyLength(4)],
    [prefix('b'), onlyLength(10)],
  ];
  const results = arrange(words, filters);
  t.ok(results.length);
  t.ok(results.every(rel => rel.words.length === 2));
  t.ok(results.every(rel => rel.words[0].length === 4));
  t.ok(results.every(rel => rel.words[1].length === 6));
});


test('it can handle non-filtered positions', t => {
  const filters = [
    [prefix('a'), onlyLength(4)],
    [],
  ];
  const results = arrange(words, filters);
  t.ok(results.length > words.length);
  t.ok(results.every(rel => rel.words.length === 2));
  t.ok(results.every(rel => rel.words[0].length === 4));
});
