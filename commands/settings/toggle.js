const Discord = require('discord.js');
const rbx = require("noblox.js")
const config = {
    description: 'Setup your Bot',
    aliases: ["settings"],
    usage: '',
    rolesRequired: [],
    category: 'Developers',
    slashId: "903138610650427412",
    options: [
      ],
      cooldown: 20,
  }

module.exports = {
    config: config,
run: async(client, message, args) => {  
if(message.author.id !== "473330467626811393")   return message.reply({content: "No perms"})
let channel = await message.guild.channels.cache.get("1314058506604646460")

const OnEmbed = new Discord.MessageEmbed()
.setTitle(`Middlemen Availability, now open.`)
.setDescription("You have toggled `ON` the MM-request channel")
const OffEmbed = new Discord.MessageEmbed()
.setTitle(`Middlemen Availability, now closed.`)
.setDescription("You have toggled `OFF` the MM-request channel")
console.log(channel.name.startsWith("✅"))
if(channel.name.startsWith("✅")) {
  console.log("OK 1")
  console.log(channel.setName("❌-mm-request"))
  console.log("OK 2")
  message.reply({embeds: [OffEmbed]})
}
if(channel.name.startsWith("❌")) {
  console.log(channel.setName("✅-mm-request"))
  message.reply({embeds: [OnEmbed]})
}
},
}