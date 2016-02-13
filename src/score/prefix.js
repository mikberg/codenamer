export default function prefix(pre) {
  return words => words[words.length - 1].startsWith(pre) ? 1 : 0;
}
