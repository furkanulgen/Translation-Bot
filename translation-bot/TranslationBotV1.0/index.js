//? Discord.js Kütüphanesini projemize dahil ediyoruz.
const { Client, Intents , MessageEmbed, MessageManager} = require('discord.js');
const { readSync } = require('graceful-fs');
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });

//? Ayarlarımızın Sakladığı Dosyayı Ana Dosyamıza Entegre Ediyoruz.
const settings = require("./settings.json");

//? Bu Dosyanın Dışında Çalışıcak Dosyaları Tanımlıyoruz.
const dataBaseConnectionControl = require("./src/DataBase/dataBaseConnectionControl.js");
const dataBaseControl= require('./src/DataBase/dataBaseControl.js');
const dataBaseTest = require('./src/DataBase/dataBaseTest.js');
const cevir = require('./src/DataBase/dataBaseTranslateControl.js');
const log = require('./src/log.js');
const ready = require('./src/ready.js');
const htu = require('./src/HowIsThisUse.js');

//? Botun Bulunduğu Sunucuların kanallarını dinleyip istediğimiz mesaj attıldığında gerekli işlemleri yapacağız.
client.on('messageCreate', (message) =>
{
  log(client,message);
  if(message.content.toLowerCase() == settings.prefix + "test"){dataBaseTest(message);}//? Kanalara Test Mesajı Geldiğinde test modulunu çalıştırıyoruz.
  else if(message.content.toLowerCase().startsWith(settings.prefix + "select")){dataBaseControl(message);}//? Kanalara select işlemi geldiğinde Dil Seçimi İçin DataBase modulunu Çalıştırıyoruz.
  else if(message.content.toLowerCase().startsWith("+" + "howtouse")) htu.htu(message);
  else if(message.content.toLowerCase().startsWith("+")){cevir(message);}//? kanalara "+" ifadesi ile başlayan bir cümle geldiğinde çeviri yapıyoruz
  
});

client.once('ready' , () =>{//?Discord Apisine Bağlandığında Çalışacak Kod Bloğumuz
  console.log("DISCORD API : SUCCESSFUL");//? Discordun API Ağına Bağlandığını Belirtiyoruz
  dataBaseConnectionControl();//? DataBase ile ilk bağlantıyı kurup DataBase'nin Durumunu test ediyoruz
  //ready();
  console.log(client.guilds.cache.size);
})



//? Eklediğimiz discord kütüphanesinin api keyini giriyoruz.
client.login(settings.token);