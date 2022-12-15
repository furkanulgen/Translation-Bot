const dbConfig = require("./dbConfig.json");
const db = require('mysql');


module.exports = (message) =>
{
    message.channel.send("test basarılı");
    console.log("Kontrol İçin Bağlanılıyor");
    var vt = db.createConnection({
      host     : `${dbConfig.dbHost}`,
      user     : `${dbConfig.dbUsername}`,
      password : `${dbConfig.dbPassword}`,
      database : `${dbConfig.dbName}`
    });

    vt.connect(function(err) {
     if (err) 
     {
        throw err
     }
     else if(!err) 
     {
       console.log("DB CONNECT: SUCCESSFUL");
     }
     vt.query(`Select * From users;`, function (err, result) {
        if (err) throw err;
     });
     vt.end(function(err) {console.log("DB DISCONNECT: SUCCESSFUL")});
    });
}