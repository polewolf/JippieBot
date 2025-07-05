const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Laat de bot iets zeggen')
        .addStringOption(option =>
            option.setName('tekst')
                .setDescription('Wat moet ik zeggen?')
                .setRequired(true)
        ),
    async execute(interaction) {
        const tekst = interaction.options.getString('tekst');
        await interaction.reply(tekst);
    },
};
