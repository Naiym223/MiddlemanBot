const Discord = require('discord.js');
const _ = require('lodash');

const config = {
    description: 'Shows a list of commands.',
    aliases: ["cmds"],
    usage: '[command name]',
    rolesRequired: [],
    category: 'info',
    slashId: "888345992943009802",
    options:  [
      ]
}

module.exports = {
    config: config,
    run: async (client, message, args) => {
        let embed = new Discord.MessageEmbed();

        let commandQuery = args[0];
        if(commandQuery) {
            let command = client.commandList.find(c => c.name.toLowerCase() === commandQuery.toLowerCase() || c.file.config.aliases.map(a => a.toLowerCase()).includes(commandQuery.toLowerCase()));
            if(command) {
                embed.setTitle(`${command.name} - Command Info`);
                embed.setDescription(command.file.config.description);
                if(command.file.config.aliases.length !== 0) embed.addField('Aliases', command.file.config.aliases.join(', '), true);
                embed.addField('Usage', `\`${client.config.prefix}${command.name}${command.file.config.usage ? ` ${command.file.config.usage}` : ''}\``, true);
                embed.addField('Category', command.file.config.category, true);
                if(command.file.config.rolesRequired.length !== 0) embed.addField('Roles Required', command.file.config.rolesRequired.join(', '), true);
                embed.setColor(client.config.colors.info);
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send({embeds: [embed]});
            }
        }

        let categories = _.groupBy(client.commandList, c => c.file.config.category);
        for (const categoryName of Object.keys(categories)) {
            let category = categories[categoryName];
            let commandString = category.map(c => `\`${client.config.prefix}${c.name}${c.file.config.usage ? ` ${c.file.config.usage}` : ''}\` - ${c.file.config.description}`).join('\n');
            embed.addField(`${categoryName}`, `${commandString}`);
        }
        embed.setDescription('Here is a list of the bot commands:');
        embed.setColor(client.config.colors.info);
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        return message.channel.send({embeds: [embed]});
    }
}
