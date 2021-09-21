let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ricevimenti")
    .setDescription("Mostra i link dei ricevimenti dei prof"),
  async execute(interaction) {
    let data = "";
    try {
      data = fs.readFileSync(
        path.join(__dirname, "../resources/ricevimenti.txt"),
        "utf8"
      );
    } catch (err) {
      console.error(err);
    }
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link ricevimenti dei professori");
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
	}   
}