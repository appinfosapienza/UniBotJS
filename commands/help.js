let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Mostra un breve riassunto di tutti i comandi del bot"),
  async execute(interaction) {
    let data = "";
    try {
      data = fs.readFileSync(
        path.join(__dirname, "../resources/help.txt"),
        "utf8"
      );
    } catch (err) {
      console.error(err);
    }
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("UniBot 4.0 Help");
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
    delete require.cache[require.resolve("../tools/baseEmbedFactory.js")];
  },
};
