function direct() {
  this.detect = spec => typeof(spec) === 'string' && spec.split(' ').length > 1;
  this.get = spec => Promise.resolve(spec);
}

export default function create() {
  const source = {};
  direct.call(source);
  return source;
}
