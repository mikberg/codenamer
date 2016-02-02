const URLS = /^https?:\/\//i;

function interwebs() {
  this.detect = (spec) => URLS.test(spec);
  this.get = (spec) => fetch(spec)
    .then(response => {
      if (response.status >= 400) {
        throw new Error(`Couldn't get ${spec}`);
      }
      return response.text();
    });
}

export default function create() {
  const source = {};
  interwebs.call(source);
  return source;
}
