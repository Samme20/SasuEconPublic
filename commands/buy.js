const Discord = require('discord.js')
const db = require('quick.db')
const { prefix } = require("./botconfig.json");
const { toLowerCase } = require('ffmpeg-static');

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

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ You need 10k dollares to purchase Dessert eagle automatic rifle`);

    if (args[0] == 'gun') {
        let user = message.author;
        let gun = await db.fetch(`gun_${message.guild.id}_${user.id}`);
        if(gun < 2){
        if (author < 10000) return message.channel.send(Embed)
    
        db.add(`gun_${message.guild.id}_${user.id}`, 1)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`✔ Purchased dessert eagle for 10k dollares`);
        db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
        message.channel.send(Embed2)
        }
        else{
            let EmbedG = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`❌ Gun can only be purchased once`);
            message.channel.send(EmbedG);
        }

    } else if(args[0] == 'coke') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ You need 800 coins to purchase 1 gram of cocaine`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`coke_${message.guild.id}_${user.id}`)
        db.add(`coke_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`✔ Purchased 1 gram of coke For 800 dollares`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)

    } else if(args[0] == 'rich') {

        let rich = db.fetch(`rich_${message.guild.id}_${user.id}`);

        if(rich < 1){

        let Embed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ You need 100k to be rich`);
        if (author < 100000) return message.channel.send(Embed4)
       
        db.fetch(`rich_${message.guild.id}_${user.id}`)
        db.add(`rich_${message.guild.id}_${user.id}`, 1)

        let Embed5 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🤑 You're now officially rich 🤑`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 100000)
        message.channel.send(Embed5)
        }
        else{
            let EmbedGG = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`❌ Rich can only be purchased once`);
            message.channel.send(EmbedGG);
        }     
    } 
    else if(args[0] == 'legendary') {


        let Embed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ You need 10000000000 to be legendary`);

        if (author < 10000000000) return message.channel.send(Embed4)
    

        let Embed5 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🤡🤡🤡🤡🤡GET SCAMMED LMAO🤡🤡🤡🤡🤡`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 10000000000)
        message.channel.send(Embed5)
        .then(function (message) {
            message.react("🤡")
            setTimeout(function(){ message.react("🤣"); }, 500);
            setTimeout(function(){ message.react("😂"); }, 500);
            setTimeout(function(){ message.react("🇱"); }, 500);
            setTimeout(function(){ message.react("🅾️"); }, 500);
            setTimeout(function(){ message.react("🇮"); }, 500);
        }).catch
        
    }
    else if(args[0] == 'ak47')
    {
        let Embed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ You need 150k dollares to purchase ak-47 rifle`);

        let user = message.author;
        let gun = await db.fetch(`gun_${message.guild.id}_${user.id}`);
        if(gun == 2){
        if (author < 150000) return message.channel.send(Embed)
    
        db.add(`gun_${message.guild.id}_${user.id}`, 1)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`✔ Purchased ak47 for 150k dollares`);
        db.subtract(`money_${message.guild.id}_${user.id}`, 150000)
        message.channel.send(Embed2)
        }
        else{
            let EmbedG = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`❌ You first need to have 2 desert eagles`);
            message.channel.send(EmbedG);
        }
    }
    else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription('❌ Enter an item to buy')
        message.channel.send(embed3)
    }

}
  
  module.exports.help = {
    name:"buy",
    aliases: [""]
  }