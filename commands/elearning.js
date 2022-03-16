let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { getJSON } = require("../tools/miscelaneous.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elearning")
    .setDescription("Mostra i link agli elearning o alle dispense dei prof"),
  async execute(interaction) {
    jsonData = await (getJSON())
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Link elearning e dispense");

    data = ""
    for (obj in jsonData) {
      jsonObj = jsonData[obj]
      data += "**" + jsonObj['nome'] + "**" + "\n"

      // check if no link has been specified
      if (jsonObj['urlRisorse'].length == 0) {
        data += "Nessun link disponibile :("
      }
      else {
        for (index in jsonObj['urlRisorse'])
          data += "- " + jsonObj['urlRisorse'][index] + "\n"
      }

      data += "\n"
    }

    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
  },
};
