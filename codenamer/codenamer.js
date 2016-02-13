import normalize from './normalize';
import parseSpecs from './parsespecs';
import arrange from './arrange';

export default function codenamer(textSpecs, input) {
  const words = normalize(input);

  const filters = (Array.isArray(textSpecs) ? textSpecs : [textSpecs])
    .map(parseSpecs);

  const scores = arrange(words, filters);

  return scores;
}
