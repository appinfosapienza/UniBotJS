// Require the necessary discord.js classes
const fs = require("fs"); // fs is Node's native file system module
const { Client, Collection, Intents } = require("discord.js");
/*Create a config.json file in the same directory as the bot
with the following format:
{
  "token": "your_token_here",
  "adminChannel": "your_admin_channel_id_here",
  "newsChannel": "your_news_channel_id_here",
}
*/
const { token, adminChannel, newsChannel } = require("./config.json");
const { baseEmbedGenerator } = require("./tools/baseEmbedFactory.js");
const { rss_fetcher } = require("./tools/rss_fetcher.js");
let channel;
let rss_feed = ["", ""];

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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

// Utilize this command if you need to restart the bot
client.on("messageCreate", async (message) => {
  if (message.content === "!restartBot" && message.channel == adminChannel) {
    await message.reply("Restarting...");
    console.log("Restarting bot...");
    client.destroy();
    process.exit(0);
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
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);

// RSS Feed Fetcher
var intervalId = setInterval(async function () {
  let newRssFeed = await rss_fetcher();
  if (
    newRssFeed[1] != rss_feed[1] &&
    newRssFeed[0] != rss_feed[0] &&
    rss_feed[0] != ""
  ) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle(newRssFeed[0]);
    baseEmbed.setDescription(newRssFeed[1]);
    baseEmbed.setFooter(
      "Using RSS feed from https://www.gasparini.cloud/sapienza-feed",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
    );
    channel.send({ embeds: [baseEmbed] });
    rss_feed[0] = newRssFeed[0];
    rss_feed[1] = newRssFeed[1];
    console.log("New RSS Feed fetched! " + rss_feed[0] + " " + rss_feed[1]);
  }
  if (rss_feed[0] == "") {
    console.log("RSS Feed is empty, fetching...");
    rss_feed[0] = newRssFeed[0];
    rss_feed[1] = newRssFeed[1];
    console.log("RSS Feed fetched! " + rss_feed[0] + " " + rss_feed[1]);
  }
}, 10000);
