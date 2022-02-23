let jsonData = require('../resources/lezioni.json');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docenti")
    .setDescription("Mostra i link ai siti dei prof"),
  async execute(interaction) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link siti dei professori");

    // taking data from json
    str = ""
    for (obj in jsonData) {
      str += "**" + jsonData[obj]['nome'] + "**" + "\n" + "- " + jsonData[obj]["urlDocente"].toString() + "\n"
    }

    baseEmbed.setDescription(str);
    await interaction.reply({ embeds: [baseEmbed] });
  }
}