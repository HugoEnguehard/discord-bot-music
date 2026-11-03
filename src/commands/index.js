const play = require('./play');
const playlist = require('./playlist');
const stop = require('./stop');
const pause = require('./pause');
const resume = require('./resume');
const helpMusic = require('./help-music');
const now = require('./now');
const list = require('./list');
const skip = require('./skip');

const commands = {
  [play.name]: play,
  [playlist.name]: playlist,
  [stop.name]: stop,
  [pause.name]: pause,
  [resume.name]: resume,
  [helpMusic.name]: helpMusic,
  [now.name]: now,
  [list.name]: list,
  [skip.name]: skip,
};

module.exports = { commands };