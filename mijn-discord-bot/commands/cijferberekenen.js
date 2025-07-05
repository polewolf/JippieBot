const { SlashCommandBuilder } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cijferberekenen')
        .setDescription('rekent je cijfer uit met de formule: gehaalde punten/maximale punten*9+1')
        .addStringOption(option =>
            option.setName('gehaalde-punten')
                .setDescription('Bijv: 20')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('maximale-aantal-punten')
                .setDescription('Bijv: 30')
                .setRequired(true)  

        ),
        async execute(interaction) {
            const gpunten = interaction.options.getString('gehaalde-punten');
            const mpunten = interaction.options.getString('maximale-aantal-punten');

            try {
                const resultaat = (gpunten / mpunten) * 9 + 1;
                await interaction.reply(`🧮 je hebt een: **${resultaat}**`);
            } catch (error) {
                await interaction.reply('❌ Ongeldige som.');
                console.log(error)
        }
        }
}