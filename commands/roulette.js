const Discord = require("discord.js");
const db = require("quick.db");
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

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}

let author = await db.fetch(`gamble_${message.guild.id}_${user.id}`) //Authour time

let timeout = 3000; //Milliseconds

if (author != null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));


    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${message.author} you're gambling too much\n\nYou can gamble in ${time.seconds}s`);
    message.channel.send(timeEmbed)
  } else {

let pussy = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌${message.author}!!!!! YOU'RE A FUCKING PUSSY BET MORE THAN 100!!!!`);

let money1 = parseInt(args[1]);
if(money1 < 100) return message.channel.send(pussy);

let colour = args[0];
let money = parseInt(args[1]);
let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)

let random = Math.floor(Math.random() * 37);

let moneyhelp = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ ${message.author}, Specify an amount to gamble | Eroulette <color> <amount>`);

let moneymore = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ ${message.author}, you are betting more than you have`);

let need = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ ${message.author}, you need to bet at least 100 dollares you pussy ass bitch`);

let colorbad = new Discord.MessageEmbed()
.setColor("#FFFFFF")
.setDescription(`❌ ${message.author}, Specify a color | Red [1.5x] Black [1.75x] Green [14x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!money) return message.channel.send(moneyhelp); 
    if (money > moneydb) return message.channel.send(moneymore);
    if (money < 100) return message.channel.send(need)
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        money *= 14;
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`💚 ${message.author} won ${money} coins\n\nMultiplier: 30x`);
        message.channel.send(moneyEmbed1)
        console.log(`${message.author.tag} Won ${money} on green`)
    } else if (isOdd(random) && colour == 1) { // Red

        money = parseInt(money * 1.5)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🔴 ${message.author} won ${money} coins\n\nMultiplier: 1.5`);
        message.channel.send(moneyEmbed2)

    } else if (!isOdd(random) && colour == 0) { // Black
        money = parseInt(money * 1.75)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`🖤 ${message.author} won ${money} coins\n\nMultiplier: 1.75x`);
        message.channel.send(moneyEmbed3)

    } else { // Wrong
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
        let moneyEmbed4 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`❌ ${message.author} lost ${money} coins\n\nMultiplier: 0x`);
        message.channel.send(moneyEmbed4)
    }
    db.set(`gamble_${message.guild.id}_${user.id}`, Date.now())
}
}

  
  module.exports.help = {
    name:"roulette",
    aliases: ["roul"]
  }