import test from 'ava';
import { direct } from '../../codenamer/sources';

const FIXTURE = 'this is some text';

test('detects when it should', t => {
  t.ok(direct.detect(FIXTURE));
});

test('rejects when it should', t => {
  t.notOk(direct.detect('file.html'));
  t.notOk(direct.detect('http://url.com'));
});

test('it returns the text from spec', async t => {
  const result = await direct.get(FIXTURE);
  t.is(typeof result, 'string');
  t.ok(result.indexOf('text') !== -1);
});
