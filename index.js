const Discord = require("discord.js");
const fs = require("fs");

const config = require("./config.json");

const client = new Discord.Client();

// Event Manager :
fs.readdir("./events/", (err, files) => {

	if (err) return console.error(err);

	files.forEach(file => {

		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];

		client.on(eventName, (...args) => eventFunction.run(client, ...args));

	})

})

client.login(process.env.TOKEN);