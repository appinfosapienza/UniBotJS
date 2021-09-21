const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Risponde con Pong!"),
  async execute(interaction) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Pong?");
    baseEmbed.setDescription("Pong!");
    await interaction.reply({ embeds: [baseEmbed] });
  },
};