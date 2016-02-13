# Codenamer

[![Build Status](https://travis-ci.org/mikberg/codenamer.svg?branch=develop)](https://travis-ci.org/mikberg/codenamer) [![codecov.io](https://codecov.io/github/mikberg/codenamer/coverage.svg?branch=develop)](https://codecov.io/github/mikberg/codenamer?branch=develop)

Generate codenames e.g. for project releases easily. Make sure they stick to a
common theme of your choice.

```sh
bash-3.2$ codenamer http://en.wikipedia.org/wiki/Batman --prefix a
1: 	 apparent-aliases
2: 	 animated-artist
3: 	 academic-attention
4: 	 able-actuality
5: 	 artistic-adventure
6: 	 aristocratic-adversary
7: 	 animated-aid
8: 	 akin-aid
9: 	 animated-arc
10: 	 apparent-artist
```

## Install

```sh
$ npm install codenamer
```

## Usage

```
Usage
codename <url>
codename <url> --prefix <prefix>

Example
codename http://en.wikipedia.org/wiki/Batman
codename http://en.wikipedia.org/wiki/Batman --prefix a
codename http://en.wikipedia.org/wiki/Batman --count 10

Arguments
url      URL to find text at

Options
--prefix  Start every part of this
--count   Limit number of codenames returned (default: 10)
```

## License
MIT © [Mikael Berg](https://github.com/mikberg)
