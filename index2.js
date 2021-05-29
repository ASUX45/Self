const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json"); //aq o requires ne
const colors = require("colors");
const fs = require("fs");
const sleep = require('system-sleep');

let membros = [];
let contador = 0;
let mensagem = fs.readFileSync("mensagem.txt").toString("utf-8"); //aq ele checa os svs que o menor ta



client.on("ready", () => {
    console.log(`[BOT] Conectado na conta:  ${client.user.tag}`.blue)
    console.log(`[BOT] BOT ID: ${client.user.id}`.blue)
})// aq ele faz o proibido no dc conecta na cona


client.on("guildCreate", (guild) => {
    console.log(`[BOT] Fui adicionado no servidor ${guild.name} || ID: ${guild.id} || Membros: ${guild.memberCount}`.cyan) //aq e quando tu entra em um sv
});

client.on("guildDelete", (guild) => {
    console.log(`[BOT] Fui retirado do servidor ${guild.name} || ID: ${guild.id} || Membros: ${guild.memberCount}`.cyan)// quando tu sai
});


//comando
client.on("message", (message) => {
    if(message.author.id !== client.user.id) return; //aq e um comando pra sair de todas as guild
    if(message.content === "dd!sair") {
        client.guilds.forEach((guild) => {
            guild.leave()
        })
    }
});


//evento message 1
client.on("message", (message) => {
    if (message.channel.id !== config.chatid1) return;
    if (message.author.id !== config.botid1) return; //aq a lista de enviar msg
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first()

        client.fetchUser(user).then((user) => {
            //          console.log(`[BOT] Adicionando o ID ${user.id} || ${user.username}#${user.discriminator} na lista`.yellow)
            membros.push(user.id)
        })
    }
})

//evento message 2
client.on("message", (message) => {
    if (message.channel.id !== config.chatid2) return;
    if (message.author.id !== config.botid2) return;
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first() //aq ta duplicado sla pq lembrando iz essa merda em 2018

        client.fetchUser(user).then((user) => {
                      console.log(`[BOT] Adicionando o ID ${user.id} || ${user.username}#${user.discriminator} na lista`.yellow)
            membros.push(user.id)
        })
    }
})

//evento message 3
client.on("message", (message) => {
    if (message.channel.id !== config.chatid3) return;
    if (message.author.id !== config.botid3) return; //triplicado
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first()

        client.fetchUser(user).then((user) => {
            //          console.log(`[BOT] Adicionando o ID ${user.id} || ${user.username}#${user.discriminator} na lista`.yellow)
            membros.push(user.id)
        })
    }
})

//evento message 4
client.on("message", (message) => {
    if (message.channel.id !== config.chatid4) return; //va a merda
    if (message.author.id !== config.botid4) return;
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first()

        client.fetchUser(user).then((user) => {
            //          console.log(`[BOT] Adicionando o ID ${user.id} || ${user.username}#${user.discriminator} na lista`.yellow)
            membros.push(user.id)
        })
    }
})

//evento message 5
client.on("message", (message) => {
    if (message.channel.id !== config.chatid5) return;
    if (message.author.id !== config.botid5) return;//dnv
    if(message.mentions.users.first()) {
        let user = message.mentions.users.first()

        client.fetchUser(user).then((user) => {
            //          console.log(`[BOT] Adicionando o ID ${user.id} || ${user.username}#${user.discriminator} na lista`.yellow)
            membros.push(user.id)
        })
    }
})


client.on('ready', () => {
    setInterval(function () {
        if (contador > 300) {
            console.log(`[BOT] Opa enviei mensagem para 10 usuários, então irei dar uma pausa de 25 minutos `.yellow);
            sleep(20000 * 30000)
            contador = contador - 400
        } else { //aq ele da uma pausa pa conta nao ser banida do discod
            let membro = client.users.get(membros[0])
            if (!membro) return;
            console.log(`[BOT] Enviando mensagem ao usuário ${membro.username}#${membro.discriminator}`.green)
            membro.send(mensagem).catch(err => {
                if (err.message === "Cannot send messages to this user") {
                    return console.log(`[BOT] não foi possível enviar mensagens para o usuário ${membro.username}#${membro.discriminator} , usuario com privado block`.red)
                }
            })
            contador++;
            membros.shift()
        }
    }, 30000)


})



process.on('unhandledRejection', (err, p) => {
    if (err)
        return;
});

client.login(config.token).catch(err => {
    if (err.message === "Incorrect login details were provided.") { //aq e os mimii
        return console.log(`[BOT] o esta token errado`.red)
    }
})