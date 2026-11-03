const { shuffleWithoutSameFirstItem } = require('./shuffle');

const queues = new Map();

function createQueue(guildId, data) {
  const queue = {
    guildId,
    connection: data.connection,
    player: data.player,
    textChannel: data.textChannel,
    tracks: data.tracks || [],
    currentIndex: 0,
    loop: data.loop || false,
    trueRandom: data.trueRandom || false,
    isStopped: false,
  };

  queues.set(guildId, queue);

  return queue;
}

function getQueue(guildId) {
  return queues.get(guildId) || null;
}

function deleteQueue(guildId) {
  queues.delete(guildId);
}

function getCurrentTrack(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return null;

  return queue.tracks[queue.currentIndex] || null;
}

function getNextTrack(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return null;

  const currentTrack = queue.tracks[queue.currentIndex];

  queue.currentIndex += 1;

  if (queue.currentIndex >= queue.tracks.length) {
    if (!queue.loop) return null;

    if (queue.trueRandom) {
      queue.tracks = shuffleWithoutSameFirstItem(
        queue.tracks,
        currentTrack
      );
    }

    queue.currentIndex = 0;
  }

  return queue.tracks[queue.currentIndex];
}

function stopQueue(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return false;

  queue.isStopped = true;

  if (queue.player) {
    queue.player.stop();
  }

  if (queue.connection) {
    queue.connection.destroy();
  }

  deleteQueue(guildId);

  return true;
}

module.exports = {
  createQueue,
  getQueue,
  deleteQueue,
  getCurrentTrack,
  getNextTrack,
  stopQueue,
};