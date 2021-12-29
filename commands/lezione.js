const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lezione")
    .setDescription("Risponde con il link della lezione corrente!"),
  async execute(interaction) {
    /*
    const rawJsonOrari = require("../resources/orariLezioni.json");
    const dayObject = new Date();
    const day = correctDay(rawJsonOrari[dayObject.getDay()], rawJsonOrari);
    const orario = correctOrario(day[dayObject.getHours()], day);
    const minuto = correctMinuto(dayObject.getMinutes());
    const minutoNomeLezione = correctMinutoPerNomeLezione(dayObject.getMinutes());
    */
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("I corsi sono terminati");
    baseEmbed.setDescription("Buona fortuna con gli esami!");
    await interaction.reply({ embeds: [baseEmbed] });
  },
};

function correctDay(day, rawJsonOrari) {
  return day != undefined ? day : rawJsonOrari["altroGiorno"];
}

function correctOrario(orario, day) {
  return orario != undefined ? orario : day["fuoriOrario"];
}

function correctMinuto(minutaggio) {
  return minutaggio < 40 ? "lezioneInCorso" : "possibilePreLezione";
}

function correctMinutoPerNomeLezione(minutaggio) {
  return minutaggio < 40 ? "nomeLezione" : "nomeProssimaLezione";
}
