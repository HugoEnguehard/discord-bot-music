const { getAllTracks } = require('../services/trackManager');
const { getAllPlaylists } = require('../services/playlistManager');

module.exports = {
  name: 'list',
  description: 'Affiche les musiques et playlists disponibles.',

  async execute(message, args = []) {
    try {
      const tracks = getAllTracks();
      const playlists = getAllPlaylists();

      const type = args[0]?.toLowerCase();

      let pageArg;

      if (
        type === 'musique' ||
        type === 'musiques' ||
        type === 'playlist' ||
        type === 'playlists'
      ) {
        pageArg = args[1];
      } else {
        pageArg = args[0];
      }

      const page = Math.max(1, parseInt(pageArg, 10) || 1);

      let allItems = [];
      let title = 'LISTE DISPONIBLE';

      switch (type) {
        case 'musique':
        case 'musiques':
          title = 'MUSIQUES DISPONIBLES';

          allItems = tracks.map(
            (track) => `- ${track.name}`
          );
          break;

        case 'playlist':
        case 'playlists':
          title = 'PLAYLISTS DISPONIBLES';

          allItems = playlists.map(
            (playlist) => `- ${playlist}`
          );
          break;

        default:
          allItems = [
            'PLAYLISTS DISPONIBLES',
            '',
            ...playlists.map(
              (playlist) => `- ${playlist}`
            ),
            '',
            'MUSIQUES DISPONIBLES',
            '',
            ...tracks.map(
              (track) => `- ${track.name}`
            ),
          ];
      }

      const pageSize = 30;
      const totalPages = Math.max(
        1,
        Math.ceil(allItems.length / pageSize)
      );

      if (page > totalPages) {
        return message.reply(
          `Page invalide. Il y a ${totalPages} page(s).`
        );
      }

      const start = (page - 1) * pageSize;
      const pageItems = allItems.slice(
        start,
        start + pageSize
      );

      const response =
        '```' +
        `${title} - Page ${page}/${totalPages}\n\n` +
        pageItems.join('\n') +
        '\n```';

      return message.reply(response);
    } catch (error) {
      console.error('Erreur dans !list:', error);
      return message.reply(
        'Impossible d’afficher les musiques disponibles.'
      );
    }
  },
};