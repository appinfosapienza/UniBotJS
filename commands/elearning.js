let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elearning")
    .setDescription("Mostra i link agli elearning o alle dispense dei prof"),
  async execute(interaction) {
    let data = "";
    try {
      data = fs.readFileSync(
        path.join(__dirname, "../resources/elearning.txt"),
        "utf8"
      );
    } catch (err) {
      console.error(err);
    }
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link elearning e dispense");
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
  },
};
