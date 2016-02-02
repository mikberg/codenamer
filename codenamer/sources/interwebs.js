const URLS = /^https?:\/\//i;

function interwebs() {
  this.detect = (source) => URLS.test(source);
  this.get = (source) => fetch(source)
    .then(response => {
      if (response.status >= 400) {
        throw new Error(`Couldn't get ${source}`);
      }
      return response.text();
    });
}

export default function create() {
  const source = {};
  interwebs.call(source);
  return source;
}
