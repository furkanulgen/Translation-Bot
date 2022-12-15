const db = require('mysql');
const settings = require('../../settings.json');

const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

module.exports.Register = (message) =>
{
  var args = message.content.toLowerCase().trim().split(/ +/g);
  var to = args[1];
  if(to == undefined || to.lenght > 5){to = "en"}

  var vt = db.createConnection({
    host     : `${settings.dbHost}`,
    user     : `${settings.dbUsername}`,
    password : `${settings.dbPassword}`,
    database : `${settings.dbName}`
  });

  var registerSql = `INSERT INTO users(_id,_to) VALUES("${message.author.id}","${to}")`;

  vt.connect(function(conErr) {
   if (conErr) throw conErr;
   else if(!conErr) console.log("DB CONNECT : SUCCESSFUL");
   vt.query(registerSql, function (err, result) {
     if (err) throw err;
     const registerEmbed = new MessageEmbed()
     .setAuthor({name : `${message.author.username} Welcome !` , iconURL : `${message.author.displayAvatarURL()}`})
     .setDescription(`\`\`\`We understand that you are using this bot for the first time\nDefault Language : ${to}\nWe Registered Your Id Welcome\`\`\``)
     .setThumbnail(settings.logo)
     .setColor(settings.color);
     if(!message.author.bot)
     {
      message.author.send({embeds : [registerEmbed]});
     }
    });
    vt.end(function(endErr)
    {
      console.log(`DB REASON: REGISTER                     > ID : ${message.author.tag}`);
      console.log("DB DISCONNECT: SUCCESSFUL");
      console.log("========================");
    });
  });
}


module.exports.Update = (message) => 
{
  message.delete();
  var args = message.content.toLowerCase().trim().split(/ +/g);
  var to = args[1];
  if(to == undefined || to.length > 5){to = "en"}
  
  var vt = db.createConnection({
    host     : `${settings.dbHost}`,
    user     : `${settings.dbUsername}`,
    password : `${settings.dbPassword}`,
    database : `${settings.dbName}`
  });

  var updateSql = `UPDATE users SET _id = "${message.author.id}" , _to="${to}" Where _id = "${message.author.id}";`;
  
  vt.connect(function(conErr) {
   if (conErr) throw conErr;
   else if(!conErr) console.log("DB CONNECT: SUCCESSFUL");
   vt.query(updateSql, function (err, result) {
     if (err) throw err;
     var updateEmbed = new MessageEmbed()
     .setAuthor({name : `${message.author.username} Language Updated !` , iconURL : `${message.author.displayAvatarURL()}`})
     .setDescription(`\`\`\`Your Information Has Been Updated. => ${to}\`\`\``)
     .setThumbnail(settings.logo)
     .setColor(settings.color);
     if(!message.author.bot)
     {
      message.author.send({embeds : [updateEmbed]});
     }
    });
    vt.end(function(endErr) 
    {
      console.log(`DB REASON: UPDATE                       > ID : ${message.author.tag}`);
      console.log("DB DISCONNECT: SUCCESSFUL");
      console.table("=========================")
    });
  });
}