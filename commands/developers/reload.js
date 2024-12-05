const Discord = require('discord.js');
const rbx = require("noblox.js")
const config = {
    description: 'Reload a command',
    aliases: ["rel"],
    usage: '',
    rolesRequired: [],
    category: 'Developers',
    slashId: "888874495694237696",
    options:  [
        {
            "type": 3,
            "name": "command",
            "description": "Name a command to reload",
            "required": true
          }
      ],
      cooldown: 10
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
        
    if(message.author.id !== '473330467626811393') return message.channel.send("You don't meet the permissions required for this command: `This command is reserved for the bot developers.`")
    if(!args[0]) return message.channel.send("Please provide a command for me to reload")
    try {
        const cmd = client.commandList.find(n => n.name === args[0])
        delete require.cache[require.resolve(`../${cmd.file.config.category}/${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`Unable to reload: ${args[0]}.js`);
        console.log(e)
    }
    message.channel.send(`**Successfully reloaded:** ${args[0]}.js`);
},
runInteractions: async(client, interaction, args) => {
interaction.reply({content: "Attempting to Reload, This could take a minute. ", ephemeral: true})
const cmd = client.commandList.find(n => n.name === interaction.options._hoistedOptions[0].value)
if(!cmd)  return interaction.followUp("That is not a valid command")
if(interaction.user.id !== '534169523956219905') return interaction.reply({content: "You don't meet the permissions required for this command: `This command is reserved for the bot developers.`", ephemeral: true })
    if(!interaction.options._hoistedOptions[0].value) return interaction.reply({content: "Please provide a command for me to reload", ephemeral: true })
    try {
        delete require.cache[require.resolve(`../${cmd.file.config.category}/${interaction.options._hoistedOptions[0].value}.js`)];
    } catch (e) {
        return interaction.editReply({content: `Unable to reload: ${interaction.options._hoistedOptions[0].value}.js`, ephemeral: true});
        console.log(e)
    }
   await interaction.followUp(`**Successfully reloaded:** ${interaction.options._hoistedOptions[0].value}.js`);
},
}