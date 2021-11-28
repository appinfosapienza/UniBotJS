// Require the necessary discord.js classes
const fs = require("fs"); // fs is Node's native file system module
const { Client, Collection, Intents } = require("discord.js");
const { token, AdminChannel } = require("./config.json");

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
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Utilize this command if you need to restart the bot
client.on("messageCreate", async (message) => {
  if (message.content === "!restartBot" && message.channel == AdminChannel) {
    console.log("Restarting bot...");
    client.destroy();
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
