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
.setTitle("No TransactionID provided,")
if(!TransactionID) return message.reply({embeds: [NoArgs]})
const loadingEmbed = new Discord.MessageEmbed()
.setDescription(`<a:Loading:931286869419888660> Loading Info`)
.setColor("#f1c40f")

const BotMessage = await message.channel.send({embeds: [loadingEmbed]})

setTimeout(async() => {
if(TransactionID){
let response = await request(`https://chain.so/api/v2/get_confidence/BTC/${TransactionID}`, {method: "GET"})
let Data = await response.json()
const TransactionEmbed = new Discord.MessageEmbed()
.setTitle(`Transaction Data for ${TransactionID}`)
.addField("Status", `${Data.status}`, true)
.addField("Confirmations", `${Data.data.confirmations}`, true)
.setFooter(`Transaction ID: ${Data.data.txid}`)
.setColor("#f1c40f")
BotMessage.edit({embeds: [TransactionEmbed]})
}
}, 2000)
    },
}
