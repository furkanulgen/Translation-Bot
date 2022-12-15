module.exports = (client) => {
    console.log('Welcome to Home Sir');
    client.user.setActivity('Translate', { type: 0 });
    console.log(client.guilds.cache.size);
    console.log("DISCORD API : SUCCESSFUL");
}