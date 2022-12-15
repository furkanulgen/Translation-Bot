//? Discord.js Kütüphanesini projemize dahil ediyoruz.
const { Client, Intents , MessageEmbed } = require('discord.js');
const client = new Client({ 
    intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES] 
});

//? DataBase ile İletişimimizi Kuracak Olan Kütüphaneyi Projeye Dahil Ediyoruz.
const db = require('mysql');

//? DataBase için Oluşturduğumuz Config Dosyasını Projeye Dahil Ediyoruz.
const dbConfig = require("./dbConfig.json");

module.exports = (message) =>
{
  var args = message.content.toLowerCase().trim().split(/ +/g);//? String ifadesini parçalıyoruz.
  var to = args[1];  //* to = en
  if(to == undefined && to.length > 5){to = "en"}

  //? DataBase Bağlantısı Oluşturuyoruz.
  var vt = db.createConnection({
    host     : `${dbConfig.dbHost}`,
    user     : `${dbConfig.dbUsername}`,
    password : `${dbConfig.dbPassword}`,
    database : `${dbConfig.dbName}`
  });

  var registerSql = `INSERT INTO users(id,_to) VALUES("${message.author.id}","${to}")`;//? SQL Sorgusunu Tanımlıyoruz. 

  vt.connect(function(conErr) {//? Oluşturduğumuz DB Bağlantısına Bağlanıyoruz.
   if (conErr) throw conErr;//? Hatayı Var ise Bastırıyoruz.
   else if(!conErr) console.log("DB CONNECT : SUCCESSFUL");//? Bağlantı Oluşturulduğunu Anlıyoruz.
   vt.query(registerSql, function (err, result) {//? Sorgumuzu Yapıyoruz.
     if (err) throw err;//? Hatayı Var ise Bastırıyoruz.
     const registerEmbed = new MessageEmbed()
     .setAuthor({name : `${message.author.username} Kayıt Oldu !` , iconURL : `${message.author.displayAvatarURL()}`})
     .setDescription("TÜRKÇE:\n```Anladık ki Bu Botu İlk kez Kullanıyorsun.\nVarsayılan Dil : English\nId'ni Kaydettik Hoşgeldin !```ENGLİSH:```We understand that you are using this bot for the first time\nDefault Language : English\nWe Registered Your Id Welcome```")
     .setThumbnail(dbConfig.logo)
     .setColor(dbConfig.color);
     message.channel.send({embeds : [registerEmbed]});//? Kullanıcının Anlaması İçin Kanala Başarılı Olduğunu Söylüyoruz.
    });
    vt.end(function(endErr) {console.log("DB DISCONNCET: SUCCESSFUL")});//? DB Bağlantısını Sonlandırıyoruz
  });
    
}