const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.token);


// REAZIONI
client.on("message", (message) => {
    if (message.content == "!Reazione") {
        message.channel.send("Ciao")
            .then(function (message) {
                message.react("😍");
                message.react("😭");
            })
    }
})

// REAZIONE CONTROLLATA
client.on("message", (message) => {
    if (message.content == "!Reazione1") {
        message.channel.send("Segli una reazione")
            .then(messaggio => {
                messaggio.react("👍");
                messaggio.react("👎");

                var filtro = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id == message.author.id;

                messaggio.awaitReactions(filtro, { max: 1, time: 10000 })
                    .then(collected => {
                        var reazione = collected.first().emoji.name;
                        if (reazione == "👍") {
                            message.channel.send("OK, bravo");
                        }
                        if (reazione == "👎") {
                            message.channel.send("NO, arrivederci");
                        }

                    }).catch(collected => {
                        return message.channel.send("Tempo scaduto!");
                    })




            })
    }
})

// KICK & BAN
client.on("message", (message) => {
    if (message.content.startsWith("!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }

    if (message.content.startsWith("!ban")) {
        var utenteBan = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteBan) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + " è stato bannato"))

    }
})

// AIUTANTE
client.on("message", message => {
    if (message.content == "!aiutante") {
        if (message.member.roles.cache.has("904472698984497172")) {
            message.channel.send(`Sei un aiutante`);
        } else {
            message.channel.send(`Non sei un aiutante`);
        }
    }
})

// MOD
client.on("message", message => {
    if (message.content == "!mod") {
        if (message.member.roles.cache.has("904472236658921482")) {
            message.channel.send(`Sei un mod`);
        } else {
            message.channel.send(`Non sei un mod`);
        }
    }
})

// GESTORE SERVER_STAFF
client.on("message", message => {
    if (message.content == "!gestore") {
        if (message.member.roles.cache.has("904471859691655220")) {
            message.channel.send(`Sei un gestore`);
        } else {
            message.channel.send(`Non sei un gestore`);
        }
    }
})

//BENVENUTO
client.on("guildMemberAdd", (member) => {
    //console.log(member.guild); Per avere tutte le info del utente e del server
    client.channels.cache.get("904471165169442846").send("Ciao " + member.toString() + " benvunuto nel **" + member.guild.name + "**\rSei il **" + member.guild.memberCount + "° membro**");
})

//ADDIO
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get("909367527233175572").send("Addio😢" + member.toString() + ", torna presto!");
})

// CLEAR 
client.on("message", message => {
    if (message.content.startsWith("!clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 1000 })
        })

    }
})

//BUTTONS MENU
const disbut = require("discord-buttons")
disbut(client);

const { MessageButton, MessageActionRow } = require("discord-buttons")

client.on("message", message => {
    if (message.content == "!Help") {
        var button1 = new MessageButton()
            .setLabel("Community Discord")
            .setStyle("url")
            .setURL("https://discord.com/invite/zhqmfW4xK7")
        var button2 = new MessageButton()
            .setLabel("Help in arrivo")
            .setStyle("green")
            .setID("Help in arrivo")
        
        var button3 = new MessageButton()
            .setLabel("Help Discord")
            .setStyle("red")
            .setID("SERVER DISCORD HELP IN ARRIVO")

        var row = new MessageActionRow()
            .addComponent(button1)
            .addComponent(button3)
            .addComponent(button2)

        var embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("IN ARRIVO")

        message.channel.send(embed, row)
    }
})
