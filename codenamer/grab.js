export function chooseSource(spec, sources) {
  return sources.find(source => source.detect(spec));
}

export default function grab(spec, sources) {
  const source = chooseSource(spec, sources);

  if (!source) {
    return Promise.reject(new Error(`No valid sources for ${spec}.`));
  }

  return source.get(spec);
}
