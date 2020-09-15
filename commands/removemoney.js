const Discord = require("discord.js");
const db = require("quick.db");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(prefix))return;  
  let ownerID = '188270181716328449'
  if(message.author.id !== ownerID) return;

      //You need to enit
      let user1 = message.author;
      const init = await db.fetch(`init_${message.guild.id}_${user1.id}`)
      
      let setup = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);
  
      if(init === null) return message.channel.send(setup);
      if(!init) return message.channel.send(setup);

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`✔ Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)

};


module.exports.help = {
  name:"remove",
  aliases: ["rm"]
}
