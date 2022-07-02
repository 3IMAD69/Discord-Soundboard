console.clear()
console.log('hey')
const Discord = require("discord.js");
const {MessageActionRow , MessageButton, MessageEmbed} = require("discord.js");
const keepAlive = require("./server")
const path = require('path');
const { createAudioResource, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const command = require('./commands')
const client = new Discord.Client({
  fetchAllMembers: false,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_PRESENCES
  ]
  
});

async function PlayAudio(message,audio,seconds){
   
          
          const player = await createAudioPlayer();
          const resource = await createAudioResource(path.join(__dirname + '/audios/'+audio+'.mp3'));

          const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
          });
        
          await player.play(resource);
          //ila kant seconds null ya3ni rah playaudio jaya mn soundboard
          // l3aks y3ni ila makantch idan jaya mn RrandomKick ou khassni nkicki 
            if(seconds){
               RandomKick(message,seconds)
            }
              

         await connection.subscribe(player);
        await message.reply(audio + " was Requested By "+message.user.tag)
         await  player.on(AudioPlayerStatus.Idle, () => {
           if(seconds){
             setTimeout(()=>{
                 connection.destroy();
              },seconds+2)    
           }
  
        })

            setTimeout(()=>{
                message.deleteReply();
            },5000)
          
}


client.on('ready',()=>{
  console.log("im in")



command(client,'sb',async (message)=>{
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('SounBoard V0.9')
    .setDescription ("tspami gha tkicka !!")
    .setFooter('Coded by 3IMAD',client.users.cache.find(user => user.id === '212048044714098688').displayAvatarURL({dynamic : true}))

		          	

 const row = new MessageActionRow().addComponents(
   new MessageButton()
       .setCustomId("hass2")
       .setLabel("khalih ydwi")
       .setEmoji(`😡`)
       .setStyle("DANGER"),
  new MessageButton()
       .setCustomId("AUUGHHH")
       .setLabel("AUUGHHH")
       .setEmoji(`🤯`)
       .setStyle("DANGER"),
  new MessageButton()
       .setCustomId("laugh")
       .setLabel("laugh")
       .setEmoji(`😂`)
       .setStyle("DANGER"),
  new MessageButton()
       .setCustomId("exes")
       .setLabel("exes")
       .setEmoji(`🤡`)
       .setStyle("DANGER"),
  new MessageButton()
       .setCustomId("laugh v2")
       .setLabel("laugh v2")
       .setEmoji(`🤔`)
       .setStyle("DANGER"),
                          
 )


 const row2 = new MessageActionRow().addComponents(
     new MessageButton().setStyle('PRIMARY').setCustomId('goffy-ass-laugh').setEmoji(`🤣`).setLabel(`goffy-ass-laugh`),
     new MessageButton().setStyle('PRIMARY').setCustomId('UAAGHH-V2').setEmoji(`🧑🏿`).setLabel(`UAAGHH-V2`),
     new MessageButton().setStyle('PRIMARY').setCustomId('bruh-what-da-hell-bruh').setEmoji(`🤬`).setLabel(`bruh-what-da-hell-bruh`),
     new MessageButton().setStyle('PRIMARY').setCustomId('UAAGHH-V3').setEmoji(`👁️`).setLabel(`UAAGHH-V3`),
     new MessageButton().setStyle('PRIMARY').setCustomId('tam3aya').setEmoji(`⏭`).setLabel(`tam3aya`),
 )
  const row3 = new MessageActionRow().addComponents(
     new MessageButton().setStyle('PRIMARY').setCustomId('laugh v3').setEmoji(`👺`).setLabel(`laugh v3`),
     new MessageButton().setStyle('PRIMARY').setCustomId('fatherless-child').setEmoji(`👶`).setLabel(`fatherless-child`),
     new MessageButton().setStyle('PRIMARY').setCustomId('kaido').setEmoji(`🐒`).setLabel(`kaido`),
     new MessageButton().setStyle('PRIMARY').setCustomId('exes2').setEmoji(`🌸`).setLabel(`exes2`),
     new MessageButton().setStyle('PRIMARY').setCustomId('boom').setEmoji(`🤧`).setLabel(`boom`),
    
 )
 const row4 = new MessageActionRow().addComponents(
     new MessageButton().setStyle('SUCCESS').setCustomId('frtinayt').setEmoji(`🐈‍⬛`).setLabel(`frtinayt`),
     new MessageButton().setStyle('SUCCESS').setCustomId('baaa3').setEmoji(`🐑`).setLabel(`baaa3`),
     new MessageButton().setStyle('SUCCESS').setCustomId('monkey').setEmoji(`🐒`).setLabel(`monkey`),
     new MessageButton().setStyle('SUCCESS').setCustomId('stop-the-cap').setEmoji(`🥴`).setLabel(`stop-the-cap`),
     new MessageButton().setStyle('SUCCESS').setCustomId('ay7ajadiha').setEmoji(`🐒`).setLabel(`ay7ajadiha`),

 )
 const row5 = new MessageActionRow().addComponents(
     new MessageButton().setStyle('SUCCESS').setCustomId('nononwait').setEmoji(`🐈‍⬛`).setLabel(`nononwait`),
new MessageButton().setStyle('SUCCESS').setCustomId('Ronaldinho-Soccer').setEmoji(`🙅‍♂️`).setLabel(`Ronaldinho-Soccer`),
   new MessageButton().setStyle('SUCCESS').setCustomId('hawhawhaw').setEmoji(`🐱`).setLabel(`hawhawhaw`),
   new MessageButton().setStyle('SUCCESS').setCustomId('sleeping').setEmoji(`😴`).setLabel(`sleeping`),
   new MessageButton().setStyle('SUCCESS').setCustomId('datscrazy').setEmoji(`🤪`).setLabel(`datscrazy`),
    

 )
 //blamatb9adawi

 await message.channel.send({embeds : [embed] ,components : [row,row2,row3,row4,row5]} )
  
})
})


client.on("interactionCreate",async (interaction)=>{
  
  if(interaction.isButton()){
    
    if(!interaction.member.voice.channel){
       await interaction.reply("You're not in a voice channel")
       return ;
    }
    await  PlayAudio(interaction,interaction.customId,null) 
   
  }
})


keepAlive()
client.login(process.env.TOKEN)

process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
     console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
     console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
     console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
     console.log(type, promise, reason);
});