const Discord = require('discord.js')
const db = require('quick.db')
const { prefix } = require("./botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith(prefix))return;  


    let embed = new Discord.MessageEmbed()
    .setDescription("**Stocks** \nStocks will be available here after THE PATCH \n \n**Available Stuff**\nEbuy gun - 10k dollares\nEbuy ak47 - 150k dollares\nEbuy coke - 800 dollares/gram\nEbuy rich - 100k dollares\nEbuy **legendary** - 10000000000 dollares\n-\nEstoreinfo <item> for more info about the items, Esi <item>")
    .setColor("#FFFFFF")
    message.channel.send(embed)




}


module.exports.help = {
  name:"store",
  aliases: ["st"]
}