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
        str = "";
        if (interaction.options.getString("corso") != null) {
            input = interaction.options.getString("corso").toString().toLowerCase();
            jsonObj = null
            for (obj in jsonData) {
                jsonObjc = jsonData[obj]
                if (jsonObjc.nome.toLowerCase() == input) {
                    jsonObj = jsonData[obj]
                    break;
                }
                for (i in jsonObjc.alias) {
                    if (jsonObjc.alias[i].toLowerCase() == input) {
                        jsonObj = jsonData[obj];
                        break;
                    }
                }
            }
            if (jsonObj == null) {
                str = altro();
            }
            else {
                str += "**" + jsonObj['nome'] + "**" + "\n" + "- " + jsonObj["email"].toString();
            }
        }
        else {
            str = altro();
        }

        function altro() {
            for (obj in jsonData) {
                jsonObj = jsonData[obj]
                str += "**" + jsonObj['nome'] + "**" + "\n" + "- " + jsonObj["email"].toString() + "\n"
            }
            return str
        }

        baseEmbed.setTitle("Email");
        baseEmbed.setDescription(str);
        await interaction.reply({ embeds: [baseEmbed] });
    },
};
