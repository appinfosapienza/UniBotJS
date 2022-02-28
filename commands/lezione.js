// TODO: untested if lectures overlaps each other

const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const { giveDayOfWeek } = require("../tools/miscelaneous.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lezione")
    .setDescription("Risponde con il link della lezione corrente!"),
  async execute(interaction) {
    const today = new Date();

    rightNow = ""
    nextLecture = ""

    var hh = String(today.getHours()).padStart(2, '0');
    var doW = giveDayOfWeek();
    var doWShort = doW.slice(0, 3).toUpperCase()

    baseEmbed = baseEmbedGenerator();
    title = ""
    data = ""

    for (obj in jsonData) {
      //retrieve the right object
      jsonObj = jsonData[obj]

      //retrieve info of the current lecture
      info = "**Informazioni e Avvisi**\n" + jsonObj["urlInfo"] + "\n\n"

      // both strings are checked against null because otherwise it would count every "next lecture".
      // could be useful for future development

      // current mode: check what's up right now
      if (rightNow === "" && onTime(jsonObj, hh, doWShort, "current")) {
        if (info != "**Informazioni e Avvisi**\n\n\n") {
          rightNow += info
        }
        rightNow += "**" + jsonObj["nome"] + "**" + " - " + jsonObj["urlLezione"]
      }


      /* TO FIX Issue#16
        info = "**Informazioni e Avvisi**\n" + jsonObj["urlInfo"]
        if (info != "**Informazioni e Avvisi**\n") {
          rightNow += info + "\n\n" + "**" + jsonObj["nome"] + "**" + " - " + jsonObj["urlLezione"]
        }
        else {
          rightNow += "**" + jsonObj["nome"] + "**" + " - " + jsonObj["urlLezione"]
        }
      }


      /*
      // next mode: check what's up next
      if (nextLecture === "" && onTime(jsonObj, hh, doWShort, "next")) {
        nextLecture += "**Prossima lezione: **" + jsonObj["nome"] + " - " + jsonObj["urlLezione"] + "\n"
      }
      */
    }


    // managing title and data
    // no lectures at all
    if (rightNow === "" && nextLecture === "") {
      title = "Non c'è lezione"
      data += "Non ci sono lezioni a quest'ora."
    }

    // last lecture of the day
    if (rightNow !== "" && nextLecture === "") {
      title = "Lezione di oggi"
      data += rightNow //+ "Non ci sono altre lezioni."
    }

    /* TO FIX Issue#16
    // "we're almost there" + next hours
    if (rightNow === "" && nextLecture !== "") {
      title = "Ora non c'è lezione, ma..."
      data += nextLecture
    }

    /*
    // rn + next hour
    if (rightNow !== "" && nextLecture !== "") {
      title = "Lezione di oggi"
      data += rightNow //+ "\n" + nextLecture
    }
    */

    baseEmbed.setTitle(title);
    baseEmbed.setDescription(data);

    await interaction.reply({ embeds: [baseEmbed] });
  },
};

// return true if while I am calling the command I am in time
function onTime(jsonObj, currentHH, doWShort, mode) {
  if (mode === "") {
    mode = "current"
  }

  // if "quando" hasnt been specified, go on
  if (jsonObj['quando'].length != 0) {
    for (index in jsonObj['quando']) {
      // json "quando" is structured in this way
      // list containing tuples: "Day of week three letters", "start (hh)", "end (hh)"
      shortDay = jsonObj['quando'][index][0]
      start = parseInt(jsonObj['quando'][index][1])
      end = parseInt(jsonObj['quando'][index][2])

      if (mode === "current" && shortDay.toUpperCase() === doWShort && currentHH >= start - 1 && currentHH < end) {
        return true
      }

      /*TO FIX Issue#16
      if (mode === "next" && shortDay.toUpperCase() === doWShort && currentHH >= 8 && start > currentHH && currentHH <= 19) {
        return true
      }
      */
    }
  }

  return false
}
