console.log('keys loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  apikey: process.env.omdb_apikey,
};

exports.bandsInTown = {
  app_id: process.env.bandsInTown_app_id,
};