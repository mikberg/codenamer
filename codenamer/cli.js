#!/usr/bin/env node

import meow from 'meow';
import getStdin from 'get-stdin';
import codenamer from './';

const minimistOptions = {
  alias: {
    w: 'word',
  },
};

const cli = meow(`
    Usage
      $ <input> | codenamer

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

if (!cli.flags.word) {
  /* eslint no-console:0 */
  console.log(cli.help);
  process.exit(0);
}

getStdin().then(input => codenamer(cli.flags.word, input));
