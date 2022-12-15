const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

const settings = require("./settings.json");
const events = require('./src/Events/events.js');

events.messageCreate(client);

events.ready(client);

setInterval(function() {
    events.activity(client);
}, 1 * 10000);

client.login(settings.token);