const discord = require('discord.js'),
      Client = new discord.Client(),
      db = require('quick.db'),
      prefix = '!';
      
Client.on('ready', () => {
  console.log('Ready' + Client.user.tag)
})

Client.on('message', async message => {
  if(message.content.toLowerCase() === `${prefix}help`) {
    let helpTerms = db.get(`helptermss_${message.author.id}`)
    if(helpTerms === null) {
    const embedTerms = new discord.MessageEmbed().setColor('GREEN').setDescription('**BOT RULES**EXAMPLE Please react to \'💫\'')/*customize your own bot rules or terms*/
    message.channel.send(embedTerms)
   message.react('🌟')
    const filter = (reaction, user) => {
      return ['🌟'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']}) /*1 min if the user hasnt reacted it will send a error message and will stop the prompt*/
    .then(collected => {
      const reaction = collected.first();
      
      if(reaction.emoji.name === '🌟') {
        db.add(`helptermss_${message.author.id}`, 1)
        message.channel.send(`Cool! now retype ${prefix}help to see my commands!`)
      }
}).catch(collected => {
  message.channel.send(`You did not agree the terms!`) /*it will cancel if the user is not accepting the terms*/
});
} else {
  const embedHelp = new discord.MessageEmbed().setColor('EAA1D5').setDescription('**BOT CoOMMANDS**EXAMPLE')/*customize your own help embed*/
    message.channel.send(embedHelp)
}
}
})

Client.login('')