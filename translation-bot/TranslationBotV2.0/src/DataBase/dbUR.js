const dbConfig = require("./dbConfig.json");
const db = require('mysql');
const settings = require('../../settings.json');

const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

module.exports.Register = (message) => 
{
  var args = message.content.toLowerCase().trim().split(/ +/g);//? String ifadesini parçalıyoruz.
  var to = args[1];  //* to = en
  if(to == undefined || to.lenght > 5){to = "en"}

  var vt = db.createConnection({
    host     : `${dbConfig.dbHost}`,
    user     : `${dbConfig.dbUsername}`,
    password : `${dbConfig.dbPassword}`,
    database : `${dbConfig.dbName}`
  });

  var registerSql = `INSERT INTO users(_id,_to) VALUES("${message.author.id}","${to}")`;

  vt.connect(function(conErr) {//? Oluşturduğumuz DB Bağlantısına Bağlanıyoruz.
   if (conErr) throw conErr;//? Hatayı Var ise Bastırıyoruz.
   else if(!conErr) console.log("DB CONNECT : SUCCESSFUL");//? Bağlantı Oluşturulduğunu Anlıyoruz.
   vt.query(registerSql, function (err, result) {//? Sorgumuzu Yapıyoruz.
     if (err) throw err;//? Hatayı Var ise Bastırıyoruz.
     const registerEmbed = new MessageEmbed()
     .setAuthor({name : `${message.author.username} Kayıt Oldun !` , iconURL : `${message.author.displayAvatarURL()}`})
     .setDescription("TÜRKÇE:\n```Anladık ki Bu Botu İlk kez Kullanıyorsun.\nVarsayılan Dil : English\nId'ni Kaydettik Hoşgeldin !```ENGLISH:```We understand that you are using this bot for the first time\nDefault Language : English\nWe Registered Your Id Welcome```")
     .setThumbnail(dbConfig.logo)
     .setColor(dbConfig.color);
     if(!message.author.bot)
     {
      if(settings.whitelist != message.guildId)
      {
        message.author.send({embeds : [registerEmbed]});
      }
     }
    });
    vt.end(function(endErr) {console.log("DB DISCONNCET: SUCCESSFUL")});//? DB Bağlantısını Sonlandırıyoruz
  });
}


module.exports.Update = (message) => 
{
  var args = message.content.toLowerCase().trim().split(/ +/g);
  var to = args[1];  //* to = en
  if(to == undefined || to.length > 5){to = "en"}
  
  var vt = db.createConnection({
    host     : `${dbConfig.dbHost}`,
    user     : `${dbConfig.dbUsername}`,
    password : `${dbConfig.dbPassword}`,
    database : `${dbConfig.dbName}`
  });

  var updateSql = `UPDATE users SET _id = "${message.author.id}" , _to="${to}" Where _id = "${message.author.id}";`;
  
  vt.connect(function(conErr) {
   if (conErr) throw conErr;
   else if(!conErr) console.log("DB CONNECT: SUCCESSFUL");
   vt.query(updateSql, function (err, result) {
     if (err) throw err;
     var updateEmbed = new MessageEmbed()
     .setAuthor({name : `${message.author.username} Dil Güncellemesi Yaptı!` , iconURL : `${message.author.displayAvatarURL()}`})
     .setDescription(`TÜRKÇE:\`\`\`Dil Güncellendi. => ${to}\`\`\`\nENGLISH:\`\`\`Your Information Has Been Updated. => ${to}\`\`\``)
     .setThumbnail(dbConfig.logo)
     .setColor(dbConfig.color);
     if(!message.author.bot)
     {
      if(settings.whitelist != message.guildId)
      {
        message.author.send({embeds : [updateEmbed]});
      }
     }
    });
    vt.end(function(endErr) {console.log("DB DISCONNECT: SUCCESSFUL")});
  });
}