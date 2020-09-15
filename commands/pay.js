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


  let target = message.mentions.members.first()
  let self = message.author;

  let selfMoney = db.fetch(`money_${message.guild.id}_${self.id}`)

  let pay = args[0]

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ Mention someone to pay`);
  if (!target) return message.channel.send(embed1);
      
  //Sppecify target
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ Specify an amount to pay`);
  if (!args[0]) return message.channel.send(embed2);
      
  //Dont pay negative amounts
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ You can't pay someone negative money`);
  if (message.content.includes('-')) return message.channel.send(embed3);
      
  //Need more money
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ You don't have that much money`);
  if (selfMoney < pay) return message.channel.send(embed4);
      
  
    //Await the target
    let acceptPay = new Discord.MessageEmbed()
    .setColor("#006400")
    .setDescription(`⌛💰 Waiting for ${target} to accept pay transer...💰⏳\n\n ${target} needs to type 'acceptpay' (60 seconds and it expires)`);

    message.channel.send(acceptPay);
        const filter =m => m.author.id == target.id && m.content.startsWith('acceptpay');
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ['time'] });

        collector.on('collect', m => {
            let embed5 = new Discord.MessageEmbed()
            .setColor("#006400")
            .setDescription(`✔ You have payed ${target} ${pay} dollares`);
          
            message.channel.send(embed5)
            db.add(`money_${message.guild.id}_${target.id}`, pay)
            db.subtract(`money_${message.guild.id}_${self.id}`, pay)
            collector.stop();
        });
        
        collector.on('time', collected => {
            message.channel.send(`${target} did not accept in time...`)
        });
}

module.exports.help = {
  name:"pay",
  aliases: [""]
}