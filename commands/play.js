const Discord = require('discord.js');
const db = require('quick.db');
const { prefix, google_api_key } = require("./botconfig.json");


const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core')

const ytbApis = require('simple-youtube-api')
const youtube = new ytbApis(google_api_key)




module.exports.run = async(bot, message, args) => {
  const userchannel = message.member.voice.channel
  var queue = bot.queue.get(message.guild.id)
  const querySong = args.join(' ')
  const uriPattern = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''
  
  //You need to enit
  let user = message.author;
  const init = await db.fetch(`init_${message.guild.id}_${user.id}`)

  let setup = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${message.author}, You need to setup your account first. Type **"Einit"**`);

  if(init === null) return message.channel.send(setup);
  if(!init) return message.channel.send(setup);


  let nochannel = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${message.author},You have to be in a voice channel`);
  if(!userchannel) return message.channel.send(nochannel)

  let nolink = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`❌ ${message.author},Eplay <link or name>`);
  if(!querySong) return message.channel.send(nolink)
  
  try {
    var video = await youtube.getVideoByID(uriPattern)
  } catch {
    try {
        var videos = await youtube.searchVideos(querySong, 1)
        var video = await youtube.getVideoByID(videos[0].id)
    } catch(err) {
      console.log(err)
      return message.channel.send("Hittade ingen video nigga")
    }
  }
  
  const song = {
    title: video.title,
    id: video.id,
    url:  `https://www.youtube.com/watch?v=${video.id}`,
    img: `https://i.ytimg.com/vi/${video.id}/default.jpg`,
    short: video.shortURL
  }
  
  if(!queue) {
    let queue_construct = {
      textChannel: message.channel,
      voiceChannel: userchannel,
      connection: null,
      songs: [],
      volume: 3,
      loop: false,
      playing: true
    }
    bot.queue.set(message.guild.id, queue_construct)
    queue_construct.songs.push(song)
    
    try {
      var connection = await userchannel.join()
      queue_construct.connection = connection
      play(message.guild, queue_construct.songs[0])
      //DB SHIT
      db.fetch(`song_${message.guild.id}_${user.id}`)
      db.add(`song_${message.guild.id}_${user.id}`, 1)
    } catch(error) {
      console.log(error)
      return message.channel.send(`An error has occured: \n` + error)   
    }
  } else {
    queue.songs.push(song)
    //DB SHIT
    db.fetch(`song_${message.guild.id}_${user.id}`)
    db.add(`song_${message.guild.id}_${user.id}`, 1)
    
    let songnext = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`🎶 **${song.title}** has been added to the queue`);
    return message.channel.send(songnext)
  }
  
  return undefined
  
  function play(guild, song) {
    queue = bot.queue.get(guild.id)

    
    if(!song) {
      userchannel.leave()
      bot.queue.delete(message.guild.id)
      return console.log("yes !song")
    }
    
    const dispatcher = queue.connection.play(ytdl(song.url))
    .on('finish', () => {
      if(!queue.loop) queue.songs.shift()
      play(guild, queue.songs[0])
      return
    })
    .on('error', () => {
      bot.queue.delete(message.guild.id)
      queue.voiceChannel.leave()
      return console.log("yes on Error")
    })
    
    dispatcher.setVolumeLogarithmic(queue.volume / 3)
    
  var current_song = new MessageEmbed()
  .setTitle(`Current track playing | 🔉 **${queue.volume}%**`)
  .setDescription(`[${song.title}](${song.url})\nRequested by: ${message.author}`)
  .setThumbnail(song.img)
  .setColor('#0013ff')
    
    queue.textChannel.send(current_song)
  }
}


module.exports.help = {
  name:"play",
  aliases: ["p"]
}


