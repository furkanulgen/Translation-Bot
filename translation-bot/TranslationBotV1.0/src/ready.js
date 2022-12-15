const { Client, Intents , MessageEmbed, MessageManager, Guild} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

module.exports = (client) => {
    console.log('Welcome to Home Sir');
    //console.log(`${client.guilds}`);
    console.log(``);
    console.log(``);
    console.log(``);
}