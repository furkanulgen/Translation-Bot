const dbControls = require('../DataBase/dbC.js');
const settings = require('../../settings.json');
const embeds = require('../Embeds/embeds.js');

module.exports.ready = (client) =>
{
    client.once('ready' , () =>
    {
        dbControls.ConnectionControl();
        console.log("Bulunduğu Server Sayısı:"+ client.guilds.cache.size);
        console.log("========================");
        console.log("DISCORD API : SUCCESSFUL");
        console.log("========================");
    });
}

module.exports.messageCreate = (client) =>
{
    client.on('messageCreate', (message) =>
    {
        if(message.content.toLowerCase().startsWith(settings.prefix + "update")) dbControls.URC(message);
        else if(message.content.toLowerCase().startsWith(settings.prefix + "help")) embeds.help(message);
        else if(message.content.toLowerCase().startsWith(settings.prefix + "language")) embeds.language(message);
        else if(message.content.toLowerCase().startsWith(settings.prefix + "info")) embeds.info(message);
        else if(message.content.toLowerCase().startsWith(settings.prefix + "admin")) dbControls.DBMFA(message);
        else if(message.content.toLowerCase().startsWith("+")) dbControls.TranslateControl(message);
    });
}

module.exports.activity = (client) =>
{
    var ActivityGame = [
        "Help for +help",
        "Info for +info",
        "prefix +",
        "Click Above to Invite Me",
        `${Math.round((client.uptime/1000)/60) + " Minutes Continuous Service"}`
    ];
    var random = Math.floor(Math.random()*(ActivityGame.length));
    client.user.setActivity(ActivityGame[random], { type: 'LISTENING' });
    //client.user.setActivity('Help for +help', { type: 0 });
}