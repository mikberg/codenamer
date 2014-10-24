# Codenamer

Generate codenames e.g. for project releases easily. Make sure they stick to a
common theme of your choice.

**Examples of Batman related codenames:**

 - `constant-eyes`
 - `off-again-fantasies`
 - `petty-justice`
 - `eligible-reports`
 - `sexual-wheelchair`
 - `better-death`
 - `darker-cloud`

## Install

```sh
$ npm install codenamer
```

## Usage

```
Generate codenames e.g. for project releases easily. Make sure they stick to
a common theme of your choice.

Usage
  codename
  codename <theme>

Example
  codename batman
  codename artificial_intelligence

Arguments
  theme     Name of a Wikipedia article from which to generate codenames.
```

## API

### Install

```sh
$ npm install --save codenamer
```

### Usage

```javascript
var Codename = require('Codename');

// Generate from text
var text = 'this is a long text form which to generate code words. it could ' +
           'be an article or something like that.';
console.log(Codename.fromText(text).toString()); // 'long-article'

// Generate from HTML
var html = '<html><p>This could be some cool HTML with text in it, pulled '+
           'from the internet somewhere.</p></html>';
console.log(Codename.fromHtml(html).toString()); // 'cool-internet'

// Generate from URL
Codename.fromUrl('https://docs.angularjs.org/api').then(function(codename) {
  console.log(codename.toString()); // 'accidental-collisions'
});

// Generate from theme
Codename.fromTheme('star_wars').then(function(codename) {
  console.log(codename.toString()); // 'sleek-force'
});
```

## License
MIT © [Mikael Berg](https://github.com/mikberg)
