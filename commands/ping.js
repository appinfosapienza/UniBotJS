const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Risponde con Pong!"),
  async execute(interaction) {
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Ping?");
    baseEmbed.setDescription("Pong!");
    baseEmbed.setImage(
      "https://www.dagospia.com/img/foto/11-2018/luigi-di-maio-ping-pong-1078295.jpg"
    );
    await interaction.reply({ embeds: [baseEmbed], ephemeral: true });
  },
};
