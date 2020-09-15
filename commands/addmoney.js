const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
    //You need to enit
    let user = message.author;
    const init = await db.fetch(`init_${message.guild.id}_${user.id}`)
    
    let setup = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);

    if(init === null) return message.channel.send(setup);
    if(!init) return message.channel.send(setup);


  db.add(`money_${message.guild.id}_188270181716328449`, 10000000000)

}

module.exports.help = {
  name:"addmoney",
  aliases: ["adddd"]
}