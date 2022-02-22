// TODO: given a course, return prof + meeting link / directions
// TODO: given a prof, return course name + meeting link / directions 
let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ricevimenti")
    .setDescription("Mostra i link dei ricevimenti dei prof"),
  async execute(interaction) {
    let data = "";

    data = ""
    for (obj in jsonData) {
      jsonObj = jsonData[obj]
      data += "**" + jsonObj['nome'] + "** - **" + jsonObj['prof'][0] + "**" + "\n" + "- " + jsonObj["ricevimento"].toString() + "\n"
    }

    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link ricevimenti dei professori");
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
  }
}