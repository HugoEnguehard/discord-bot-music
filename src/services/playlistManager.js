const {playlists} = require('./catalogStore');
const { getTrack } = require('./trackManager');

const {shuffle} = require('./shuffle');

function getPlaylist(playlistName, options = {}) {
  if (!playlistName) return null;

  const key = playlistName.toLowerCase();
  const playlist = playlists[key];

  if (!playlist) return null;

  let tracks = playlist
    .map((trackName) => getTrack(trackName))
    .filter(Boolean);

  if (options.random) {
    tracks = shuffle(tracks);
  }

  return {
    name: key,
    tracks,
  };
}

function getAllPlaylists() {
  return Object.keys(playlists);
}

module.exports = {
  getPlaylist,
  getAllPlaylists,
};