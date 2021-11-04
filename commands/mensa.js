let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder().setName("mensa").setDescription("Yummy!"),
  async execute(interaction) {
    await interaction.deferReply();
    let returne = await getHTML(
      "http://www.cimasristorazione.com/menu-mense/universita-roma-1/"
    );
    console.log(returne);
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link ricevimenti dei professori");
    baseEmbed.setDescription("Funziona");
    await interaction.followUp({ embeds: [baseEmbed] });
  },
};
//connect to a specific URL and return the HTML source using AXIOS
async function getHTML(url) {
  await axios
    .get(url)
    .then(function (response) {
      let ret = response.data;
      return ret;
    })
    .catch(function (error) {
      console.log(error);
    });
}
