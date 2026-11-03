const { resume } = require('../services/audioPlayer');

module.exports = {
  name: 'resume',
  description: 'Reprend la lecture.',

  async execute(message) {
    const resumed = resume(message.guild.id);

    if (!resumed) {
      return message.reply('Aucune musique en pause à reprendre.');
    }

    return message.reply('Lecture reprise.');
  },
};