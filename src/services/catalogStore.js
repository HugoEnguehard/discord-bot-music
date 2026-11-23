const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'..','data','.tfoh-music.json');
// One atomic catalog replaces the two legacy files after the first Admin edit.
module.exports=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{tracks:require('../data/tracks.json'),playlists:require('../data/playlists.json')};
