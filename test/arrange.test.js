import test from 'ava';
import arrange from '../codenamer/arrange';
import words from './fixtures/words';
import { prefix } from '../codenamer/score';

const onlyLength = length => wo => {
  const total = wo.reduce((le, ri) => le.length + ri.length, '');
  return total === length ? 1 : 0;
};

test('it returns empty list for no filters', t => {
  t.same(arrange(words, []), []);
});

test('it can filter using a single filter on single words', t => {
  const filters = [[prefix('a')]];
  const results = arrange(words, filters);
  t.ok(results.length);
  t.ok(results.filter(comb => !comb[0].startsWith('a')).length === 0);
});

test('it can use a series of filters for single words', t => {
  const filters = [[prefix('a'), onlyLength(4)]];
  const results = arrange(words, filters);
  t.ok(results.length);
  t.ok(results.filter(comb => !comb[0].startsWith('a')).length === 0);
  t.ok(results.filter(comb => comb[0].length !== 4).length === 0);
});
