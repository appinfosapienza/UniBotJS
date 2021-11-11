const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
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
      .replace(/<\/li>/g, "\n")
      .replace(/&nbsp;/g, "");
    let d = new Date();
    let date = d.getDate() + "/" + (d.getMonth() + 1);
    baseEmbed.setTitle(
      "Menu della mensa De Lollis di oggi, \n" +
        getDayOfWeek() +
        " " +
        d.getDate() +
        " " +
        getMonth()
    );
    baseEmbed.setDescription(menu);
    baseEmbed.setFooter("With an helping hand By GitHub Copilot");
  } else {
    baseEmbed.setTitle("Mensa chiusa");
    baseEmbed.setDescription(
      "Oggi la mensa è chiusa, non c'è nulla per pranzo"
    );
    baseEmbed.setFooter("With an helping hand By GitHub Copilot");
  }
}

//get a number based on the day of the week
function getDay() {
  let d = new Date();
  let day = d.getDay();
  return "pranzo-" + day;
}

//return the month in a string format
function getMonth() {
  let d = new Date();
  let month = d.getMonth();
  switch (month) {
    case 0:
      return "Gennaio";
    case 1:
      return "Febbraio";
    case 2:
      return "Marzo";
    case 3:
      return "Aprile";
    case 4:
      return "Maggio";
    case 5:
      return "Giugno";
    case 6:
      return "Luglio";
    case 7:
      return "Agosto";
    case 8:
      return "Settembre";
    case 9:
      return "Ottobre";
    case 10:
      return "Novembre";
    case 11:
      return "Dicembre";
  }
}

//get the day of the week in a string format
function getDayOfWeek() {
  let day = getDay();
  switch (day) {
    case "pranzo-0":
      return "Domenica";
    case "pranzo-1":
      return "Lunedì";
    case "pranzo-2":
      return "Martedì";
    case "pranzo-3":
      return "Mercoledì";
    case "pranzo-4":
      return "Giovedì";
    case "pranzo-5":
      return "Venerdì";
    case "pranzo-6":
      return "Sabato";
  }
}
