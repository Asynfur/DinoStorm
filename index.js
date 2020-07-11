
const express = require("express");
const app = express();
const { crearDB } = require("megadb")
const register = new crearDB("USERS")
app.use(express.static("public"));

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


require("dotenv").config()
const { Client, MessageEmbed, Attachment, Collection} = require("discord.js");
const client = new Client({disableEveryone: true})
const prefix = '-', setupimg = 'https://media.discordapp.net/attachments/730588872303706174/730769547342118922/Setup.png?width=770&height=406';

client.on("ready", () => {

client.user.setActivity("a "+client.users.cache.size+" usuarios", { type: "WATCHING"})

setTimeout(() => {

client.channels.cache.get("730451714737569852").send("Estoy encendido")

}, 2000)

})

client.on("message", message => {

if (message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ /g);
const command = args.shift().toLowerCase()

if (!message.content.startsWith(prefix)) return;

if (command == 'setup'){

if (register.has(message.author.id)) return message.channel.send("Ya estás registrado en nuestra base de datos.");

const embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setImage(setupimg)
.setColor("RANDOM")
message.channel.send(embed).then(async msg => {

const ids = ["730541907691962400", "730541908429897819"]

await msg.react(ids[0])
await msg.react(ids[1])

const fil = (reaction, user) => ids.includes(reaction.emoji.id) && user == message.author;

msg.awaitReactions(fil, { max: 1, time: 10000 }).then(collect => {

const reaction = collect.first()

if (reaction.emoji.id == ids[0]){

msg.edit(new MessageEmbed(msg.embeds[0]).setImage("https://media.discordapp.net/attachments/730588872303706174/730777174566502571/Register.png?width=773&height=406")).then(() => {

msg.reactions.cache.forEach(x => x.remove())

const f = m => m.author.id == message.author.id;

message.channel.awaitMessages(f, {max: 1, time: 100000, errors: ["time"]}).then(x => {

  register.find(false, (v) => v.name == x.first().content).then(e => {
    if (e) return message.channel.send("Nombre ya registrado")})

msg.edit(new MessageEmbed(msg.embeds[0]).setImage("https://media.discordapp.net/attachments/730588872303706174/730777273749209240/Aprobev.png?width=769&height=406"))
msg.react(ids[0]).then(() => msg.react(ids[1]).then(() => {

msg.awaitReactions(fil, { max: 1, time: 10000}).then(s => {
  const o = s.first()

if (o.emoji.id == ids[0]){
msg.edit(new MessageEmbed().setImage("https://media.discordapp.net/attachments/730588872303706174/730779723705221210/completed.png"))
register.set(message.author.id, { name: x.first().content})
} else {

}

})

}))

})

})

} else if (reaction.emoji.id == ids[1]) {
	message.channel.send("Has seleccionado la opción de declinar.")
}

})

})

}

if (command == 'ping'){
  message.channel.send("Tengo un ping de `"+client.ws.ping+"`ms")
}

if (command == 'eval'){
register.datos().then(x => console.log(x))
message.channel.send("Datos enviados.")
  }

})


client.login(process.env.token)