const { stop } = require('../services/audioPlayer');

module.exports = {
  name: 'stop',
  description: 'Arrête la lecture et déconnecte le bot.',

  async execute(message) {
    const stopped = stop(message.guild.id);

    if (!stopped) {
      return message.reply('Aucune musique n’est en cours.');
    }

    return message.reply('Lecture arrêtée.');
  },
};