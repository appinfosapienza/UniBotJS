let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("mensa").setDescription("Yummy!"),
  async execute(interaction) {
    await interaction.deferReply();
    await getHTML(
      "http://www.cimasristorazione.com/menu-mense/universita-roma-1/"
    );
    await interaction.followUp({ embeds: [baseEmbed] });
  },
};
//connect to a specific URL and return the HTML source using AXIOS
async function getHTML(url) {
  await axios
    .get(url)
    .then(function (response) {
      let ret = response.data;
      console.log(ret);
      baseEmbed = baseEmbedGenerator();
      baseEmbed.setTitle("Link ricevimenti dei professori");
      baseEmbed.setDescription("Funziona");
    })
    .catch(function (error) {
      console.log(error);
      baseEmbed = baseEmbedGenerator();
      baseEmbed.setTitle("Link ricevimenti dei professori");
      baseEmbed.setDescription("Errore bruh");
    });
}
