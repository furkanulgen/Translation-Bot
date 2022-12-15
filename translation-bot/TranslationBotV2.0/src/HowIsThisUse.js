/*
exports.tr = () => {
    console.log("tr")
}
exports.en = () => {
    console.log("en")
}
*/
const cevir = require('translate-google');

const { Client, Intents , MessageEmbed, MessageManager, Message} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });


module.exports.htu = (message) => 
{
    var lng = message.guild.preferredLocale.toLowerCase();
    if(lng == "en-us" || lng == "en-us") lng = "en";
    const aciklama = 'All sentences with "+" at the beginning are translated into sentences in the specified language.';
    cevir(aciklama,{to:lng}).then(msg =>
        {
            const lngEmbed = new MessageEmbed()
            .setAuthor({name : `${message.author.username} Hello !` , iconURL : `${message.author.displayAvatarURL()}`})
            .setDescription(msg)
            .setFields({name:"Example : ", value :"+hello",inline:false});
            message.channel.send({embeds : [lngEmbed]});
        }).catch(err =>{console.log(err)});
}