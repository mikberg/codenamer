#!/usr/bin/env node

import meow from 'meow';
import getStdin from 'get-stdin';
import codenamer from './';

const minimistOptions = {
  string: 'word',
  alias: {
    w: 'word',
    c: 'count',
  },
};

const defaults = {
  word: ['cJ,n15', 'cN,a,n30'],
  count: 1,
};

const cli = meow(`
    Usage
      $ <input> | codenamer

    Defaults
      --word cJ,n15 --word cN,a,n30
        'codenames have two wirds where the first is an adjective with around 15
        letters, the next is a noun which alliterates and the total has around
        30 letters'
      --count 10
        return 10 codenames

    Options
      -w, --word      specify based on a score system, e.g. 'pa' for a word with
                      prefix 'a', or 'l5' to allow only words with length 5. Can
                      be repeated, and scores can combined like 'pa,l5'.

    Score systems
      p<string>       words starting with prefix, e.g. 'pa' for words starting
                      with a.
      l<integer>      words of exact length, e.g. 'l4' for words with length 4.

    Examples
      $ curl http://example.com | codenamer --word -pa --word -pb
`, minimistOptions);

getStdin().then(input => {
  if (!input) {
    /* eslint no-console:0 */
    console.error('ERR: No input given');
    console.log(cli.help);
    process.exit(0);
  }

  const options = Object.assign({}, defaults, cli.flags);
  const output = codenamer(options.word, input, options.count);

  console.log(output.map(code => code.join('-')).join('\n'));
});
