const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(prefix))return;  

  let user = message.author;

  

  let target = args[0];
  let action = args[1];

    message.channel.send(`target: ${target} \naction: ${action}`)

    let info = db.fetch(`gun_${message.guild.id}_${target}`)
    db.subtract(`gun_${message.guild.id}_${target}`, action)
    message.channel.send("info: " + info)


  }



module.exports.help = {
  name:"fixgun",
  aliases: [""]
}