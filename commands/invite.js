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
        
        message.channel.send(`${user}, here's an invite link: https://discord.com/api/oauth2/authorize?client_id=750335162881016008&permissions=8&scope=bot`)

}

module.exports.help = {
  name:"invite",
  aliases: ["inv"]
}
