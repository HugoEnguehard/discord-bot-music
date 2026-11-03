require('dotenv').config({
  quiet: true,
});

const { Client, IntentsBitField } = require('discord.js');
const { commands } = require('./commands');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.on('ready', (c) => {
  console.log(`Bot ${c.user.tag} is online and ready to play music.`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  const [commandName, ...args] = message.content.slice(1).trim().split(/\s+/);
  const command = commands[commandName.toLowerCase()];

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(`Erreur dans la commande !${commandName}:`, error);
    return message.reply('Une erreur est survenue lors de l’exécution de la commande.');
  }
});

client.login(process.env.TOKEN);