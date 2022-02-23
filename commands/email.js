let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("email")
        .setDescription("Mostra le email dei docenti.")

        .addStringOption((option) =>
            option
                .setName("corso")
                .setDescription(
                    "Nome del corso (ex. SO2)"
                )
                .setRequired(false)
        ),
    async execute(interaction) {
        baseEmbed = baseEmbedGenerator();

        str = ""
        for (obj in jsonData) {
            jsonObj = jsonData[obj]
            str += "**" + jsonObj['nome'] + "**" + "\n" + "- " + jsonObj["email"].toString() + "\n"
        }

        baseEmbed.setTitle("Email");
        baseEmbed.setDescription(str);
        await interaction.reply({ embeds: [baseEmbed] });
    },
};
