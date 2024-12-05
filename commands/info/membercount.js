const Discord = require('discord.js');
const request = require("node-fetch")
const config = {
    description: 'Check Membercount of the server',
    aliases: ["sinfo"],
    usage: '',
    rolesRequired: [],
    category: 'Misc',
    slashId: "888345995056914442",
    options:  [
      ],
      cooldown: 5
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
const loadingEmbed = new Discord.MessageEmbed()
.setDescription(`<a:Loading:931286869419888660> Loading Info`)
.setColor("#f1c40f")

const BotMessage = await message.channel.send({embeds: [loadingEmbed]})

setTimeout(async() => {
const MemberCountEmbed = new Discord.MessageEmbed()
.setTitle(`Membercount`)
.setDescription(`${message.guild.members.cache.size} Members`)
.setColor("#f1c40f")
BotMessage.edit({embeds: [MemberCountEmbed]})
}, 2000)
    },
}
