//? Discord.js Kütüphanesini projemize dahil ediyoruz.
const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ 
    intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES] 
});

const dbConfig = require("./dbConfig.json");
const db = require('mysql');


module.exports = (message) =>
{

  var args = message.content.toLowerCase().trim().split(/ +/g);
  var to = args[1];  //* to = en
    
    console.log(" Kayıt Kontrol İçin Bağlanılıyor")
    var vt = db.createConnection({
      host     : `${dbConfig.dbHost}`,
      user     : `${dbConfig.dbUsername}`,
      password : `${dbConfig.dbPassword}`,
      database : `${dbConfig.dbName}`
    });

    //? SQL SORGULARI
    var updateSql = `UPDATE users SET id = "${message.author.id}" , _to="${to}" Where id = "${message.author.id}";`;

    vt.connect(function(conErr) {
     if (conErr) throw conErr;
     else if(!conErr) console.log("DB CONNECT: SUCCESSFUL");
     vt.query(updateSql, function (err, result) {
       if (err) throw err;
       var updateEmbed = new MessageEmbed()
       .setAuthor({name : `${message.author.username} Dil Güncellemesi Yaptı!` , iconURL : `${message.author.displayAvatarURL()}`})
       .setDescription("```Dil Güncellendi.```\n```Your Information Has Been Updated.```")
       .setThumbnail(dbConfig.logo)
       .setColor(dbConfig.color);
       message.channel.send({embeds : [updateEmbed]});
      });
      vt.end(function(endErr) {console.log("DB DISCONNECT: SUCCESSFUL")});
    });
    
}