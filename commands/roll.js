const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies with each individual roll and the sum!')
        .addStringOption(option => option.setName('input').setDescription('Enter a roll. Ex: 2d6 (rolls two times a six-faced dice)').setRequired(true)),

	async execute(interaction) { //TODO: Handling error in the input format (maybe change to ask for 2 integers instead of a string?)
        await interaction.deferReply();
        const rawRollInput = parseInt(interaction.option.getString(input));
        const timesToRoll = parseInt(rawRollInput.split("d")[0]);
        const dice = rawRollInput.split("d")[1];
        const eachRollString = "";
        const sumOfRolls=0;
        for(let i=0; i<timesToRoll; i++){
            let rolledNumber=Math.floor(Math.random() * dice);
            sumOfRolls+=rolledNumber;
            eachRollString+=rolledNumber+" ";
        }

		await interaction.reply("Each individual roll: "+eachRollString+"\nThe sum of all the rolls: "+sumOfRolls);
	},
};