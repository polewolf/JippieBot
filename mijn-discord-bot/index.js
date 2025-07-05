require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

// Maak de bot client aan met alle nodige intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1390716168909619280';
const GUILD_ID = '1390645098823290981'; // testserver voor snelle updates

client.commands = new Collection();

// ⬇️ Slash commands laden vanuit ./commands map
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(__dirname, 'commands', file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[⚠] Command in ${file} mist "data" of "execute".`);
    }
}

// ⬇️ Slash commands registreren bij Discord
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('📡 Slash commands registreren...');
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('✅ Slash commands geregistreerd!');
    } catch (error) {
        console.error(error);
    }
})();

// ⬇️ Slash command uitvoeren bij gebruik
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Fout bij uitvoeren van command.', ephemeral: true });
    }
});

// ⬇️ Klassieke !commands afhandelen
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const prefix = '.';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.reply('🏓 Pong!');
    }

    if (command === 'say') {
        const tekst = args.join(' ');
        if (!tekst) return message.reply('⚠️ Geef wat tekst op.');
        message.channel.send(tekst);
    }

    // voeg hier meer !commands toe
});

// Bot online
client.once('ready', () => {
    console.log(`🤖 Ingelogd als ${client.user.tag}`);
});

client.login(TOKEN);
