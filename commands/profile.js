const Discord = require("discord.js");
const db = require("quick.db");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(prefix))return;  

  let user = message.mentions.members.first() || message.author;

    //You need to enit
    let user1 = message.author;
    const init = await db.fetch(`init_${message.guild.id}_${user1.id}`)
    
    let setup = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);

    if(init === null) return message.channel.send(setup);
    if(!init) return message.channel.send(setup);

  let Boobies = await db.fetch(`Boobies_${message.guild.id}_${user.id}`)
  if (Boobies === null) Boobies = 0;

  let coke = await db.fetch(`coke_${message.guild.id}_${user.id}`)
  if (coke === null) coke = 0;

  let song = await db.fetch(`song_${message.guild.id}_${user.id}`)
  if (song === null) song = 0;

  let rich = await db.fetch(`rich_${message.guild.id}_${user.id}`)


  if(rich == 1){
    let moneyEmbedR = new Discord.MessageEmbed()
    .setColor("#18c947")
    .setDescription(`**🤑🤑RICH ${user}'s Profile🤑🤑**\n\nBoobs: ${Boobies}\n-\nCoke: ${coke} grams\n-\nSongs requested: ${song}`);
    message.channel.send(moneyEmbedR)
  }
  
  else{
    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`**${user}'s Profile**\n\nBoobs: ${Boobies}\n-\nCoke: ${coke} grams\n-\nSongs requested: ${song}`);
    message.channel.send(moneyEmbed)
  }
};

module.exports.help = {
  name:"profile",
  aliases: ["pro"]
}