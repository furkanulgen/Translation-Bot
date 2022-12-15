//? Discord Kütüphanesini Projeye Dahil Ediyoruz
const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES
] });

//? Translate Kütüphanesini Projeye Dahil Ediyoruz
const cevir = require('translate-google');
//? Ayarların saklandığı dosyayı Projeye Dahil Ediyoruz.
const settings = require('../../settings.json');

module.exports = (message, _to) =>
{
    cevir(message.content.slice(1),{to:_to}).then(msg =>
    {
        const transembed = new MessageEmbed()
          .setAuthor({name : `${message.author.tag} says ;` , iconURL : `${message.author.displayAvatarURL()}`})
          .setDescription(`${msg}`)
          .setColor(settings.color)
          .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/2048px-Google_Translate_logo.svg.png");
        message.channel.send({embeds : [transembed]});
        
        }).catch(err =>{
          const transerr = new MessageEmbed()
          .setAuthor({name : `${message.author.tag} OOPS !` , iconURL : `${message.author.displayAvatarURL()}`})
          .setDescription(`Language Not Supported\nPlease select a supported language`)
          .setColor(settings.color)
          .setThumbnail(settings.logo)
          message.channel.send({embeds : [transerr]});
        })
        message.delete();
}
  