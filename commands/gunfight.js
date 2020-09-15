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
    
    

    let self = message.author;
    let target = message.mentions.members.first()

    let stake = parseInt(args[0]);


    //Specify target
    let embed1 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ Mention someone to challange, Egf <amount> <@target>`);
    if (!target) return message.channel.send(embed1)
       
    //Specify stake
    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ Specify an amount to put at stake, Egf <amount> <@target>`);
    if (!stake) return message.channel.send(embed2)
          
    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ You need to bet at least 1k, fucking bitch pussy`);
    if (stake < 1000) return message.channel.send(embed3)

    //target money
    let targetUserMoney = await db.fetch(`money_${message.guild.id}_${target.id}`)
    //self money
    let selfUserMoney = await db.fetch(`money_${message.guild.id}_${self.id}`)

    //Target must have money
    let targetNoMoney = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${target} Dosen't have enough money, challange somone else!`);
    if(targetUserMoney < stake) return message.channel.send(targetNoMoney)

    //Target must have money
    let selfNoMoney = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❌ ${message.author}, you don't have enough money, go get some`);
    if(selfUserMoney < stake) return message.channel.send(selfNoMoney)

    else{
        //Await the target
        let awaitTarget = new Discord.MessageEmbed()
        .setColor("#7F0000")
        .setDescription(`⌛🔫 Waiting for ${target} to accept gunfight (50/50 coinflip)...🔫⏳\n\n ${target} needs to type 'accept' (20 seconds and it expires)`);

        function isOdd(num) { 
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }


        //Function itself

        message.channel.send(awaitTarget);
        const filter =m => m.author.id == target.id && m.content.startsWith('accept');
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 20000, errors: ['time'] });
        
        
        collector.on('collect', m => {
            play();
            collector.stop();
        });
        
        collector.on('errors', collected => {
            message.channel.send(`${target} did not accept in time...`)
        });

    function play(){
        message.channel.send(`${target} Accepted the challange`);
        
        let win = stake *2;
        db.subtract(`money_${message.guild.id}_${self.id}`, stake);
        db.subtract(`money_${message.guild.id}_${target.id}`, stake);

        let selfWin = new Discord.MessageEmbed()
        .setColor("#7F0000")
        .setDescription(`🔫 ${self} Picks up the weapon and fires before ${target} could react \n\n ${self} takes the stake and is now ${win} dollars richer`);
                 
        let targetWin = new Discord.MessageEmbed()
        .setColor("#7F0000")
        .setDescription(`🔫 ${target} Picks up the weapon and fires before ${self} could react \n\n ${target} takes the stake and is now ${win} dollars richer`);
        
        let decider = Math.floor(Math.random() * 38)
    
        if(!isOdd(decider))
        {
            message.channel.send(selfWin);
            console.log(`${self} won duel with value ${decider}`);
            db.add(`money_${message.guild.id}_${self.id}`, win);
        }
        else
        {
            message.channel.send(targetWin);
            console.log(`${target} won duel with value ${decider}`);
            db.add(`money_${message.guild.id}_${target.id}`, win);
        }
    }



    }

}







//Rob time and money


module.exports.help = {
  name:"gunfight",
  aliases: ["gf"]
}