const Discord = require('discord.js');
const rbx = require("noblox.js")
const config = {
    description: 'Get Inventory of User',
    aliases: ["inventory"],
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

        const loadingEmbed = new Discord.MessageEmbed()
        .setDescription(`<a:Loading:931286869419888660> Loading Info`)
        .setColor("#f1c40f")
  const BotMessage = await message.channel.send({embeds: [loadingEmbed]})
  if(!args[0]) return BotMessage.edit({content: "No Username Provided", embeds: []})
  const UserID = await rbx.getIdFromUsername(args[0]).catch(err => BotMessage.edit({content: "User does not exist", embeds: []}))
const LimitedFilter = await rbx.getCollectibles({userId: Number(UserID), sortOrder: "Asc", limit: 100}).catch(err => {BotMessage.edit({content: "User has Inventory Private"})})
let inventorystring = ""
if(LimitedFilter) {


    LimitedFilter.forEach((Value, Index) => {
        console.log(Value)
        inventorystring = inventorystring + Value.name + " [R$"+ Value.recentAveragePrice + "]\n";
        const InventoryEmbed =  new Discord.MessageEmbed()
.setTitle("Inventory:")
.setColor("#f1c40f")
.setDescription(`${inventorystring}`)
.addField("Rolimons Link:",`https://www.rolimons.com/player/${UserID}`)
BotMessage.edit({embeds: [InventoryEmbed], content: null})
})
} else {
    if(inventorystring === "") {
        return BotMessage.edit({content: "Users inventory is empty", embeds: []})
};
     }
      },
}