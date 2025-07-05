const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Geeft Pong terug'),
    async execute(interaction) {
        await interaction.reply('🏓 Pong!');
    },
};
