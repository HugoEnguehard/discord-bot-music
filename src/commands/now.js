const { getCurrentTrack } = require('../services/queueManager');

module.exports = {
  name: 'now',
  description: 'Affiche la musique actuellement jouée.',

  async execute(message) {
    try {
      const track = getCurrentTrack(message.guild.id);

      if (!track) {
        return message.reply(
          'Aucune musique n’est actuellement en lecture.'
        );
      }

      return message.reply(
        `🎵 Lecture en cours : **${track.displayName}**`
      );
    } catch (error) {
      console.error('Erreur dans !now:', error.message);
      return message.reply('Impossible de récupérer la musique en cours.');
    }
  },
};