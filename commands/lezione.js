const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lezione')
		.setDescription('Risponde con il link della lezione corrente!'),
	async execute(interaction) {
        const orari=require("../resources/orariLezioni.json");
        const dayObject= new Date();
        const day=correctDay(orari[dayObject.getDay()]);
        const orario=correctOrario(day[dayObject.getHours()]);
        const minuto=correctMinuto(dayObject.getMinutes());
		await interaction.reply(orario[minuto]);
	},
};

function correctDay(day){
    return day != undefined ? day : "altroGiorno";
}

function correctOrario(orario){
    return orario != undefined ? orario : "fuoriOrario";
}

function correctMinuto(minutaggio){
    return minutaggio < 40 ? "lezioneInCorso" : "possibilePreLezione";
}