let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docenti")
    .setDescription("Mostra i link ai siti dei prof"),
  async execute(interaction) {
    let data = "";
    try {
      data = fs.readFileSync(
        path.join(__dirname, "../resources/docenti.txt"),
        "utf8"
      );
    } catch (err) {
      console.error(err);
    }
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link siti dei professori");
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
	}   
}