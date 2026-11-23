# Docker

Image Node 24 Debian Bookworm, npm ci --omit=dev, utilisateur node 1000. Secrets injectés à l’exécution, données exclues de l’image. Compose commun : tfoh-admin/deploy/discord-bots/compose.yaml. Guides : tfoh-admin/docs/discord-bots.md. Copier src/data dans data/music avant démarrage. TOKEN obligatoire ; autres variables dans .env.example. SIGTERM ferme le client Discord et ses connexions vocales. Ne jamais démarrer avec un token déjà utilisé par PM2.


Sauvegarde et restauration complètes : tfoh-admin/docs/discord-bots-sauvegarde.md. Copier source/. pour inclure les fichiers cachés ; ne pas utiliser source/*. Les sources de production sont /srv/discord-bots/data/music, indépendantes des clones et images.
Conserver .tfoh-music.json et .retired. Le bot lit le catalogue courant au démarrage ; pour un retour à un ancien code PM2, exporter ses tracks/playlists vers les JSON historiques depuis une copie approuvée, selon le guide Debian.
