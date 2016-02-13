import candies from 'candies';
import normalize from './normalize';
import parseSpecs from './parsespecs';
import arrange from './arrange';

export default function codenamer(textSpecs, input, count = 1) {
  const words = normalize(input);

  const filters = (Array.isArray(textSpecs) ? textSpecs : [textSpecs])
    .map(parseSpecs);

  const scores = arrange(words, filters);

  if (scores.length === 0) {
    return [];
  }

  return candies.urn(
    count,
    scores.map(score => score.words),
    scores.map(score => score.score));
}
