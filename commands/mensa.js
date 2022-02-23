const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { giveDayFromString } = require("../tools/miscelaneous.js");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mensa")
    .setDescription("Yummy!")
    .addStringOption((option) =>
      option
        .setName("giorno")
        .setDescription(
          "Il giorno della setimana (ex. Martedì)"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    input = interaction.options.getString("giorno");
    if (input != null) {
      await interaction.deferReply({ ephemeral: true });
    }
    else {
      await interaction.deferReply();
    }
    baseEmbed = baseEmbedGenerator();
    await getHTML(input);
    if (input != null) {
      await interaction.followUp({ embeds: [baseEmbed] });
    }
    else {
      await interaction.followUp({ embeds: [baseEmbed] });
    }
  },
};
//connect to a specific URL and return the HTML source using AXIOS
async function getHTML(input) {
  const { data } = await axios
    .get("http://www.cimasristorazione.com/menu-mense/universita-roma-1/")
    .catch((err) => {
      baseEmbed.setTitle("Errore");
      baseEmbed.setDescription("C'è stato un errore durante la connessione al sito della mensa");
      return true;
    });
  //if there is no error, parse the HTML
  if (data === undefined) {
    return;
  }
  //create JSDOM object
  const { document } = new JSDOM(data).window;
  day = giveDayFromString(input);
  if (day[0] == "errore") {
    baseEmbed.setTitle("Giorno non trovato");
    baseEmbed.setDescription("Non sono riuscito a capire il giorno, controlla che tu lo abbia scritto correttamente");
    baseEmbed.setFooter("With an helping hand By GitHub Copilot",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png");
  }
  else if (day[0] != "pranzo-0") {
    let roba = document.getElementById(day[0]);
    //convert HTMLDivElement to string
    let html = roba.innerHTML;
    let menu = html.replace(/<h5>/g, "").replace(/<\/h5>/g, "\n").replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "\n").replace(/<li>/g, "-").replace(/<\/li>/g, "\n").replace(/&nbsp;/g, "");
    let d = new Date();
    if (day[2] == "errore") {
      baseEmbed.setTitle("Menu della mensa De Lollis di " + day[1])
      baseEmbed.setDescription(
        "**ATTENZIONE: Il Bot fornisce solo i giorni della settimana corrrente!** \n"
        + "(per esempio se Venerdì cercate Lunedì, vi darà i risultati del Lunedì passato) \n \n" + menu);
    }
    else {
      baseEmbed.setTitle("Menu della mensa De Lollis di oggi, \n" +
        day[1] + " " + day[2] + " " + day[3]);
      baseEmbed.setDescription(menu);
    }
    baseEmbed.setFooter("With an helping hand By GitHub Copilot",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png");
  }
  else {
    baseEmbed.setTitle("Mensa chiusa");
    baseEmbed.setDescription("Oggi la mensa è chiusa, non c'è nulla per pranzo");
    baseEmbed.setFooter("With an helping hand By GitHub Copilot",
      "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png");
  }
}