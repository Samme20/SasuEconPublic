const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    const queue = bot.queue.get(message.guild.id)
    if(queue) {
      if(!message.member.voice.channel) return
      if(!args.length) return message.channel.send(`🔉 Current volume: **${queue.volume}%**`)
      if(args[0] < 3) return message.channel.send(`❌ Volume must be above or equal to **3%**`)
      queue.volume = parseInt(args[0])
      queue.connection.dispatcher.setVolumeLogarithmic(parseInt(args[0] / 3))
      return message.reply(`Volume set to **${parseInt(args[0])}%**`)
    } else {
      message.reply('The queue is empty')
    }
  }

  module.exports.help = {
    name:"volume",
    aliases: ["vol"]
  }
  