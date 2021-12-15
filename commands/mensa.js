const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { giveDay, giveDayOfWeek, giveMonth } = require("../tools/miscelaneous.js");
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
    .catch((err) => {
      baseEmbed.setTitle("Errore");
      baseEmbed.setDescription(
        "C'è stato un errore durante la connessione al sito della mensa"
      );
      return true;
    });
  //if there is no error, parse the HTML
  if (data === undefined) {
    return;
  }
  //create JSDOM object
  const { document } = new JSDOM(data).window;
  let day = giveDay();
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
      .replace(/<\/li>/g, "\n")
      .replace(/&nbsp;/g, "");
    let d = new Date();
    let date = d.getDate() + "/" + (d.getMonth() + 1);
    baseEmbed.setTitle(
      "Menu della mensa De Lollis di oggi, \n" +
      giveDayOfWeek() +
      " " +
      d.getDate() +
      " " +
      giveMonth()
    );
    baseEmbed.setDescription(menu);
    baseEmbed.setFooter(
      "With an helping hand By GitHub Copilot",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
    );
  } else {
    baseEmbed.setTitle("Mensa chiusa");
    baseEmbed.setDescription(
      "Oggi la mensa è chiusa, non c'è nulla per pranzo"
    );
    baseEmbed.setFooter(
      "With an helping hand By GitHub Copilot",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
    );
  }
}