const fs = require("fs"); // fs is Node's native file system module
module.exports.rss_parser = (newRssFeed, rss_feed) => {
	let d = new Date();
	let activationDate = "[" + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
		+ " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
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
			const content = activationDate + "\n" +
				"Feed Control " + "\n" +
				"newRssFeed.items.length: " + newRssFeed.items.length + "\n" +
				"rss_feed.items.length: " + rss_feed.items.length + "\n" +
				"Today: " + data + "\n" +
				"Day on RSS Feed: " + newRssFeed.items[i].pubDate.split(" ").slice(1, 4).join(" ") + "\n";
			saveDebug(content);
			if (data == newRssFeed.items[i].pubDate.split(" ").slice(1, 4).join(" ")) {
				saveDebug(activationDate + " Sending new news..." + "\n");
				sendArray.push(newRssFeed.items[i]);
			}
		}
	}
	return sendArray;
};

function saveDebug(content) {
	fs.writeFile('debug.txt', content, { flag: 'a+' }, err => { });
	console.log(content);
}
