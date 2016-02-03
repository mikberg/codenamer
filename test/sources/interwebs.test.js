import test from 'ava';
import fs from 'fs';
import fetchMock from 'fetch-mock';
import { interwebs } from '../../codenamer/sources';

const FIXTURE = '../fixtures/batman.html';
const MOCK_URL = 'http://mockurl';

test.before(() => {
  fetchMock.mock(MOCK_URL, () =>
    fs.readFileSync(FIXTURE, { encoding: 'utf-8' }));
});

test('detects when it should', t => {
  t.ok(interwebs.detect(MOCK_URL));
  t.ok(interwebs.detect('http://en.wikipedia.org'));
  t.ok(interwebs.detect('https://en.wikipedia.org'));
});

test('rejects when it should', t => {
  t.notOk(interwebs.detect('file.html'));
  t.notOk(interwebs.detect('/file.html'));
});

test('it fetches the spec url, returns string', async t => {
  const result = await interwebs.get(MOCK_URL);
  t.is(typeof result, 'string');
  t.ok(result.indexOf('batman') !== -1);
  t.ok(result.length > 1000);
});
