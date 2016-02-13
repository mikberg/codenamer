import test from 'ava';
import { gaussian } from '../../src/score';

test('it returns density with σ=10', t => {
  const g = gaussian(10, 10);
  t.ok(g(['abcdefghij']) - 0.126156626101 < 0.001);
  t.ok(g(['abcde']) - 0.036144478534 < 0.001);
  t.ok(g(['abcdefghijabcdefghij']) - 0.00085003666025 < 0.001);
});
