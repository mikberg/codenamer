import test from 'ava';
import parseSpecs from '../codenamer/parsespecs';

const filter = input => chain => chain
  .map(link => link(input))
  .reduce((left, right) => left * right, 1);

test('it creates prefix filters', t => {
  t.is(filter(['a'])(parseSpecs('pa')), 1);
  t.is(filter(['a'])(parseSpecs('pb')), 0);
});

test('it creates wordclass filters', t => {
  t.is(filter(['cat'])(parseSpecs('cN')), 1);
  t.is(filter(['blue'])(parseSpecs('cN')), 0);
});

test('it creates alliterate filters', t => {
  t.is(filter(['cyan', 'cat'])(parseSpecs('a')), 1);
  t.is(filter(['cyan', 'dog'])(parseSpecs('a')), 0);
});

test('it creates gausian filters', t => {
  t.ok(filter(['hello'])(parseSpecs('n10')) - 0.036144478534 < 0.001);
  t.ok(filter(['hello'])(parseSpecs('n5/5')) - 0.17841241162 < 0.001);
});

test('it creates chains of filters', t => {
  t.is(filter(['cat'])(parseSpecs('pc,cN')), 1);
  t.is(filter(['cat'])(parseSpecs('pc,cJ')), 0);
  t.is(filter(['cat'])(parseSpecs('pa,cN')), 0);
});
