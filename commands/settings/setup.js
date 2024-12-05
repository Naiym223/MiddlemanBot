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
      cooldown: 10
  }

module.exports = {
    config: config,
run: async(client, message, args) => {  
  if(message.author.id !== "473330467626811393")   return message.reply({content: "No perms"})
  const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId(`setupPrompt-${message.author.id}`)
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Setup Cookie1',
							description: 'Setup Cookie1',
							value: 'first_option',
						},
            {
							label: 'Setup Cookie2',
							description: 'Setup Cookie2',
							value: 'second_option',
						},
						{
							label: 'Setup Cookie3',
							description: 'Setup Cookie3',
							value: 'third_option',
						},
					]),
			);
const loadingEmbed = new Discord.MessageEmbed()
.setDescription("<a:Emoji_Loading:905146001134862336> Loading Info")
.setColor("#f1c40f")

const BotMessage = await message.channel.send({embeds: [loadingEmbed]})

setTimeout(async() => {
const embed = new Discord.MessageEmbed()
.setTitle("Setup Prompt")
.setDescription("lol some text here")
.setColor("#f1c40f")

BotMessage.edit({embeds: [embed], components: [row] });

const filter = i => i.user.id === message.author.id;

const collector = message.channel.createMessageComponentCollector({ filter, time: 90000 });
collector.on("end", async collected => {
    const PromptEnded = new Discord.MessageEmbed()
    .setTitle("Prompt Finished")
    BotMessage.edit({embeds: [PromptEnded],  ephemeral: true})
})

collector.on('collect', async i => {
if(i.customId === `setupPrompt-${message.author.id}`) {
  if(i.values[0] === "first_option"){
let setCookieEmbed = new Discord.MessageEmbed()
.setTitle("Set Cookie1 Process")
.setDescription("To continue this request. Just reply the Bot Cookie now")
BotMessage.edit({embeds: [setCookieEmbed], ephemeral: true})
const Cookiefilter = m => m.author.id === message.author.id

message.channel.awaitMessages({ Cookiefilter, max: 1, time: 60_000, errors: ['time'] })
.then(async collected => {
  if(collected.first().content.startsWith("_")) {
    rbx.setCookie(collected.first().content).then(async() => {
    rbx.getCurrentUser().then(ruser => {
    if(ruser.UserName) {
    client.utils.updateCookie("1", collected.first().content)
    collected.first().delete()
    BotMessage.edit({content: `Your account has been linked! ✅  \n \n Logged in as ${ruser.UserName} : ${ruser.UserID}`, embeds: [], components: []})
collector.stop()
  
  } else{
    collected.first().delete()
    return message.reply({content: "Invalid Cookie"})
    collector.stop()
  }
    }).catch(err => "Not Logged in")
  }).catch(err =>  message.reply({content: "Invalid Cookie"}))
}else {
  collected.first().delete()
    return message.reply({content: "Prompt Cancelled, Invalid Cookie"})
    collector.stop()
  }


})
.catch(collected => console.log(`Prompt Expired`));
}
if(i.values[0] === "second_option"){
let setCookieEmbed = new Discord.MessageEmbed()
.setTitle("Set Cookie2 Process")
.setDescription("To continue this request. Just reply the Bot Cookie now")
i.update({embeds: [setCookieEmbed], ephemeral: true})
const Cookiefilter = m => m.author.id === message.author.id

message.channel.awaitMessages({ Cookiefilter, max: 1, time: 60_000, errors: ['time'] })
.then(async collected => {
  if(collected.first().content.startsWith("_")) {
    rbx.setCookie(collected.first().content).then(async() => {
    rbx.getCurrentUser().then(ruser => {
      if(ruser.UserName) {
    client.utils.updateCookie("2", collected.first().content)
    collected.first().delete()
    BotMessage.edit({content: `Your account has been linked! ✅  \n \n Logged in as ${ruser.UserName} : ${ruser.UserID}`, embeds: [], components: []})
collector.stop()
  } else{
    collected.first().delete()

    return message.reply({content: "Your account link has been cancelled! No changes occured! ❎"})
    collector.stop()
  }
}).catch(err => "Not Logged in")
  }).catch(err =>  message.reply({content: "Your account cookie is expired! No changes saved! ❎"}))
}else {
  collected.first().delete()

    return message.reply({content: "Your account cookie is expired! No changes saved! ❎"})
    collector.stop()
  }


})
.catch(collected => console.log(`Prompt Expired`));
}

if(i.values[0] === "third_option") {    
let setCookieEmbed = new Discord.MessageEmbed()
.setTitle("Set Cookie3 Process")
.setDescription("To continue this request. Just reply the Bot Cookie now")
i.update({embeds: [setCookieEmbed], ephemeral: true})
const Cookiefilter = m => m.author.id === message.author.id

message.channel.awaitMessages({ Cookiefilter, max: 1, time: 60_000, errors: ['time'] })
.then(async collected => {
  if(collected.first().content.startsWith("_")) {
    rbx.setCookie(collected.first().content).then(async() => {
    console.log("OK 1")
    rbx.getCurrentUser().then(async ruser => {
      console.log(ruser)
      if(ruser.UserName) {
        console.log("OK 2")
    client.utils.updateCookie("3", collected.first().content)
    collected.first().delete()
    BotMessage.edit({content: `Your account has been linked! ✅  \n \n Logged in as ${ruser.UserName} : ${ruser.UserID}`, embeds: [], components: []})
collector.stop()
  }else{
    collected.first().delete()
    collector.stop()
    return message.reply({content: "Your account link has been cancelled! No changes occured! ❎"})
  }
}).catch(err => "Not Logged in")
    }).catch(err =>  message.reply({content: "Your account cookie is expired! No changes saved! ❎"}))  
}
})
.catch(collected => console.log(`Prompt Expired`));
}
}
})
}, 2000)
},
}