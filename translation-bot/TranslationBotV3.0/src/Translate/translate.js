const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

const cevir = require('translate-google');
const settings = require('../../settings.json');

module.exports = (message, _to) =>
{
  message.delete();
  cevir(message.content.slice(1),{to:_to}).then(msg =>
  {
    const transembed = new MessageEmbed()
      .setAuthor({name : `${message.author.tag} says ;` , iconURL : `${message.author.displayAvatarURL()}`})
      .setDescription(`${msg}`)
      .setColor(settings.color)
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/2048px-Google_Translate_logo.svg.png");
    message.channel.send({embeds : [transembed]});
    console.table("=========================");
    console.log(`DB REASON: TRANSLATE                    > ID : ${message.author.tag}`);
    console.table("=========================");
        
  }).catch(err =>{
    const transerr = new MessageEmbed()
      .setAuthor({name : `${message.author.tag} OOPS !` , iconURL : `${message.author.displayAvatarURL()}`})
      .setDescription(`Language Not Supported\nPlease select a supported language`)
      .setColor(settings.color)
      .setThumbnail(settings.logo)
    message.author.send({embeds : [transerr]});
  });
}
  