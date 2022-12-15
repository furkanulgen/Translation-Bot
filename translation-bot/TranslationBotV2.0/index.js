const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

const settings = require("./settings.json");

const log = require('./src/log.js');
const ready = require('./src/ready.js');
const dbControls = require('./src/DataBase/dbC.js');

client.on('messageCreate', (message) =>
{
  log(client,message);
  if(message.content.toLowerCase().startsWith(settings.prefix + "select")) dbControls.URC(message);
  else if(message.content.toLowerCase().startsWith("+")) dbControls.TranslateControl(message);
  
});

client.once('ready' , () =>
{
  console.log(client.guilds.cache);
  dbControls.ConnectionControl();
  ready(client);
})



client.login(settings.token);