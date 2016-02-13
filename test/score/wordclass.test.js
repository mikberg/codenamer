import test from 'ava';
import { wordclass } from '../../src/score';

test('it scores nouns', t => {
  const w = wordclass('NN');
  t.notOk(w(['run']));
  t.notOk(w(['walk']));
  t.notOk(w(['green']));
  t.notOk(w(['the']));
  t.ok(w(['army']));
  t.ok(w(['eyeglasses']));
  t.ok(w(['friendship']));
});

test('it scores adjectives', t => {
  const w = wordclass('J');
  t.notOk(w(['word']));
  t.notOk(w(['bottle']));
  t.ok(w(['slow']));
  t.ok(w(['blue']));
  t.ok(w(['heavy']));
});
