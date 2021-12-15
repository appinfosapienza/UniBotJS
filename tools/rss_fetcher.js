let Parser = require("rss-parser");
const { RSSLink } = require("../config.json");
let parser = new Parser();
//const rssFeed = "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30";
//const rssFeed = "https://www.gasparini.cloud/sapienza-feed";
//const empty = "https://lorem-rss.herokuapp.com/feed?length=0";
const rssFeed = RSSLink;

module.exports.rss_fetcher = async () => {
	let feed = await parser.parseURL(rssFeed);
	if (feed.items.length == 0) {
		throw new Error("RSS Feed is empty!");
	}
	return feed;
};
