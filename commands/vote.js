const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require("./botconfig.json");


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  

    const content = args.join(" ");  
    


    


    message.channel.messages.fetch({limit: 1}).then(collected => { //collected is a Collection
      collected.forEach(msg => {
        if (message.content.startsWith("Evote")) message.delete();
      });
    });
    
    message.channel.send(`**${content}**     poll by: ${message.author}`)
    .then(function (message) {
        message.react("👍")
        setTimeout(function(){ message.react("👎"); }, 500);
      }).catch


}

module.exports.help = {
  name:"vote",
  aliases: ["vote"]
}



