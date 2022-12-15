//? Discord.js Kütüphanesini projemize dahil ediyoruz.
const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
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

//? Gerekli Modulleri Dahil Ediyoruz.
const dataBaseRegister = require("./dataBaseRegister.js");
const dataBaseUpdate = require("./databaseUpdate.js");


module.exports = (message) =>
{
  //? DataBase Bağlantısı Oluşturuyoruz.
  var vt = db.createConnection({
    host     : `${dbConfig.dbHost}`,
    user     : `${dbConfig.dbUsername}`,
    password : `${dbConfig.dbPassword}`,
    database : `${dbConfig.dbName}`
  });

  var sql = `Select * From users WHERE id="${message.author.id}";`;//? SQL Sorgumuzu Tanımlıyoruz.

  vt.connect(function(conErr) {//? Oluşturduğumuz DB Bağlantısına Bağlanıyoruz.
   if (conErr) throw conErr;//? Hatayı Var ise Bastırıyoruz.
   else if(!conErr) console.log("DB CONNECT: SUCCESSFUL");//? Bağlantı Oluşturulduğunu Anlıyoruz.
   vt.query(sql, function (err, result) {//? Sorgumuzu Yapıyoruz.
     if (err) throw err;//? Hatayı Var ise Bastırıyoruz.
     if(result[0]== undefined) dataBaseRegister(message);//? Kayıt Yok İse Kayıt Olunması İçin Madul Çalıştırıyoruz.
     else if(result[0] != undefined) dataBaseUpdate(message);//? Kayıt Var İse Güncellemek İçin Madul Çalıştırıyoruz.
    });
    vt.end(function(err) {console.log("DB DISCONNECT: SUCCESSFUL")});//? DB Bağlantısını Sonlandırıyoruz
  });
}