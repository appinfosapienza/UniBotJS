const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lezione")
    .setDescription("Risponde con il link della lezione corrente!"),
  async execute(interaction) {
    const orari = require("../resources/orariLezioni.json");
    const dayObject = new Date();
    const day = correctDay(orari[dayObject.getDay()], orari);
    const orario = correctOrario(day[dayObject.getHours()], day);
    const minuto = correctMinuto(dayObject.getMinutes());
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle(orario["nomeLezione"]);
    baseEmbed.setDescription(orario[minuto]);
    await interaction.reply({ embeds: [baseEmbed] });
  },
};

function correctDay(day, orari) {
  return day != undefined ? day : orari["altroGiorno"];
}

function correctOrario(orario, day) {
  return orario != undefined ? orario : orario["fuoriOrario"];
}

function correctMinuto(minutaggio) {
  return minutaggio < 40 ? "lezioneInCorso" : "possibilePreLezione";
}
