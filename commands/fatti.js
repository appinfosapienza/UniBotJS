const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");
const readline = require('readline');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fatti")
    .setDescription("Il bot dirà soltanto a te un fatto curioso!"),
  async execute(interaction) {
    let fattiArray = [];

    const fileStream = fs.createReadStream('../resources/fatti.txt');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
      terminal: true
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      fattiArray.push(line);
    }
    rl.close();
    const randomFactLineNumber = Math.floor(Math.random() * fattiArray.length);
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Fatto curioso #"+randomFactLineNumber);
    baseEmbed.setDescription(fattiArray[randomFactLineNumber]);
    await interaction.reply({ embeds: [baseEmbed], ephemeral: true });
  },
};