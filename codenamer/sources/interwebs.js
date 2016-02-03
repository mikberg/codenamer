const URLS = /^https?:\/\//i;

export default {
  detect: (spec) => URLS.test(spec),
  get: (spec) => fetch(spec)
    .then(response => {
      if (response.status >= 400) {
        throw new Error(`Couldn't get ${spec}`);
      }
      return response.text();
    }),
};
