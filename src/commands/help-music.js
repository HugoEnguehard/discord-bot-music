module.exports = {
  name: 'help-music',
  description: 'Liste les commandes musicales disponibles.',

  async execute(message) {
    try {
      const response = `${'```'}
DJ Rubis - Aide des commandes

═══════════════════════════════════════
LECTURE
═══════════════════════════════════════

!play <nom-musique> [options]
    Joue immédiatement une musique.

    Options disponibles :
      loop
        Rejoue la musique en boucle.

    Exemples :
      !play taverne

      !play taverne loop

!playlist <nom-playlist> [options]
    Joue une playlist complète.

    Options disponibles :
      random
        Mélange les pistes une seule fois au lancement de la playlist.

      loop
        Rejoue la playlist en boucle.

      truerandom
        Mélange les pistes au lancement puis les remélange à chaque boucle.
        Active automatiquement le mode loop.

    Exemples :
      !playlist exploration
      !playlist exploration random
      !playlist exploration loop
      !playlist exploration random loop
      !playlist exploration truerandom

═══════════════════════════════════════
CONTRÔLE
═══════════════════════════════════════

!pause
    Met la lecture en pause.

!resume
    Reprend la lecture.

!stop
    Arrête la lecture et déconnecte le bot.

!skip
    Passe immédiatement à la musique suivante de la playlist.


═══════════════════════════════════════
INFORMATIONS
═══════════════════════════════════════

!list
    Affiche les musiques et playlists disponibles.

    Exemples :
      !list
      !list musique
      !list playlist
      !list musique 2
      !list playlist 3

!now
    Affiche la musique actuellement en cours de lecture.

!help-music
    Affiche cette aide.

═══════════════════════════════════════
NOTES
═══════════════════════════════════════

- Vous devez être connecté à un salon vocal.

- Les musiques sont définies dans :
    tracks.json

- Les playlists sont définies dans :
    playlists.json

═══════════════════════════════════════
${'```'}`;

      return message.reply(response);
    } catch (error) {
      console.error('Erreur dans !help-music:', error.message);
      return message.reply('Erreur survenue lors de l’affichage de l’aide.');
    }
  },
};