const Discord = require('discord.js');

module.exports.run = async (bot, message) => {
    const queue = bot.queue.get(message.guild.id)
    if(queue) {
      if(!message.member.voice.channel) return
      queue.connection.dispatcher.end()
      return undefined
    } else {
      message.reply('The queue is empty')
    }
  }

  module.exports.help = {
    name:"skip",
    aliases: ["ss"]
  }
  