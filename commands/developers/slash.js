const Discord = require('discord.js');
const rbx = require("noblox.js")

const config = {
    description: 'Shows current status of Group Funds',
    aliases: ["slash"],
    usage: '',
    rolesRequired: [],
    category: 'Developers',
    slashId: "888345991810531349",
    options:  [
      ],
      cooldown: 60
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
        if(message.author.id !== '473330467626811393') return message.channel.send("You don't meet the permissions required for this command: `This command is reserved for the bot developers.`")
        const Buttons = new Discord.MessageActionRow()
.addComponents(
new Discord.MessageButton()
.setCustomId(`LimitedMMRequest`)
.setLabel(`👑 Limiteds`)
.setStyle("DANGER"),
new Discord.MessageButton()
.setCustomId(`GroupsMMRequest`)
.setLabel(`📝Groups`)
.setStyle("DANGER"),
new Discord.MessageButton()
.setCustomId(`CryptoMMRequest`)
.setLabel("💵 Crypto Exchange")
.setStyle("DANGER"),
new Discord.MessageButton()
.setCustomId(`gameItemsMMRequest`)
.setLabel("🕹 Game Items")
.setStyle("DANGER")
)
const InfoEmbedForChannels = new Discord.MessageEmbed()
.setTitle("Middleman Request")
.addField("What We MM:", `👑 Limiteds \n 📝Groups \n 💵 Crypto Exchange \n 🕹 Game Items \n`,true)
.addField("Availability:", `✅ - Available \n 🕕 - AFK/ Idle \n ❌ - Unavailable`, true)
.addField("Middleman Fees:", `<#905904938985603173>`, true)
.addField("Terms of Service:", `[Terms of service](https://google.com/)`,true)
.addField("MM Subscription", "[MM Subscriptions](https://google.com/)", true)
.addField("Deal Vouches:", "<#905904849802129408>", true)
.addField("Server Middlemen:", `${message.member} -Main Middleman, DiscordID: 534169523956219905`)
.setColor("#5b57d9")
message.channel.send({embeds: [InfoEmbedForChannels], components: [Buttons]})
}, 
    runInteraction: async(client, interaction, args) => {

    }
}