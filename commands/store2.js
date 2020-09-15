const Discord = require('discord.js')
const db = require('quick.db')
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  
  
    if (args[0] == 'gun') {
    
      let embed = new Discord.MessageEmbed()
      .setDescription("**Dessert Eagle (gun)**\n\nBenefits: 0 guns = 1-100 dollares \n 1 gun = 1-1000 dollares \n 2 guns = 1-10000 dollares")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'coke') {
      let embed = new Discord.MessageEmbed()
      .setDescription("**The White Gold(coke)**\n\nBenefits: Flex")
      .setColor("#FFFFFF")
      message.channel.send(embed)
    } else if(args[0] == 'rich') {
      let embed = new Discord.MessageEmbed()
      .setDescription("**Rich**\n\nBenefits: Get a unique profile to flex on the broke TSLA investors")
      .setColor("#FFFFFF")
      message.channel.send(embed)
  } else if(args[0] == 'sercret') {
    let embed = new Discord.MessageEmbed()
    .setDescription("**secret info**\n\nBenefits: You are cool")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }
  else if(args[0] == 'legendary') {
    let embed = new Discord.MessageEmbed()
    .setDescription("**legendary info**\n\nBenefits: Beyond your comprehension")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }
  else if(args[0] == 'ak47') {
    let embed = new Discord.MessageEmbed()
    .setDescription("**legendary info**\n\nBenefits: The ak47 allows you to rob somone of upto **100k** at the cost of the target needing to have at least 50k in pocket")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }
  else
  {
    let embed = new Discord.MessageEmbed()
    .setDescription("❌ You must specify an item")
    .setColor("#FFFFFF")
    message.channel.send(embed)
  }

}

  
  module.exports.help = {
    name:"storeinfo",
    aliases: ["si"]
  }