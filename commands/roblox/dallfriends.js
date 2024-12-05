const Discord = require('discord.js');
var MongoClient = require('mongodb').MongoClient;
const rbx = require("noblox.js")
const config = {
    description: 'Whois',
    aliases: ["dallfr"],
    usage: '[Username]',
    rolesRequired: [],
    category: 'Roblox',
    slashId: "888345995056914442",
    options:  [
      ],
      cooldown: 5
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
        if(message.author.id !== "473330467626811393")   return message.reply({content: "No perms"})
        const loadingEmbed = new Discord.MessageEmbed()
        .setDescription(`<a:Loading:931286869419888660> Grabbing DB Info for MM Accounts`)
        .setColor("#f1c40f")
        const PromptEmbed = new Discord.MessageEmbed()
        .setTitle("Select a MM Account to use (1-3)")
        .setFooter("Reply with the number EG: 1")

        const BotMessage = await message.channel.send({embeds: [PromptEmbed]})
        const Cookiefilter = m => m.author.id === message.author.id

message.channel.awaitMessages({ Cookiefilter, max: 1, time: 50000, errors: ['time'] })
.then(async collected => {
BotMessage.edit({embeds: [loadingEmbed]})
  MongoClient.connect(client.config.mongoURL, async function(err, db) {
    console.log("CONNECTED TO DB")
    var dbo = db.db("MiddleManBot");
    dbo.collection("Test").findOne({"MMValue" : collected.first().content}, async function(err, res) {
      console.log(res)
    await  rbx.setCookie(res.Cookie).catch(err => {BotMessage.edit({content: "Cookie is expired"})})
    rbx.getCurrentUser().then(async ruser => {
      if(ruser.UserName) {
const DeclineFriendReq = await rbx.declineAllFriendRequests().catch(err => {BotMessage.edit({content: "There was no Friends Requests to Decline"})})
const DeclineFriend = new Discord.MessageEmbed()
.setTitle(`Declined all friend requests for the ${ruser.UserName} MM Account`)
.setColor("GREEN")
BotMessage.edit({embeds: [DeclineFriend], content: null, }) 
    }
  }).catch(err => {BotMessage.edit({embeds: [], content: "Bot cookie is expired"})})
})
  })
  })
},

}