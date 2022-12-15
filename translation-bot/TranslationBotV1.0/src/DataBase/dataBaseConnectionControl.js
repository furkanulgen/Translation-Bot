//? DataBase için Oluşturduğumuz Config Dosyasını Projeye Dahil Ediyoruz.
const dbConfig = require("./dbConfig.json");
//? DataBase ile İletişimimizi Kuracak Olan Kütüphaneyi Projeye Dahil Ediyoruz.
const db = require('mysql');


module.exports = () =>
{
  //? DataBase Bağlantısı Oluşturuyoruz.
  var vt = db.createConnection({
    host     : `${dbConfig.dbHost}`,
    user     : `${dbConfig.dbUsername}`,
    password : `${dbConfig.dbPassword}`,
    database : `${dbConfig.dbName}`
  });

  vt.connect(function(err) {//? Oluşturduğumuz DB Bağlantısına Bağlanıyoruz.
   if (err) {throw err}//? Hatayı Var ise Bastırıyoruz.
   else if(!err) {console.log("DB CONNECT: SUCCESSFUL")}//? Bağlantı Oluşturulduğunu Anlıyoruz.
   vt.query(`Select * From users;`, function (err, result) {//? Sorgumuzu Yapıyoruz.
     if (err) throw err;//? Hatayı Var ise Bastırıyoruz.
    });
   vt.end(function(endErr) {console.log("DB DISCONNECT: SUCCESSFUL")});//? DB Bağlantısını Sonlandırıyoruz
  });
}