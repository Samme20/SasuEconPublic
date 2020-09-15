const Discord = require("discord.js");
const db = require("quick.db");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args, utils) => {
      //You need to enit
      let user1 = message.author;
      const init = await db.fetch(`init_${message.guild.id}_${user1.id}`)
      
      let setup = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);
  
      if(init === null) return message.channel.send(setup);
      if(!init) return message.channel.send(setup);


  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
  message.channel.send(moneyEmbed)
};

module.exports.help = {
  name:"balance",
  aliases: ["bal"]
}