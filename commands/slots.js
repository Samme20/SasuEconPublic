const slotItems = ["🍇", "🍉", "🍊", "🍎", "7️⃣", "🍓", "🍒"];
const db = require("quick.db");
const Discord = require('discord.js');
const { prefix } = require("./botconfig.json");
const ms = require("parse-ms");

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



        let author = await db.fetch(`gamble_${message.guild.id}_${user.id}`) //Authour time

        let timeout = 3000; //Milliseconds
        
        if (author != null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
        
        
            let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`❌ ${message.author} you're gambling too much\n\nYou can gamble in ${time.seconds}s`);
            message.channel.send(timeEmbed)
          } else {
        
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌${message.author}, you are betting more than you have`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌${message.author}, Eslots <amount>`);

    let pussy = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌${message.author}!!!!! YOU'RE A FUCKING PUSSY BET MORE THAN 100!!!!`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);
    if(money < 100) return message.channel.send(pussy);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 8
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 1.5
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} won ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n${message.author} lost ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }
    db.set(`gamble_${message.guild.id}_${user.id}`, Date.now())
}
}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl", "slot"]
  }