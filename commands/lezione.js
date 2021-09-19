const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lezione')
		.setDescription('Risponde con il link della lezione corrente!'),
	async execute(interaction) {
        const orari=require("../resources/orariLezioni.json");
        const dayObject= new Date();
        const day=correctDay(orari[dayObject.getDay]);
        const orario=correctOrario(orari[day][dayObject.getHours]);
		await interaction.reply(orari[day][orario]);
	},
};

function correctDay(day){
    return day != undefined ? day : "altroGiorno";
}

function correctOrario(orario){
    return orario != undefined ? orario : "fuoriOrario";
}