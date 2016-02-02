import test from 'ava';
import fs from 'fs';
import fetchMock from 'fetch-mock';
import interwebs from '../../codenamer/sources/interwebs';

const FIXTURE = '../fixtures/batman.html';
const MOCK_URL = 'http://mockurl';
let source;

test.beforeEach(() => source = interwebs());
test.before(() => {
  fetchMock.mock(MOCK_URL, () =>
    fs.readFileSync(FIXTURE, { encoding: 'utf-8' }));
});

test('detects when it should', t => {
  t.ok(source.detect(MOCK_URL));
  t.ok(source.detect('http://en.wikipedia.org'));
  t.ok(source.detect('https://en.wikipedia.org'));
});

test('rejects when it should', t => {
  t.notOk(source.detect('file.html'));
  t.notOk(source.detect('/file.html'));
});

test('it fetches the source url, returns string', async t => {
  const result = await source.get(MOCK_URL);
  t.is(typeof result, 'string');
  t.ok(result.indexOf('batman') !== -1);
  t.ok(result.length > 1000);
});
