const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calendario")
    .setDescription("Mostra il calendario delle lezioni"),
  async execute(interaction) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Calendario");
    baseEmbed.setImage("https://i.imgur.com/bJAOE5C.png");
    await interaction.reply({ embeds: [baseEmbed] });
  },
};
