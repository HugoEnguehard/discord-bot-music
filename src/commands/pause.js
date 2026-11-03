const { pause } = require('../services/audioPlayer');

module.exports = {
  name: 'pause',
  description: 'Met la lecture en pause.',

  async execute(message) {
    const paused = pause(message.guild.id);

    if (!paused) {
      return message.reply('Aucune musique n’est en cours.');
    }

    return message.reply('Lecture mise en pause.');
  },
};