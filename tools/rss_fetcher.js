let Parser = require("rss-parser");
const {RSSLink} = require("../config.json");
let parser = new Parser();
//const rssFeed = "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30";
//const rssFeed = "https://www.gasparini.cloud/sapienza-feed";
const rssFeed = RSSLink;

module.exports.rss_fetcher = async () => {
	let feed = await parser.parseURL(rssFeed);
	return feed;
};
