const { Client, Intents , MessageEmbed, MessageManager, Message} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

const settings = require('../settings.json');

module.exports = (client,message) => {
    const msgEmbed = new MessageEmbed()
    .setAuthor({name:`${message.author.tag} Message`, iconURL : message.author.displayAvatarURL()})
    .setDescription("Message Content: \n" + message.content)
    .setFields(
        {name:"Guild", value:`${message.guild.name}`, inline:true},
        {name:"Channels", value:`${message.channel.name}`, inline:true})
    if(!message.author.bot)
    {
        if(settings.whitelist != message.guildId)
        {
            client.channels.cache.get('993495514886717481').send({embeds : [msgEmbed]});
        }
    }
}