require("dotenv").config()
const { Client, MessageEmbed, Attachment, Collection} = require("discord.js");
const client = new Client({disableEveryone: true})
const prefix = '-', setupimg = 'https://media.discordapp.net/attachments/730588872303706174/730769547342118922/Setup.png?width=770&height=406';

client.on("ready", () => {

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

const embed = new MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setImage(setupimg)
.setColor("RANDOM")
message.channel.send(embed).then(async msg => {

const ids = ["730541907691962400", "730541908429897819"]

await msg.react(ids[0])
await msg.react(ids[1])

msg.awaitReactions((reaction, user) => {

if (user.id == message.author.id){

if (reaction.emoji.id == ids[0]){

msg.edit(new MessageEmbed(msg.embeds[0]).setImage("https://media.discordapp.net/attachments/730588872303706174/730777174566502571/Register.png?width=773&height=406")).then(() => {

msg.reactions.cache.forEach(x => x.remove())

const f = m => m.author.id == message.author.id;

message.channel.awaitMessages(f, {max: 1, time: 100000, errors: ["time"]}).then(x => {

msg.edit(new MessageEmbed(msg.embeds[0]).setImage("https://media.discordapp.net/attachments/730588872303706174/730777273749209240/Aprobev.png?width=769&height=406"))
msg.react(ids[0]).then(() => msg.react(ids[1]).then(() => {


}))

}).catch(x => message.channel.send(x.message))

})

} else if (reaction.emoji.id == ids[1]) {
	message.channel.send("Has seleccionado la opción de declinar.")
}

}
})

})

}

})


client.login(process.env.token)