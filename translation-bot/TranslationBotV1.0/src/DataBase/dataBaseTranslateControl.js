//? Discord Kütüphanesini Projeye Dahil Ediyoruz
const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES
] });

//? Gerekli Modulleri Dahil Ediyoruz.
const dataBaseRegister = require("./dataBaseRegister.js");
//? Ceviri Yapacağımız Modulu Ekliyoruz
const translate = require("../Translate/translate.js");
//? Translate Kütüphanesini Projeye Dahil Ediyoruz
const cevir = require('translate-google');
//? DataBase Kütüphanesini Projeye Dahil Ediyoruz
const db = require('mysql');
//? Databasenin ayarlarının tutuldugu dosyayı Projeye Dahil Ediyoruz.
const dbConfig = require("../DataBase/dbConfig.json");
//? Genel Ayarların saklandığı dosyayı Projeye Dahil Ediyoruz.
const settings = require('../../settings.json');

module.exports = (message) =>
{
  //? Database Bağlantısını Oluşturup Düzenliyoruz.
  var vt = db.createConnection
  ({
      host     : `${dbConfig.dbHost}`,
      user     : `${dbConfig.dbUsername}`,
      password : `${dbConfig.dbPassword}`,
      database : `${dbConfig.dbName}`
  });

  var tSql = `Select _to From users Where id = "${message.author.id}";`//? Sql Sorguları

  vt.connect(function(conErr) {//? Oluşturduğumuz DB Bağlantısına Bağlanıyoruz.
    if (conErr) throw conErr;//? Hatayı Var ise Bastırıyoruz.
    else if(!conErr) console.log("DB CONNECT : SUCCESSFUL");//? Bağlantı Oluşturulduğunu Anlıyoruz.
    vt.query(tSql, function (err, result) {
      if (err) throw err;//? Hatayı Var ise Bastırıyoruz.
      else if(result[0] == undefined){dataBaseRegister(message)}//? Kayıt Yok İse Kayıt Ediyoruz.
      if(result[0] != undefined){translate(message , result[0]._to)}//? Çeviri Modulunu Çalıştırıyoruz.
      else if(result[0] == undefined){translate(message)}//? Çeviri Modulunu Çalıştırıyoruz.
    });
    vt.end(function(err) {console.log("DB DISCONNECT: SUCCESSFUL")});//? DB Bağlantısını Sonlandırıyoruz
  });
}
  