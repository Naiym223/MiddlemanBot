const Discord = require('discord.js');
const e = require('express');
const { intersection } = require('lodash');
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
      cooldown: 1
  }

module.exports = {
    config: config,
run: async(client, message, args) => {  
  if(message.author.id !== "806519232812679188")   return message.reply({content: "No perms"})
  if(!args[0]) return message.channel.send({content: "gimme messages to delete"})
message.channel.bulkDelete(args[0])
},
}