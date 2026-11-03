const { getPlaylist } = require('../services/playlistManager');
const { playTracks } = require('../services/audioPlayer');

module.exports = {
  name: 'playlist',
  description: 'Joue une playlist. Options : random, truerandom, loop.',

  async execute(message, args) {
    const playlistName = args[0];
    const options = args.slice(1).map((option) => option.toLowerCase());

    if (!playlistName) {
      return message.reply(
        'Utilisation : `!playlist nom-playlist random loop` ou `!playlist nom-playlist truerandom`'
      );
    }

    const hasRandom = options.includes('random');
    const hasTrueRandom = options.includes('truerandom');

    const random = hasRandom || hasTrueRandom;
    const loop = options.includes('loop') || hasTrueRandom;
    const trueRandom = hasTrueRandom;

    const playlist = getPlaylist(playlistName, { random });

    if (!playlist) {
      return message.reply(`Playlist inconnue : \`${playlistName}\``);
    }

    if (playlist.tracks.length === 0) {
      return message.reply(
        `La playlist \`${playlistName}\` ne contient aucune musique valide.`
      );
    }

    try {
      await playTracks(message, playlist.tracks, {
        loop,
        trueRandom,
      });

      let reply = `Playlist lancée : **${playlist.name}**`;

      if (hasTrueRandom) {
        reply += ' en true-random';
      } else if (hasRandom) {
        reply += ' en aléatoire';
      }

      if (loop) {
        reply += ' en boucle';
      }

      return message.reply(reply);
    } catch (error) {
      console.error('Erreur dans !playlist:', error.message);

      if (error.message === 'USER_NOT_IN_VOICE_CHANNEL') {
        return message.reply(
          'Tu dois être dans un salon vocal pour lancer une playlist.'
        );
      }

      return message.reply('Impossible de lancer cette playlist.');
    }
  },
};