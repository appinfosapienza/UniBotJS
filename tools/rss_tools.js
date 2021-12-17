const fs = require("fs"); // fs is Node's native file system module
let Parser = require("rss-parser");
const { RSSLink } = require("../config.json");
const { formattedDate, saveDebug } = require("./miscelaneous.js");
const { baseEmbedGenerator } = require("./baseEmbedFactory.js");
const { send } = require("process");
let parser = new Parser();
//const rssFeed = "https://lorem-rss.herokuapp.com/feed?unit=second&interval=30";
//const rssFeed = "https://www.gasparini.cloud/sapienza-feed";
//const empty = "https://lorem-rss.herokuapp.com/feed?length=0";
const rssFeed = RSSLink;


//SENDER
module.exports.rss_sender = async (rss_feed, channel) => {
	let newRssFeed = JSON;
	let backupFeed = rss_feed;
	try {
		newRssFeed = await rss_fetcher();
		if (rss_feed == JSON) {
			let content = formattedDate() + " RSS Feed is empty, fetching... " + "\n";
			saveDebug(content);
			rss_feed = newRssFeed;
		}
		else if (JSON.stringify(newRssFeed.items) != JSON.stringify(rss_feed.items)) {
			saveDebug(formattedDate() + " RSS Feed has changed, fetching... " + "\n");
			let sendArray = rss_parser(newRssFeed, rss_feed);
			sendArray.reverse();
			for (let x = 0; x < sendArray.length; x++) {
				let sendStatus = true;
				for (let y = 0; y < sendArray.length; y++) {
					if (y != x) {
						if (sendArray[x].title == sendArray[y].title) {
							sendStatus = false;
						}
					}
				}
				if (sendStatus) {
					baseEmbed = baseEmbedGenerator();
					baseEmbed.setTitle(sendArray[x].title);
					baseEmbed.setDescription(sendArray[x].link);
					baseEmbed.setFooter(
						"Using RSS feed from https://www.gasparini.cloud/sapienza-feed",
						"https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
					);
					channel.send({ embeds: [baseEmbed] });
				}
				else {
					saveDebug(formattedDate() + " Blocked a news" + "\n");
				}
				rss_feed = newRssFeed;
			}
		}
	}
	catch (error) {
		content = formattedDate() + "Error while fetching RSS feed! " + "\n" + error + "\n";
		saveDebug(content);
		rss_feed = backupFeed;
	}
	return rss_feed;
}


//FETCHER
async function rss_fetcher() {
	let feed = await parser.parseURL(rssFeed);
	if (feed.items.length == 0) {
		throw new Error("RSS Feed is empty!");
	}
	return feed;
};


//PARSER
function rss_parser(newRssFeed, rss_feed) {
	let d = new Date();
	let sendArray = [];
	for (let i = 0; i < newRssFeed.items.length; i++) {
		let count = 0;
		for (let j = 0; j < rss_feed.items.length; j++) {
			if (
				newRssFeed.items[i].title == rss_feed.items[j].title &&
				newRssFeed.items[i].link == rss_feed.items[j].link
			) {
				break;
			}
			count++;
		}
		if (count == rss_feed.items.length) {
			const fs = require('fs')
			data = d.getDate() + " " + d.toLocaleString('en-GB', { month: 'short' }) + " " + d.getFullYear();
			const content = formattedDate() + "\n" +
				"Feed Control " + "\n" +
				"newRssFeed.items.length: " + newRssFeed.items.length + "\n" +
				"rss_feed.items.length: " + rss_feed.items.length + "\n" +
				"Today: " + data + "\n" +
				"Day on RSS Feed: " + newRssFeed.items[i].pubDate.split(" ").slice(1, 4).join(" ") + "\n";
			saveDebug(content);
			if (data == newRssFeed.items[i].pubDate.split(" ").slice(1, 4).join(" ")) {
				saveDebug(formattedDate() + " Sending new news..." + "\n");
				sendArray.push(newRssFeed.items[i]);
			}
		}
	}
	return sendArray;
};

