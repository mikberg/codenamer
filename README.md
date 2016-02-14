![codenamer](codenamer.png)

> Who wouldn't like a fancy codename for their releases?

[![Build Status](https://travis-ci.org/mikberg/codenamer.svg?branch=develop)](https://travis-ci.org/mikberg/codenamer) [![codecov.io](https://codecov.io/github/mikberg/codenamer/coverage.svg?branch=develop)](https://codecov.io/github/mikberg/codenamer?branch=develop)

Generates fancy codenames for your releases (or your dog?) from any input source, according to your specifications. Use this to maintain a consistent theme, such as Batman, astronomy or anything you'd like. Impress your friends with memorable and badass codenames!

```sh
$ codenamer https://en.wikipedia.org/wiki/Batman | codenamer --format pa,cJ-cN,a,n25 --count 5
autobiographical-approach
aristocratic-alternative
animated-apartment
apparent-antiheroine
aristocratic-aftermath
```

## Install

```sh
$ npm install --global codenamer
```

## Usage

```
codenamer 🐯 $ babel-node src/cli.js --help

  Codename generator

  Usage
    $ <input> | codenamer

  Takes input from stdin and returns one or more codenames based on a format.
  The input may be HTML, in which case the main body of text is analyzed.

  Options
    -f, --format    specify format based on a score system, e.g. 'pa' for a
                    word with prefix 'a' (see below). Create multi-word
                    codenames using dashes (-) between specs, e.g. 'pa-pb' for
                    two words, the first starting with 'a', the next with 'b.'
                    Default: cJ,n15-cN,a,n30
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
```

## API

```js
import codenamer from 'codenamer';

const text = 'this is ideally an awesomely large and badass piece of text';
console.log(codenamer(['pa', 'pb']));
// [ ['awesomely', 'badass']]
```

## License
MIT © [Mikael Berg](https://github.com/mikberg)
