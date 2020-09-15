const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(prefix))return;  

  let user = message.author;

  let replies = ['titty','pussy','ass','cock']

  let result = Math.floor((Math.random() * replies.length));

  let init = await db.fetch(`init_${message.guild.id}_${user.id}`);

  if (init === null ) {
    db.add(`money_${message.guild.id}_${user.id}`, 1000)
    db.add(`bank_${message.guild.id}_${user.id}`, 0)
    db.set(`init_${message.guild.id}_${user.id}`, true)
    db.add(`gun_${message.guild.id}_${user.id}`, 0)
    db.add(`rich_${message.guild.id}_${user.id}`, 0)
    db.add(`Boobies_${message.guild.id}_${user.id}`, 0)
    db.add(`coke_${message.guild.id}_${user.id}`, 0)
    db.set(`rob_${message.guild.id}_${user.id}`, Date.now() - 290000)
    db.set(`gamble_${message.guild.id}_${user.id}`, Date.now() - 290000)





    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`✔ ${message.author}'s account is setup!\n\nYou have a really big ${replies[result]}, therefore I'm gonna give you a small loan of 1000 dollares`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${message.author} account is already setup you fat ${replies[result]}`);
  message.channel.send(moneyEmbed)
  }
};


module.exports.help = {
  name:"init",
  aliases: [""]
}