const { token, adminChannel, newsChannel, newsInoltrerChannel } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js"); // Require the necessary discord.js classes
const fs = require("fs");
const { baseEmbedGenerator } = require("./tools/baseEmbedFactory.js");
const { rss_sender } = require("./tools/rss_tools.js");
const { formattedDate, saveDebug } = require("./tools/miscelaneous.js");
jsonData = require('./resources/lezioni.json');

let channel;
let rss_feed = JSON;
let startupChannel;

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
	if (typeof newsChannel !== "undefined" && newsChannel !== "") {
		channel = await client.channels.fetch(newsChannel);
	}
	else {
		saveDebug("[WARN] Undefined news channel. Check config.json");
	}
	if (typeof adminChannel !== "undefined" && adminChannel !== "") {
		startupChannel = await client.channels.fetch(adminChannel);
		await startupChannel.send("Bot succesfully started!");
	}
	else {
		saveDebus("[WARN] Undefined admin channel. Check config.json");
	}
	let welcome = formattedDate() + ` Logged in as ${client.user.tag}!` + "\n";

	saveDebug(welcome);
});

client.on("messageCreate", async (message) => {
	// Utilize this command if you need to restart the bot
	if (message.content === "!restartBot" && message.channel == adminChannel) {
		await message.reply("Restarting...");
		saveDebug(formattedDate() + " Restarting..." + "\n");
		client.destroy();
		process.exit(0);
	}
	// Utilize this command if you need to send a news outside the RSS feed
	else if (message.channel == newsInoltrerChannel && message.content.startsWith("!news")) {
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

// RSS Feed Parser
if (typeof newsChannel !== "undefined" && newsChannel !== "") {
	var intervalId = setInterval(async function () {
		rss_feed = await rss_sender(rss_feed, channel);
	}, 90000);
}
