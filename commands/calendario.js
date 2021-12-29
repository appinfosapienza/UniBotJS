const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calendario")
    .setDescription("Mostra il calendario delle lezioni"),
  async execute(interaction) {
    /*
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Calendario");
    baseEmbed.setDescription(
      "**ATTENZIONE:**\n Il **lunedì** la prima lezione è quella di Sistemi Operativi (2 ore) \n Seguirà poi la lezione di Probabilità (3 ore)"
    );
    baseEmbed.setImage("https://i.imgur.com/kc2qetL.jpg");
    */
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("I corsi sono terminati");
    baseEmbed.setDescription("Buona fortuna con gli esami!");
    await interaction.reply({ embeds: [baseEmbed] });
  },
};
