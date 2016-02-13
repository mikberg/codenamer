import gauss from 'gaussian';

export default function gaussian(mean, variance = 10) {
  const dist = gauss(mean, variance);
  return words => dist.pdf(
    words.map(w => w.length).reduce((l, r) => l + r, 0)
  );
}
