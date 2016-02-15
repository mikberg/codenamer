#!/usr/bin/env node

import meow from 'meow';
import getStdin from 'get-stdin';
import codenamer from './';

const minimistOptions = {
  string: 'format',
  alias: {
    f: 'format',
    c: 'count',
  },
};

const defaults = {
  format: 'cJ,n15-cN,a,n20',
  count: 1,
};

const cli = meow(`
    Usage
      $ <input> | codenamer

    Takes input from stdin and returns one or more codenames based on a format.
    The input may be HTML, in which case the main body of text is analyzed.

    Options
      -f, --format    specify format based on a score system, e.g. 'pa' for a
                      word with prefix 'a' (see below). Create multi-word
                      codenames using dashes (-) between specs, e.g. 'pa-pb' for
                      two words, the first starting with 'a', the next with 'b.'
                      Default: cJ,n15-cN,a,n20
      -c, --count     number of codenames to create
                      Default: 1

    Score systems
      p<string>       Prefix. Words starting with prefix, e.g. 'pa' for words
                      starting with 'a'.
      n<integer>      Normal. Award combinations with this many letters, e.g.
                      'n10' to increase probabilities of words with around 10
                      letters. Adjust variance like 'n10/2'.
      c<letter>       Word class. Restrict this word to a word class:
                        - J for adjective
                        - N for noun
                        - R for adverb
                        - V for verb
      a               Alliterate (word rhyme) up to and including this word,
                      e.g. allow 'cheshire cat' but not 'cheshire dog'.

    Examples
      $ cat myfile.txt | codenamer
      $ curl -s https://en.wikipedia.org/wiki/Batman | codenamer
      $ curl -s https://en.wikipedia.org/wiki/Batman | codenamer --format pa-a,n15
`, minimistOptions);

getStdin().then(input => {
  if (!input) {
    /* eslint no-console:0 */
    console.error('ERR: No input given');
    console.log(cli.help);
    process.exit(0);
  }

  const options = Object.assign({}, defaults, cli.flags);
  const output = codenamer(options.format.split('-'), input, options.count);

  console.log(output.map(code => code.join('-')).join('\n'));
});
