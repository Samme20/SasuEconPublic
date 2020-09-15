const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    const queue = bot.queue.get(message.guild.id)
    const embed = new Discord.MessageEmbed()
    
    let tracksRs = queue.songs
    let tracks = tracksRs.slice(0, 3)
    
    embed.setTitle('🎵 **Player Info**')
    embed.setAuthor(message.author.tag, message.author.avatarURL())
    embed.addField('﹥ **Playing channel in channel**', `${"``" + queue.voiceChannel.name + "``"}`)
    embed.addField('﹥ **Track info**', `**${queue.songs[0].title} | ID: ${queue.songs[0].id}**`)
    embed.addField('﹥ **Track link**', `**${queue.songs[0].short}**`)
    embed.setThumbnail(queue.songs[0].img)
    embed.setColor('#FFFFFF')
    
    message.channel.send(embed)
  }


  module.exports.help = {
    name:"nowplaying",
    aliases: ["np"]
  }
  