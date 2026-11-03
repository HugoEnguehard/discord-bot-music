const { getTrack } = require('../services/trackManager');
const { playTracks } = require('../services/audioPlayer');

module.exports = {
  name: 'play',
  description: 'Joue une musique.',

  async execute(message, args) {
    const trackName = args[0];

    if (!trackName) {
      return message.reply(
        'Utilisation : `!play nom-musique [loop]`'
      );
    }

    const options = args
      .slice(1)
      .map((option) => option.toLowerCase());

    const loop = options.includes('loop');

    const track = getTrack(trackName);

    if (!track) {
      return message.reply(
        `Musique inconnue : \`${trackName}\``
      );
    }

    try {
      await playTracks(message, [track], { loop });

      let reply = `Musique lancée : **${track.displayName}**`;

      if (loop) {
        reply += ' en boucle';
      }

      return message.reply(reply);
    } catch (error) {
      console.error('Erreur dans !play:', error.message);

      if (error.message === 'USER_NOT_IN_VOICE_CHANNEL') {
        return message.reply(
          'Tu dois être dans un salon vocal pour lancer une musique.'
        );
      }

      return message.reply(
        'Impossible de lancer cette musique.'
      );
    }
  },
};