const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Replies with Boop!'),
	async execute(interaction) {
		await interaction.reply({content: 'Boop!', ephemeral: true}); // This response will be visible only to the user who invoked this command
	},
};