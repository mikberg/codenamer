import test from 'ava';
import { prefix } from '../../src/score';

test('it returns 0 when the last word doesn\'t match', t => {
  const p = prefix('a');
  t.notOk(p(['b']));
  t.notOk(p(['b', 'bb']));
  t.notOk(p(['bbba']));
  t.notOk(p(['a', 'b']));
});

test('it returns 1 when the last word matches', t => {
  const p = prefix('a');
  t.ok(p(['a']));
  t.ok(p(['a', 'aa']));
  t.ok(p(['aab']));
  t.ok(p(['b', 'ab']));
});
