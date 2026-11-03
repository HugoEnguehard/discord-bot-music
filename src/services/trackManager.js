const path = require('path');
const tracks = require('../data/tracks.json');

const MUSIC_DIR = path.join(__dirname, '..', 'data', 'musics');

function getTrack(trackName) {
  if (!trackName) return null;

  const key = trackName.toLowerCase();
  const track = tracks[key];

  if (!track) return null;

  return {
    name: key,
    displayName: track.displayName || key,
    file: track.file,
    path: path.join(MUSIC_DIR, track.file),
  };
}

function getAllTracks() {
  return Object.entries(tracks).map(([key, value]) => ({
    name: key,
    displayName: value.displayName || key,
  }));
}

module.exports = {
  getTrack,
  getAllTracks,
};