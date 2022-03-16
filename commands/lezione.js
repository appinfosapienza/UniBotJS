const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { giveDayOfWeek, getJSON } = require("../tools/miscelaneous.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lezione")
    .setDescription("Risponde con il link della lezione corrente!"),
  async execute(interaction) {
    const today = new Date();
    let rightNow = ""
    jsonData = await (getJSON())

    let hh = String(today.getHours()).padStart(2, '0');
    let mm = today.getMinutes();
    let doWShort = giveDayOfWeek().slice(0, 3).toUpperCase()
    let baseEmbed = baseEmbedGenerator();
    let title = ""
    let data = ""

    for (obj in jsonData) {
      //retrieve the right object
      let jsonObj = jsonData[obj]
      //retrieve info of the current lecture
      let info = "**Informazioni e Avvisi**\n" + jsonObj["urlInfo"] + "\n\n"

      // current mode: check what's up right now
      if (onTime(jsonObj, hh, mm, doWShort)) {
        if (info != "**Informazioni e Avvisi**\n\n\n") {
          rightNow += info;
        }
        rightNow += "**Link** - " + jsonObj["urlLezione"]
        title = jsonObj["nome"]
      }
    }

    // managing title and data
    // no lectures at all
    if (rightNow === "") {
      title = "Non c'è lezione"
      data += "Non ci sono lezioni a quest'ora."
    }
    // there is a lecture
    else {
      data += rightNow
    }

    baseEmbed.setTitle(title);
    baseEmbed.setDescription(data);
    await interaction.reply({ embeds: [baseEmbed] });
  },
};

// return true if while I am calling the command I am in time
function onTime(jsonObj, currentHH, mm, doWShort) {
  // if "quando" hasnt been specified, go on
  if (jsonObj['quando'].length != 0) {
    for (index in jsonObj['quando']) {
      // json "quando" is structured in this way
      // list containing tuples: "Day of week three letters", "start (hh)", "end (hh)"
      shortDay = jsonObj['quando'][index][0]
      start = parseInt(jsonObj['quando'][index][1])
      end = parseInt(jsonObj['quando'][index][2])
      //if the minutes are at 30 or greater it will give the lesson of the next hour
      if (shortDay === doWShort) {
        if (currentHH >= start && currentHH < end - 1) {
          return true
        }
        if (currentHH == end - 1 && mm < 30) {
          return true
        }
        if (currentHH == start - 1 && mm >= 30) {
          return true
        }
      }

    }
  }

  return false
}
