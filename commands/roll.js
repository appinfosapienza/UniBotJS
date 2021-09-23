const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Risponde con ogni singolo roll e la somma di essi!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription(
          "Inserisci un lancio. Ex: 2d6 (lancia due volte un dado a 6 facce)"
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    //TODO: Handling error in the input format (maybe change to ask for 2 integers instead of a string?)
    await interaction.deferReply();
    const rawRollInput = interaction.options.getString("input");
    const timesToRoll = parseInt(rawRollInput.split("d")[0]);
    const dice = parseInt(rawRollInput.split("d")[1]);
    let eachRollString = "";
    let sumOfRolls = 0;
    for (let i = 0; i < timesToRoll; i++) {
      let rolledNumber = Math.floor(Math.random() * dice+1);
      sumOfRolls += rolledNumber;
      eachRollString += rolledNumber + " ";
    }
    baseEmbed = baseEmbedGenerator();
    baseEmbed.setTitle("Roll");
    baseEmbed.setDescription(
      "Ogni singolo lancio: " +
        eachRollString +
        "\nLa somma di tutti i lanci: " +
        sumOfRolls
    ),
      await interaction.followUp({ embeds: [baseEmbed] });
  },
};
