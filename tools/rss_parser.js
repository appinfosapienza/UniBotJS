let d = new Date();

module.exports.rss_parser = (newRssFeed, rss_feed) => {
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
		if (count == rss_feed.items.length) 
		{
			data = d.getDate() + " " + d.toLocaleString('en-GB', { month: 'short' }) + " " + d.getFullYear();
			if (data == newRssFeed.items[i].pubDate.split(" ").slice(1, 4).join(" ")) {
			console.log("Sending new news...");
			sendArray.push(newRssFeed.items[i]);
			}
		}
	}
	return sendArray;
};
