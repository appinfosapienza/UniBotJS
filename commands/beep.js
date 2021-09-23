const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Risponde con Boop, soltanto a te! ♥"),
  async execute(interaction) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Beep?");
    baseEmbed.setDescription("BOOP!");
    await interaction.reply({ embeds: [baseEmbed], ephemeral: true }); // This response will be visible only to the user who invoked this command
  },
};
