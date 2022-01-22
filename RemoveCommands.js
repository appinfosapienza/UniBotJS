//Useful script for removing slash commands in a specific guild

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, 'GuildId-Here'),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();
