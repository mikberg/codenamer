import test from 'ava';
import interwebs from '../../codenamer/sources/interwebs';

test('detects when it should', t => {
  const source = interwebs();
  t.ok(source.detect('http://en.wikipedia.org'));
  t.ok(source.detect('https://en.wikipedia.org'));
});

test('rejects when it should', t => {
  const source = interwebs();
  t.notOk(source.detect('file.html'));
  t.notOk(source.detect('/file.html'));
});
