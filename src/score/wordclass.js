import pos from 'pos';

const tagger = new pos.Tagger();

export default function wordclass(wc) {
  return words => {
    const tags = tagger.tag(words.slice(words.length - 1));
    return tags[0][1].startsWith(wc);
  };
}
