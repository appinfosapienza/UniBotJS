const { MessageEmbed } = require("discord.js");

module.exports.baseEmbedGenerator = () =>
  //objects destracturing
  {
    return new MessageEmbed()
      .setColor("#822434")
      .setAuthor(
        "Unibot",
        "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png",
        "https://github.com/appinfosapienza/UniBotJS"
      )
      .setTimestamp()
      .setFooter(
        "Grazie dell'utilizzo dal team di sviluppo del bot!",
        "https://coursera-university-assets.s3.amazonaws.com/1d/ce9cf75d005c26a645a53ab325a671/Logo-360x360-png-rosso.png"
      );
  };
