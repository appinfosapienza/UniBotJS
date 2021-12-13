// Require the necessary discord.js classes
const fs = require("fs"); // fs is Node's native file system module
const { Client, Collection, Intents } = require("discord.js");
/*Create a config.json file in the same directory as the bot
with the following format:
{
  "token": "your_token_here",
  "adminChannel": "your_admin_channel_id_here",
  "newsChannel": "your_news_channel_id_here",
  "newsInoltrerChannel": "your_news_inoltrer_channel_id_here",
}
*/
const {token, adminChannel, newsChannel, newsInoltrerChannel} = require("./config.json");
const { baseEmbedGenerator } = require("./tools/baseEmbedFactory.js");
const { rss_fetcher } = require("./tools/rss_fetcher.js");
const { rss_parser } = require("./tools/rss_parser.js");
let channel;

let rss_feed = JSON;

// Create a new client instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// Create a collection and then populate it with commands
client.commands = new Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const channelID = newsChannel;
	channel = await client.channels.fetch(channelID);
});

client.on("messageCreate", async (message) => {
	// Utilize this command if you need to restart the bot
	if (message.content === "!restartBot" && message.channel == adminChannel) {
		await message.reply("Restarting...");
		console.log("Restarting bot... " + getDate());
		client.destroy();
		process.exit(0);
	// Utilize this command if you need to send a news outside the RSS feed
	} else if (message.channel == newsInoltrerChannel && message.content.startsWith("!news")) {
		messaggio = message.content.split("\n");
		baseEmbed = baseEmbedGenerator();
		baseEmbed.setTitle(messaggio[1]);
		baseEmbed.setDescription(messaggio.slice(2).join("\n"));
		await channel.send({ embeds: [baseEmbed] });
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return; // If command does not exist in the map, it returns null, so we exit early

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true
		});
	}
});

// Login to Discord with your client's token
client.login(token);

// RSS Feed Fetcher
var intervalId = setInterval(async function () {
	let newRssFeed = JSON;
	try 
	{
		newRssFeed = await rss_fetcher();
		let sendArray = [];
		if (rss_feed == JSON) 
		{
			console.log("RSS Feed is empty, fetching... " + getDate());
			console.log("RSS Feed fetched! " + getDate());
			rss_feed = newRssFeed;
		}
		else if (JSON.stringify(newRssFeed.items) != JSON.stringify(rss_feed.items))
		{
			console.log("RSS Feed has changed, fetching..." + getDate());
			let sendArray = rss_parser(newRssFeed, rss_feed);
			sendArray.reverse();
			for (let x = 0; x < sendArray.length; x++) 
			{
				baseEmbed = baseEmbedGenerator();
				baseEmbed.setTitle(sendArray[x].title);
				baseEmbed.setDescription(sendArray[x].link);
				baseEmbed.setFooter(
					"Using RSS feed from https://www.gasparini.cloud/sapienza-feed",
					"https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
				);
				channel.send({ embeds: [baseEmbed] });
			}
			rss_feed = newRssFeed;
		}
	} 
	catch (error) 
	{
		console.log("Error in the RSS Feed control " + getDate());
	}
}, 10000);

function getDate()
{
	let d = new Date();
	return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() 
	+ " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()	
}