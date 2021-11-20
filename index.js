const Discord = require("discord.js");
const client = new Discord.Client(
    {intents: ["GUILDS","GUILD_MEMBERS","GUILD_MESSAGES"] }
);
const prefix = "i!"

client.login(process.env.token);

client.on("ready", () => {
    console.log("Bot Online")
})

client.on("messageCreate",(message) => {
    if(message.content == prefix + "test"){
       message.channel.send("Bot funzionante!")
       message.channel.send("Il mio prefix è: " + prefix)
       message.channel.send("Per problemi aprire ticket in assistenza")
    }
})

client.on("messageCreate", (message) => {
    if (message.content == prefix + "embed") {
        var embed = new Discord.MessageEmbed()
            .setTitle("Titolo embed")
            .setDescription(`${message.author.username} ha scritto il messaggio`)

        message.channel.send({ embeds: [embed] })
    }
})