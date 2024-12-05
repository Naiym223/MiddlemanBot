const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.sendStatus(200);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is currently listening on port: ' + listener.address().port);
});

// Required libraries and configurations
const Discord = require('discord.js');
const { MongoClient } = require('mongodb');
const roblox = require('noblox.js');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');
const date = require('date-and-time');
const config = require('./config.js');
const utils = require('./utils.js');

const client = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS'],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

let commandList = [];
client.commandList = commandList;
client.config = config;
client.utils = utils;
const cooldowns = new Discord.Collection();

// MongoDB connection details
const mongoURL = 'mongodb+srv://notsure:Naiym224@cluster1.0j9choj.mongodb.net/MiddleManBot?retryWrites=true&w=majority';
let dbClient; // MongoDB client

// Connect to MongoDB
async function connectToMongo() {
    try {
        dbClient = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        await dbClient.connect();
        console.log(chalk.green('Connected to MongoDB successfully!'));
        return dbClient.db('MiddleManBot'); // Return the specific database object
    } catch (err) {
        console.error(chalk.red('Failed to connect to MongoDB:', err));
        process.exit(1); // Exit if the database connection fails
    }
}

// Command registration
function registerCommands(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.error(chalk.red('An error occurred while reading the commands folder:', err));
        }
        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                registerCommands(filePath);
            } else if (file.endsWith('.js')) {
                const commandFile = require(filePath);
                commandList.push({
                    file: commandFile,
                    name: file.split('.')[0],
                });
            }
        });
    });
}
registerCommands('./commands');

// Bot ready event
client.on('ready', async () => {
    console.log(`${chalk.hex(client.config.colors.info)(figlet.textSync('Bot Ready', { horizontalLayout: 'full' }))}`);
    console.log(`${chalk.hex('#60bf85')(`Bot started! ${client.user.id}`)}\n`);

    // Update activity periodically
    setInterval(async () => {
        const now = new Date();
        const currentTime = date.format(date.addHours(now, -5), 'hh:mm A', true);
        client.user.setActivity({ name: `🕐 ${currentTime}`, type: 'WATCHING' });
    }, 60000);
});

// Message command handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();
    const command = commandList.find(
        (cmd) => cmd.name === commandName || cmd.file.config.aliases.includes(commandName)
    );

    if (!command) return;

    // Cooldown logic
    if (command.file.config.cooldown) {
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.file.config.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - now) / 1000);
                return message.reply(`Please wait ${timeLeft} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.file.run(client, message, args);
    } catch (err) {
        console.error(err);
        message.reply('There was an error executing that command.');
    }
});

// Interaction handler
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand() || interaction.isButton()) {
        try {
            const db = await connectToMongo();
            // Button interaction logic
            if (interaction.isButton()) {
                const dbo = db.collection('Test');
                if (interaction.customId === 'LimitedMMRequest') {
                    const ticketCount = await dbo.findOne({ TicketNumber: 'MMBotTicketCount' });
                    const newTicketNumber = Number(ticketCount.Value) + 1;

                    const channel = await interaction.guild.channels.create(`LimitedMM-Request-${newTicketNumber}`, {
                        parent: '905164406797778984',
                    });

                    interaction.reply({ content: `Your channel has been created: <#${channel.id}>`, ephemeral: true });
                    dbo.updateOne({ TicketNumber: 'MMBotTicketCount' }, { $set: { Value: newTicketNumber } });
                }
            }

            // Slash command logic
            if (interaction.isCommand()) {
                const command = commandList.find((cmd) => cmd.file.config.slashId === interaction.commandId);
                if (command) {
                    const args = interaction.options.data.map((arg) => arg.value);
                    await command.file.runInteractions(client, interaction, args);
                }
            }
        } catch (err) {
            console.error(err);
            interaction.reply({ content: 'An error occurred while handling this interaction.', ephemeral: true });
        }
    }
});

// Close MongoDB connection on process exit
process.on('SIGINT', async () => {
    if (dbClient) await dbClient.close();
    process.exit(0);
});

// Login to Discord
client.login(config.token);