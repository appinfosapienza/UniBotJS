const { SlashCommandBuilder } = require('@discordjs/builders');
import embed from '../tools/baseEmbedFactory';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Risponde con Pong!'),
	async execute(interaction) {
		embed.setTitle("Pong?");
		embed.setDescription("Pong!");
		await interaction.reply({embeds: [embed]});
	},
};