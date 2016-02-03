import test from 'ava';
import { prefix } from '../../codenamer/filters';

test('it returns 0 for non-matching words', t => {
  const p = prefix('a');
  t.notOk(p(['b']));
  t.notOk(p(['b', 'bb']));
  t.notOk(p(['bbba']));
  t.notOk(p(['a', 'b']));
  t.notOk(p(['b', 'a']));
});

test('it returns 1 for matching words', t => {
  const p = prefix('a');
  t.ok(p(['a']));
  t.ok(p(['a', 'aa']));
  t.ok(p(['aab']));
  t.ok(p(['a', 'ab']));
});
