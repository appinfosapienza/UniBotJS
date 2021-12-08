let Parser = require("rss-parser");
let parser = new Parser();
//const rssFeed = "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30";
const rssFeed = "https://www.gasparini.cloud/sapienza-feed";

module.exports.rss_fetcher = async () => {
  let element = ["", ""];
  let feed = await parser.parseURL(rssFeed);
  element[0] = feed.items.at(0).title;
  element[1] = feed.items.at(0).link;
  return element;
};
