const { SlashCommandBuilder } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reken')
        .setDescription('Reken een wiskundige som uit')
        .addStringOption(option =>
            option.setName('som')
                .setDescription('Bijv: 5 + 3 * 2')
                .setRequired(true)
        ),
    async execute(interaction) {
        const som = interaction.options.getString('som');

        try {
            const resultaat = evaluate(som);
            await interaction.reply(`🧮 Het antwoord is: **${resultaat}**`);
        } catch (error) {
            await interaction.reply('❌ Ongeldige som. Probeer iets als `5 + 3 * 2`.');
        }
    },
};
