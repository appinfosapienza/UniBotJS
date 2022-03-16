const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { getJSON } = require("../tools/miscelaneous.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calendario")
    .setDescription("Mostra il calendario delle lezioni"),
  async execute(interaction) {
    jsonData = await (getJSON())
    baseEmbed = baseEmbedGenerator();
    let allInfo = "**INFORMAZIONI SULLE LEZIONI**\n\n"
    for (obj in jsonData) {
      let info = jsonData[obj]["urlInfo"];
      if (info != "") {
        allInfo += "**" + jsonData[obj]["nome"] + "**\n " + info + "\n\n";
      }
    }
    if (allInfo != "**INFORMAZIONI SULLE LEZIONI**\n\n") {
      baseEmbed.setDescription(allInfo);
    }
    baseEmbed.setTitle("Calendario");
    baseEmbed.setImage("https://i.imgur.com/koI335j.jpg");
    await interaction.reply({ embeds: [baseEmbed] });
  },
};
