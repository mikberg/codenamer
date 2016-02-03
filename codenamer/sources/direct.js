export default {
  detect: spec => typeof(spec) === 'string' && spec.split(' ').length > 1,
  get: spec => Promise.resolve(spec),
};
