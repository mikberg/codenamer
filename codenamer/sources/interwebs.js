const URLS = /^https?:\/\//i

function interwebs() {
  this.detect = (source) => URLS.test(source);
}

export default function create() {
  const source = {};
  interwebs.call(source);
  return source;
}
