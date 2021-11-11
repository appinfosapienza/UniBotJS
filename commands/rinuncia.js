const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rinuncia")
    .setDescription("Non credo ci sia bisogno di descrizione"),
  async execute(interaction) {
    console.log(
      interaction.user.username + "#" + interaction.user.discriminator
    );
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Rinuncia agli studi");
    baseEmbed.setDescription(
      "Non potevate sopportare il vostro fallimento. Dove vi ha condotto? Dritto a me \nhttps://www.uniroma1.it/it/content/rinuncia-agli-studi"
    );
    await interaction.reply({ embeds: [baseEmbed], ephemeral: true }); // This response will be visible only to the user who invoked this command
  },
};
