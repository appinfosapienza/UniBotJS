const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Risponde con Boop, soltanto a te!'),
	async execute(interaction) {
		await interaction.reply({content: 'Boop!', ephemeral: true}); // This response will be visible only to the user who invoked this command
	},
};