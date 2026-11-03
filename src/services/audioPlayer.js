const { createReadStream } = require('node:fs');
const ffmpeg = require('ffmpeg-static');

const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  joinVoiceChannel,
  NoSubscriberBehavior,
  entersState,
  VoiceConnectionStatus,
} = require('@discordjs/voice');

const {
  createQueue,
  getQueue,
  getCurrentTrack,
  getNextTrack,
  stopQueue,
  deleteQueue,
} = require('./queueManager');

function createPlayerForGuild(guildId) {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Stop,
    },
  });

  player.on(AudioPlayerStatus.Idle, () => {
    playNext(guildId);
  });

  player.on('error', (error) => {
    console.error(`Erreur audio sur le serveur ${guildId}:`, error.message);
    playNext(guildId);
  });

  return player;
}

function joinUserVoiceChannel(message) {
  const voiceChannel = message.member.voice.channel;

  console.log('Salon vocal utilisateur :', voiceChannel?.name);

  if (!voiceChannel) {
    throw new Error('USER_NOT_IN_VOICE_CHANNEL');
  }

  console.log('Connexion au salon vocal...');

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  connection.on('stateChange', (oldState, newState) => {
    console.log(`Voice state: ${oldState.status} -> ${newState.status}`);
  });

  return connection;
}

function playResource(queue, track) {
  console.log('Lecture du fichier :', track.path);

  const resource = createAudioResource(createReadStream(track.path), {
    inlineVolume: true,
  });

  queue.player.play(resource);

  if (queue.textChannel) {
    queue.textChannel.send(`Lecture : **${track.displayName}**`);
  }
}

function playNext(guildId) {
  const queue = getQueue(guildId);

  if (!queue || queue.isStopped) return;

  const nextTrack = getNextTrack(guildId);

  if (!nextTrack) {
    if (queue.connection) {
      queue.connection.destroy();
    }

    deleteQueue(guildId);
    return;
  }

  playResource(queue, nextTrack);
}

async function playTracks(message, tracks, options = {}) {
  if (!tracks || tracks.length === 0) {
    throw new Error('EMPTY_TRACK_LIST');
  }

  const guildId = message.guild.id;

  const existingQueue = getQueue(guildId);

  if (existingQueue) {
    stopQueue(guildId);
  }

  const connection = joinUserVoiceChannel(message);
  console.log('Connexion vocale créée');

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    console.log('Connexion vocale prête');
  } catch (error) {
    console.error('La connexion vocale n’est jamais passée en Ready:', error);
    connection.destroy();
    throw error;
  }

  const player = createPlayerForGuild(guildId);

  connection.subscribe(player);

  const queue = createQueue(guildId, {
    connection,
    player,
    textChannel: message.channel,
    tracks,
    loop: options.loop || false,
    trueRandom: options.trueRandom || false,
  });

  const firstTrack = getCurrentTrack(guildId);
  playResource(queue, firstTrack);

  return queue;
}

function pause(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return false;

  return queue.player.pause();
}

function resume(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return false;

  return queue.player.unpause();
}

function stop(guildId) {
  return stopQueue(guildId);
}

function skip(guildId) {
  const queue = getQueue(guildId);

  if (!queue) return false;

  queue.player.stop();

  return true;
}

module.exports = {
  playTracks,
  pause,
  resume,
  stop,
  skip
};