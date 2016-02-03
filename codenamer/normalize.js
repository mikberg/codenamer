import unfluff from 'unfluff';
import slug from 'slug';
import uniq from 'lodash.uniq';

const SLUG_OPTIONS = {
  lower: true,
  remove: /[\d.]/g,
};

export default function normalize(source) {
  let text = source;

  if (/^\s*<!doctype/i.test(text)) {
    text = unfluff(source.split('<').join(' <')).text;
  }

  text = text.split('/').join(' / ');

  return uniq(
    text.split(' ')
      .map(w => slug(w, SLUG_OPTIONS))
      .map(w => w.split('-').join(''))
      .filter(w => w.length > 0)
  );
}
