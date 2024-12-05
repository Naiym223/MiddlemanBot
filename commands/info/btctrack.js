const Discord = require('discord.js');
const request = require("node-fetch")
const config = {
    description: 'Check status of a BTC Payment',
    aliases: ["btcinfo"],
    usage: '[TransactionID]',
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
let TransactionID = args[0]
let NoArgs = new Discord.MessageEmbed()
.setTitle("No TransactionID to track,")
if(!TransactionID) return message.reply({embeds: [NoArgs]})
const loadingEmbed = new Discord.MessageEmbed()
.setDescription(`<a:Loading:931286869419888660> Loading Info`)
.setColor("#f1c40f")

const BotMessage = await message.channel.send({embeds: [loadingEmbed]})

setTimeout(async() => {
    client.BTCTransactions.push({
        "id": TransactionID,
        "user": message.author.id,
        "channel": message.channel.id
});
if(TransactionID){
let response = await request(`https://chain.so/api/v2/get_confidence/BTC/${TransactionID}`, {method: "GET"})
let Data = await response.json()
const TransactionEmbed = new Discord.MessageEmbed()
.setTitle(`Transaction added to the Tracking list`)
.setDescription("You will be notified when it passes 1 Confirmation")
.setColor("#f1c40f")
BotMessage.edit({embeds: [TransactionEmbed]})
}
}, 2000)
    },
}
