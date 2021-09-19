const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Risponde con Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};