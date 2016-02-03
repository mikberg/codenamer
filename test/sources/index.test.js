import test from 'ava';
import sources, * as sourcelibs from '../../codenamer/sources';

test('sources is an array of all sources', t => {
  t.ok(Array.isArray(sources));

  t.plan(Object.keys(sourcelibs).length);
  sources.forEach(source => t.ok(source.get && source.detect));
});
