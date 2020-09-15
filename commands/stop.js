const { MessageEmbed } = require('discord.js');


module.exports.run = async (bot, message) => {
    const userchannel = message.member.voice.channel
    if(!userchannel) return message.reply("You must join a voice channel")
    
    await userchannel.leave()
    bot.queue.delete(message.guild.id)
    
    const leave = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTitle('🔉 Connection')
    .setDescription(`Disconnected **${userchannel.name}**`)
    .setColor('#0013ff')

    message.channel.send(leave)
  }

  module.exports.help = {
    name:"stop",
    aliases: [""]
  }
  