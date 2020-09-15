const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require("./botconfig.json");


const reddit = require('@elchologamer/random-reddit');
const { italics } = require('ffmpeg-static');
 


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

    // Create options
    let options = {
      imageOnly: true,
      allowNSFW: true
    };


    

 
    var random = Math.floor(Math.random() * 100);
    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ You need  at least 1000 dollares to get le ass cheeks`);

    if (author < 100) return message.channel.send(Embed)

    var random1 = Math.floor((Math.random() + 1) * 1000);

   
    reddit.getPost('PAWG', options).then(post => {

      console.log(`Received post: ${post.image}`)
      let Embed2 = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`🤡 The bitch sucked your dollares up her ass, she sucked ${random} dollares`);
      message.channel.send(post.image);
      message.channel.send(Embed2);
      
      ;
     }).catch(err => {
       console.log(err);
     });
 

    db.subtract(`money_${message.guild.id}_${user.id}`, random)
    



}

module.exports.help = {
  name:"pawg",
  aliases: [""]
}