let path = require("path");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { baseEmbedGenerator } = require("../tools/baseEmbedFactory.js");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("email")
        .setDescription("Mostra le email dei docenti"),
    async execute(interaction) {
        let data = "";
        try {
            data = fs.readFileSync(
                path.join(__dirname, "../resources/email.txt"),
                "utf8"
            );
        } catch (err) {
            console.error(err);
        }
        baseEmbed = baseEmbedGenerator();
        baseEmbed.setTitle("Email");
        baseEmbed.setDescription(data);
        await interaction.reply({ embeds: [baseEmbed] });
    },
};
