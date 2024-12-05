const Discord = require('discord.js');
const rbx = require("noblox.js")
const config = {
    description: 'Ban a user',
    aliases: ["hardban"],
    usage: '[Discord User] [Reason]',
    rolesRequired: ["Moderation Department"],
    category: 'Moderation',
    slashId: "888345991810531349",
    options:  [
      ],
      cooldown: 10
  }

module.exports = {
    config: config,
    run: async (client, message, args) => {
      if(!message.member.roles.cache.has("870467944591786014")) return message.reply({content: "No perms"})
        const notperms = new Discord.MessageEmbed()
        .setTitle("You cant ban someone higher than you")
        .setDescription("Lol")
        .setColor("RED")
        const notbannable = new Discord.MessageEmbed()
        .setTitle("How do u expect me to ban that OP person")
        .setDescription("lol nob")
        .setColor("RED")

        const nouser = new Discord.MessageEmbed()
        .setTitle("No user has been mentioned")
        .setDescription("Please mention a user to softban.")
        .setFooter(client.config.footer)
        const noreason = new Discord.MessageEmbed()
        .setTitle("Command Interaction Invalid")
        .setDescription("Please provide a reason for the softban")
        .setColor("RED")
        .setFooter(client.config.footer)
        const usertoban = await message.mentions.users.first()
        const reason =  args.slice(1).join(' ');
        if(usertoban === message.author) return message.channel.send({content: "Why would you want to softban yourself"})
        if(!usertoban) return await message.channel.send({embeds: [nouser]})
        if(!reason) return await message.channel.send({embeds: [noreason]})
        if(usertoban && reason) {
          const servermember = message.guild.members.cache.get(usertoban.id)
  //     console.log(servermember.roles.highest)
          if(message.member.roles.highest.rawPosition < servermember.roles.highest.rawPosition) {
              await message.channel.send({embeds: [notperms]})
          }else {
            console.log(servermember.bannable)
if(servermember.bannable) {
  const traceback = await client.utils.getLinkedUser(message.author.id)
const embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(`<646536322239954964:thumbsup~1:> \n \n ${usertoban.tag} Was soft-banned from the MM ✅ | \`${reason}\` \n \n`)
usertoban.send({embeds: [embed]}).catch(err => message.channel.send({content: "user was softbanned but not able to dm them why."}))
message.reply({embeds: [embed]})
const logEmbed = new Discord.MessageEmbed()
.setTitle(`${usertoban.tag} has just been soft-banned`)
.setColor("GREEN")
.setDescription(`<646536322239954964:thumbsup~1:>  \n \n ${usertoban.tag} Was soft-banned from the MM ✅ |  \`${reason}\` by  (${message.author.tag})\n`)
client.channels.cache.get("905885768172597299").send({embeds: [logEmbed]})
servermember.ban({reason: reason}).then(() => {
  message.guild.unban(servermember.id)
}).catch(err => message.channel.send("An Error has accored during the unban of the user."))
}else {
  message.reply({embeds: [notbannable]})
    }
    }
} 
},
    runInteraction: async(client, interaction, args) => {

    }
}