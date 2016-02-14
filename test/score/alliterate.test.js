import test from 'ava';
import { alliterate } from '../../src/score';

test('it returns 0 for non-matching words', t => {
  const a = alliterate(a);
  t.notOk(a(['a', 'b']));
  t.notOk(a(['a', 'a', 'c']));
});

test('it returns 1 for matching words', t => {
  const a = alliterate(a);
  t.ok(a(['a', 'a']));
  t.ok(a(['a', 'aa']));
  t.ok(a(['alcohol', 'anatomy']));
});
