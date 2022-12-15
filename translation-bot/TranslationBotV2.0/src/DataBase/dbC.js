const dbUR = require('./dbUR.js');
const dbConfig = require("./dbConfig.json");
const db = require('mysql');
const translate = require("../Translate/translate.js");

module.exports.ConnectionControl = () => 
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


module.exports.TranslateControl = (message) => 
{
    var vt = db.createConnection
    ({
        host     : `${dbConfig.dbHost}`,
        user     : `${dbConfig.dbUsername}`,
        password : `${dbConfig.dbPassword}`,
        database : `${dbConfig.dbName}`
    });

    var tSql = `Select _to From users Where _id = "${message.author.id}";`//? Sql Sorguları

    vt.connect(function(conErr) {
      if (conErr) throw conErr;
      else if(!conErr) console.log("DB CONNECT : SUCCESSFUL");
      vt.query(tSql, function (err, result) {
        if (err) throw err;
        else if(result[0] == undefined){dbUR.Register(message);}
        if(result[0] != undefined){translate(message , result[0]._to)}
        else if(result[0] == undefined){translate(message)}
      });
      vt.end(function(err) {console.log("DB DISCONNECT: SUCCESSFUL")});
    });
}


module.exports.URC = (message) => 
{
    var sql = `Select * From users WHERE _id="${message.author.id}";`;

    var vt = db.createConnection({
        host     : `${dbConfig.dbHost}`,
        user     : `${dbConfig.dbUsername}`,
        password : `${dbConfig.dbPassword}`,
        database : `${dbConfig.dbName}`
    });

    vt.connect(function(conErr) {
     if (conErr) throw conErr;
     else if(!conErr) console.log("DB CONNECT: SUCCESSFUL");
     vt.query(sql, function (err, result) {
       if (err) throw err;
       if(result[0] == undefined) dbUR.Register(message);
       else if(result[0] != undefined) dbUR.Update(message);
      });
      vt.end(function(err) {console.log("DB DISCONNECT: SUCCESSFUL")});
    });
}