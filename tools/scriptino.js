const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports.rss_fetcher = async () => {
  const response = await fetch(
    "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30"
  );
  const string = await response.text();
  console.log(string.substring(0, 1000));
  return string.substring(0, 1000);
};
