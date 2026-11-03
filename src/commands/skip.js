const { skip } = require('../services/audioPlayer');

module.exports = {
  name: 'skip',
  description: 'Passe à la musique suivante.',

  async execute(message) {
    try {
      const skipped = skip(message.guild.id);

      if (!skipped) {
        return message.reply('Aucune musique n’est en cours.');
      }

      return message.reply('Musique passée.');
    } catch (error) {
      console.error('Erreur dans !skip:', error.message);
      return message.reply('Impossible de passer à la musique suivante.');
    }
  },
};