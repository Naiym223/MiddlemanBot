const Discord = require('discord.js');
const rbx = require("noblox.js")
var MongoClient = require('mongodb').MongoClient;

const config = {
    description: 'Find Incoming Trades',
    aliases: ["trade"],
    usage: '[Username]',
    rolesRequired: [],
    category: 'Roblox Trading',
    slashId: "888345995056914442",
    options:  [
      ],
      cooldown: 5
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
      if(message.author.id !== "556879572424065054")   return message.reply({content: "No perms"})


      const loadingEmbed = new Discord.MessageEmbed()
      .setDescription(`<a:Loading:931286869419888660> Loading Info`)
      .setColor("#f1c40f")
const BotMessage = await message.channel.send({embeds: [loadingEmbed]})

setTimeout(async() => {
  const PromptEmbed = new Discord.MessageEmbed()
  .setTitle("Select a MM Account to use (1-3)")
  .setFooter("Reply with the number EG: 1")
BotMessage.edit({embeds: [PromptEmbed]})
  const Cookiefilter = m => m.author.id === message.author.id

message.channel.awaitMessages({ Cookiefilter, max: 1, time: 20_000, errors: ['time'] })
.then(async collected => {
  if(collected.first().content > 3) return message.reply({content: "Number can not be bigger than 3"})
BotMessage.edit({embeds: [loadingEmbed]})
MongoClient.connect(client.config.mongoURL, async function(err, db) {
console.log("CONNECTED TO DB")
var dbo = db.db("MiddleManBot");
dbo.collection("Test").findOne({"MMValue" : collected.first().content}, async function(err, res) {
console.log(res)
await  rbx.setCookie(res.Cookie).catch(err => {BotMessage.edit({content: "Cookie is expired"})})
rbx.getCurrentUser().then(async ruser => {
if(ruser.UserName) {
let trades = await rbx.getTrades("Inbound", "Asc", 20)
let FormattedInfo = trades.map(c => `\n Username: ${c.user.name}  Trade ID: ${c.id}`)
      const Embed = new Discord.MessageEmbed()
.setTitle("Please select a user to trade with.")
.setDescription(`${FormattedInfo}`)
.setFooter("Reply with the Users name to trade with.")
.setColor("#f1c40f")
await BotMessage.edit({embeds: [Embed]})  
  const filter = m => m.author.id === message.author.id
 const collector = message.channel.createMessageCollector({filter,  time: 15000 });

 collector.on('collect',async m => {
let Username = m.content
let UserID = await rbx.getIdFromUsername(Username).catch(err => message.reply({content: "User does not exist"}))
console.log(UserID)
let UserTrade = trades.filter(g => g.user.id === UserID)
console.log(UserTrade[0])
if(UserTrade[0]) {
  let TradeInfo = await rbx.getTradeInfo(UserTrade[0].id)
  let Thumbnail = await rbx.getPlayerThumbnail(UserID, "420x420", "png", false, "headshot")
  let ItemsYouGive = TradeInfo.offers[0].userAssets
  let FomattedItemsYouGive = ItemsYouGive.map(items => `\n \n Item Name : ${items.name} \n Average Price: ${items.recentAveragePrice} \n Serial Number: ${items.serialNumber || `No Serial Number Found`}  `)
  let ItemsTheyGive = TradeInfo.offers[1].userAssets
  let FomattedItemsTheyGive = ItemsYouGive.map(items => `\n \n Item Name : ${items.name} \n Average Price: ${items.recentAveragePrice} \n Serial Number: ${items.serialNumber|| `No Serial Number Found`} `)
console.log(TradeInfo.offers[0].user.name)
  let TradeEmbed = new Discord.MessageEmbed()
.setAuthor(UserTrade[0].user.name, Thumbnail[0].imageUrl)
.addField(`Items ${TradeInfo.offers[0].user.name}[MiddleMan] Give: `, `${FomattedItemsYouGive} \n \n  Robux You Give: ${TradeInfo.offers[0].robux}`,true)
.addField(`Items ${TradeInfo.offers[1].user.name}[User] give: `, `${FomattedItemsTheyGive} \n \n Robux they Give: ${TradeInfo.offers[1].robux}`,true)
.addField("TradeInfo: ", `TradeId: ${TradeInfo.id} \n Trade Created: ${TradeInfo.created} \n Trade Expiry: ${TradeInfo.expiration} `)
.setColor("#f1c40f")
const Buttons = new Discord.MessageActionRow().addComponents(
new Discord.MessageButton()
.setCustomId(`TradeAccept-${TradeInfo.id}`)
.setStyle("SUCCESS")
.setLabel("Accept Trade"),
new Discord.MessageButton()
.setCustomId(`TradeDecline-${TradeInfo.id}`)
.setStyle("DANGER")
.setLabel("Decline Trade")
)

      BotMessage.edit({embeds: [TradeEmbed], components: [Buttons]})
      m.delete()
collector.stop()
const filter = i => i.user.id === message.author.id
const ButtonCollector = message.channel.createMessageComponentCollector({ filter, time: 15_000 });
ButtonCollector.on('collect', async i => {
  if(i.customId === `TradeDecline-${TradeInfo.id}`){
    console.log("AYE")
    rbx.declineTrade(TradeInfo.id).then(() => {
let TradeDeclined = new Discord.MessageEmbed()
.setTitle(`Trade Declined`)
.setDescription(`Trade has been declined`)
.setColor("RED")
ButtonCollector.stop()
 BotMessage.edit({embeds: [TradeDeclined], components: []})
  })
} else {
    if(i.customId === `TradeAccept-${TradeInfo.id}`) {
      rbx.acceptTrade(TradeInfo.id).then(()=>{
    let TradeAcceptedEmbed = new Discord.MessageEmbed()
    .setTitle(`Trade Accepted`)
    .setDescription(`Trade has been processed,and accepted.`)
    return BotMessage.edit({embeds: [TradeAcceptedEmbed], components: []})
}).catch(err => {
  console.log(err)
  return BotMessage.edit({contest: `Trade can not be accepted, Error has occured. Check logs for more.`})
})
    }
}
});
ButtonCollector.on('end', collected => BotMessage.edit({embeds: [], content: "Prompt Timed Out"}));
} else {
  collector.stop()
  const NoTradeDetectedEmbed = new Discord.MessageEmbed()
  .setTitle(`Trade does not exist for [${Username}]`)
  .setColor("RED")
  return BotMessage.reply({embeds: [NoTradeDetectedEmbed]})
}
});
 
 collector.on('end', collected => {
   console.log(`Collected ${collected.size} items`);
 });
}
})
})
})
})
}, 5000)
},
}
