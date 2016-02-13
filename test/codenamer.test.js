import test from 'ava';
import codenamer from '../codenamer';

const text = 'this is my sample text';

test('returns empty array when no matching words', t => {
  const codenames = codenamer(['pa', 'a'], text, 1);
  t.same(codenames, []);
});

test('returns array of codenames', t => {
  const codenames = codenamer(['pt', 'a'], text, 1);
  t.ok(codenames.length === 1);
  t.ok(codenames[0].length === 2);
});
