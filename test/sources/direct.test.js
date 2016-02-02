import test from 'ava';
import { direct } from '../../codenamer/sources';

const FIXTURE = 'this is some text';
let source;

test.beforeEach(() => source = direct());

test('detects when it should', t => {
  t.ok(source.detect(FIXTURE));
});

test('rejects when it should', t => {
  t.notOk(source.detect('file.html'));
  t.notOk(source.detect('http://url.com'));
});

test('it returns the text from spec', async t => {
  const result = await source.get(FIXTURE);
  t.is(typeof result, 'string');
  t.ok(result.indexOf('text') !== -1);
});
