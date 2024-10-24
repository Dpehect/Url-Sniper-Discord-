const {
Client,
GatewayIntentBits,
Partials,
} = require("discord.js");
const fs = require("fs");
const config = require("./config.js");
const client = new Client({
partials: [
Partials.Message, 
Partials.Channel, 
Partials.GuildMember,
],
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers, 
GatewayIntentBits.GuildMessages, 
GatewayIntentBits.MessageContent 
],
});

module.exports = client;

fs.readdir("./events", (_err, files) => {
files.forEach((file) => {
if (!file.endsWith(".js")) return;
const event = require(`./events/${file}`);
let eventName = file.split(".")[0];
console.log(`👌 Loadded Event: ${eventName}`);
client.on(eventName, event.bind(null, client));
delete require.cache[require.resolve(`./events/${file}`)];
});
});


client.login(config.TOKEN || process.env.TOKEN).catch(e => {
console.log("Your Bot Token is Invalid Or Your Bot's INTENTS Are OFF! Please visit https://blog.codeshare.me/2023/12/discord-vanity-url-sniper-usage.html and check your bot's token and intents.")
})

const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);