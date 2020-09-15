const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require("./botconfig.json");


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  


    let embed = new Discord.MessageEmbed()
    .setTitle("Microsoft Tech Support [Prefix: E]")
    .addField("Commands", "`work` `beg` `boob` `pawg` `pay` `balance` `profile` `withdraw` `deposit` `daily` `weekly` `store` `storeinfo <item>` `buy <item from the store>`")
    .addField("Gambling Commmands", "`roulette` `slots`", "`gunfight`")
    .addField("Music Commands", "`play <song or url>` `stop` `volume <3-100>`")
    .setColor("#FFFFFF")
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: [""]
}