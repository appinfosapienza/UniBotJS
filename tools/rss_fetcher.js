let Parser = require("rss-parser");
let parser = new Parser();
const rssFeed = "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30";
//const rssFeed = "https://www.gasparini.cloud/sapienza-feed";

module.exports.rss_fetcher = async () => {
  let element = ["", ""];
  let feed = await parser.parseURL(rssFeed);
  return feed;
};
