let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  data: new SlashCommandBuilder().setName("mensa").setDescription("Yummy!"),
  async execute(interaction) {
    await interaction.deferReply();
    baseEmbed = baseEmbedGenerator();
    await getHTML();
    await interaction.followUp({ embeds: [baseEmbed] });
  },
};
//connect to a specific URL and return the HTML source using AXIOS
async function getHTML() {
  const { data } = await axios
    .get("http://www.cimasristorazione.com/menu-mense/universita-roma-1/")
    .catch(function (error) {
      baseEmbed.setTitle("C'è stato un errore");
      baseEmbed.setDescription("Come da titolo");
      baseEmbed.setFooter("With an helping hand By GitHub Copilot");
    });
  //create JSDOM object
  const { document } = new JSDOM(data).window;
  let day = getDay();
  if (day != "pranzo-0") {
    let roba = document.getElementById(day);
    //convert HTMLDivElement to string
    let html = roba.innerHTML;
    let menu = html
      .replace(/<h5>/g, "")
      .replace(/<\/h5>/g, "\n")
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "\n")
      .replace(/<li>/g, "-")
      .replace(/<\/li>/g, "\n");
    baseEmbed.setTitle("Ecco cosa ci sarà oggi a pranzo alla mensa");
    baseEmbed.setDescription(menu);
    baseEmbed.setFooter("With an helping hand By GitHub Copilot");
  } else {
    baseEmbed.setTitle("Ecco cosa ci sarà oggi a pranzo alla mensa");
    baseEmbed.setDescription("Non c'è niente a pranzo");
    baseEmbed.setFooter("With an helping hand By GitHub Copilot");
  }
}

//get a number based on the day of the week
function getDay() {
  let d = new Date();
  let day = d.getDay();
  return "pranzo-" + day;
}
