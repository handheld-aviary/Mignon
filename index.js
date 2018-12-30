const Discord = require("discord.js");
const fs = require("fs");

const config = require("./config.json");

const client = new Discord.Client();

// Event Manager :
fs.readdir("./events/", (err, files) => {

	if (err) return console.error(err);

	files.forEach(file => {

		console.log("So I ended up doing the YMCA");

		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];

		client.on(eventName, (...args) => eventFunction.run(client, ...args));

	})

})

// Command Manager

client.on("message", (message) => {

	if (message.author.bot) return;

	if (message.content.indexOf(config.prefix) !== 0) return;
	if (command.indexOf("/") !== -1 || command.indexOf("\\") !== -1 || command.indexOf("..") !== -1) return message.channel.send("Please remove all slashes and backslashes from your command "+message.member);

	const args = message.content.slice(prefix.length).trim().split(" ");
	const command = args.shift().toLowerCase();

	try {

		let commandFile = require("./commands/" + command + ".js");

		commandFile.run(client, prefix, message, args);

	} catch (err) {

		console.error(err);

	}

})

client.login(process.env.TOKEN);