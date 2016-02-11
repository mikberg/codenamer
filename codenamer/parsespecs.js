import {
  prefix,
  wordclass,
  alliterate,
} from './score';

function parse(spec) {
  const score = spec.substring(0, 1);
  const config = spec.slice(1);

  switch (score) {
    case 'p':
      return prefix(config);
    case 'c':
      return wordclass(config.toUpperCase());
    case 'a':
      return alliterate();
    default:
      throw new Error(`No score named ${score}, check help.`);
  }
}

export default function parseSpecs(chainSpec) {
  const spec = chainSpec.split(',');
  return spec.map(parse);
}
