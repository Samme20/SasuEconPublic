const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  

        //You need to enit
        let user = message.author;
        const init = await db.fetch(`init_${message.guild.id}_${user.id}`)
        
        let setup = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);
    
        if(init === null) return message.channel.send(setup);
        if(!init) return message.channel.send(setup);
        
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ ${message.author} is working to hard, chill with some bitches.\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic', 'Male stripper', 'Olof impersonator', 'Amanda catfish', 'A black guy', 'Penis']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 800) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`✔ ${message.author} worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}



module.exports.help = {
  name:"work",
  aliases: ["wr"]
}
