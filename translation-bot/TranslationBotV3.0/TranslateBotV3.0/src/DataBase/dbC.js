const dbUR = require("./dbUR.js");
const settings = require("../../settings.json");
const db = require("mysql");
const translate = require("../Translate/translate.js");
const { MessageEmbed } = require("discord.js");
const { times } = require("lodash");

module.exports.ConnectionControl = () => {
  var vt = db.createConnection({
    host: `${settings.dbHost}`,
    user: `${settings.dbUsername}`,
    password: `${settings.dbPassword}`,
    database: `${settings.dbName}`,
  });

  vt.connect(function (err) {
    if (err) {
      throw err;
    } else if (!err) {
      console.log("DB CONNECT: SUCCESSFUL");
    }
    vt.query(`Select COUNT(*) From users;`, function (err, result) {
      if (err) throw err;
    });
    vt.end(function (endErr) {
      console.log(`DB REASON: Connection Control > ID : ${Date()}`);
      console.log("DB DISCONNECT: SUCCESSFUL");
      console.log("========================");
    });
  });
};

module.exports.TranslateControl = (message) => {
  var vt = db.createConnection({
    host: `${settings.dbHost}`,
    user: `${settings.dbUsername}`,
    password: `${settings.dbPassword}`,
    database: `${settings.dbName}`,
  });

  var tSql = `Select _to From users Where _id = '${message.author.id}';`;

  vt.connect(function (conErr) {
    if (conErr) throw conErr;
    else if (!conErr) console.log("DB CONNECT : SUCCESSFUL");
    vt.query(tSql, function (err, result) {
      if (err) throw err;
      else if (result[0] == undefined) {
        dbUR.Register(message);
      }
      if (result[0] != undefined) {
        translate(message, result[0]._to);
      } else if (result[0] == undefined) {
        translate(message);
      }
    });
    vt.end(function (err) {
      console.log(
        `DB REASON: Translate Control            > ID : ${message.author.tag}`
      );
      console.log("DB DISCONNECT: SUCCESSFUL");
      console.log("========================");
    });
  });
};

module.exports.URC = (message) => {
  var sql = `Select * From users WHERE _id="${message.author.id}";`;

  var vt = db.createConnection({
    host: `${settings.dbHost}`,
    user: `${settings.dbUsername}`,
    password: `${settings.dbPassword}`,
    database: `${settings.dbName}`,
  });

  vt.connect(function (conErr) {
    if (conErr) throw conErr;
    else if (!conErr) console.log("DB CONNECT: SUCCESSFUL");
    vt.query(sql, function (err, result) {
      if (err) throw err;
      if (result[0] == undefined) dbUR.Register(message);
      else if (result[0] != undefined) dbUR.Update(message);
    });
    vt.end(function (err) {
      console.log(
        `DB REASON: Update and Register Control  > ID : ${message.author.tag}`
      );
      console.log("DB DISCONNECT: SUCCESSFUL");
      console.log("=========================");
    });
  });
};

module.exports.DBMFA = (message) => {
  message.delete();

  if (message.author.id == settings.founderID) {
    var SQL = message.content.slice(7);

    var vt = db.createConnection({
      host: `${settings.dbHost}`,
      user: `${settings.dbUsername}`,
      password: `${settings.dbPassword}`,
      database: `${settings.dbName}`,
    });

    vt.connect(function (conErr) {
      if (conErr) throw conErr;
      else if (!conErr) console.log("DB CONNECT: SUCCESSFUL");
      vt.query(SQL, function (err, result) {
        if (err) throw err;
        message.author.send("Admin Administration Successful.");
        console.table(result);
      });
      vt.end(function (err) {
        console.log(`DB REASON: DBMFA  |||${message.author.tag}|||`);
        console.log("DB DISCONNECT: SUCCESSFUL");
        console.log("========================");
      });
    });
  } else {
    message.author.send("You Are Not an Administrator or Founder");
  }
};
