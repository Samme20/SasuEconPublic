const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(prefix))return;  

      //You need to enit
      let user1 = message.author;
      const init = await db.fetch(`init_${message.guild.id}_${user1.id}`)
      
      let setup = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);
  
      if(init === null) return message.channel.send(setup);
      if(!init) return message.channel.send(setup);

      let argerror = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`❌ Erob <@target>`);
    if (!message.mentions.members.first()) {
        return message.channel.send(argerror)
    }
    

      let self = message.author;
      let user = message.mentions.members.first()

//target
let targetuser = await db.fetch(`rob_${message.guild.id}_${user.id}`)
let targetuser2 = await db.fetch(`money_${message.guild.id}_${user.id}`)

//Rob time and money
let author = await db.fetch(`rob_${message.guild.id}_${self.id}`)
let author2 = await db.fetch(`money_${message.guild.id}_${self.id}`)

let authError = await db.fetch(`money_${message.guild.id}_${user.id}`)

let timeout = 600000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));


    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${message.author} robbeded already let your knuckles rest\n\nTry again in ${time.minutes}m ${time.seconds}s`);
    message.channel.send(timeEmbed)
  } else {

let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${message.author} You can't rob if you have more than 10k.`);

if (author2 > 100000) {
    return message.channel.send(moneyEmbed)

}
let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${user} is broke, probably invested in TSLA`);
if (targetuser2 < 100) {
    return message.channel.send(moneyEmbed2)
}

let authErrorEm = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ Unknown error, maybe user not in DB?`);
if (targetuser === null) {
    return message.channel.send(authErrorEm)
}




let gun = await db.fetch(`gun_${message.guild.id}_${self.id}`);
if(gun == 2){
  random = Math.floor(Math.random() * 10000) + 100;
  message.channel.send("gun. two: " + gun)
} 
else if(gun == 1){
  random = Math.floor(Math.random() * 1000) + 100;
  message.channel.send("gun. one: " + gun)
} 
else if(gun == 0){
  random = Math.floor(Math.random() * 100) + 1;
  message.channel.send("gun. no: " + gun)
} 
else if(gun == 3){
  if(targetuser2 < 50000) return message.channel.send("The target needs to have more than 50k in pocket :/");
  
  else
  {
  random = Math.floor(Math.random() * 100000) + 1;
  message.channel.send("gun. ak47: " + gun);
  }
} 
else{
  console.log("unknown error at ROB line 80:94")
  return;
}

let embed = new Discord.MessageEmbed()
.setDescription(`🔫 ${message.author} robbed ${user} and got away with ${random} coins`)
.setColor("#FFFFFF")
message.channel.send(embed)

db.subtract(`money_${message.guild.id}_${user.id}`, random)
db.add(`money_${message.guild.id}_${self.id}`, random)
db.set(`rob_${message.guild.id}_${self.id}`, Date.now())
  
};
}

module.exports.help = {
  name:"rob",
  aliases: ["mug"]
}