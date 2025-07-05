const { SlashCommandBuilder } = require('discord.js');
//const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ja')
        .setDescription('ja'),
    async execute(interaction) {
        await interaction.reply('NEE!');
    },
}