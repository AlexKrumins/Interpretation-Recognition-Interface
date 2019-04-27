const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const omdb = keys.omdb;
const bandsInTown = keys.bandsInTown;
let action = process.argv[2];
process.argv.splice(0,3);
let input = process.argv.slice(0).join(" ");
const divider = "\n------------------------------------------------------------\n\n";
let showData = [];
switch (action) {
    case "concert-this":
      concertFunc(input);
      break;
    
    case "spotify-this-song":
      spotifyFunc(input);
      break;

      case "movie-this":
      omdbFunc(input);
      break;

      case "do-what-it-says":
      wildCardFunc(input);
      break;

    default:
      console.log("Sorry you have to type a ** command ** and then a name");
};
function storeData(){
  fs.appendFile("log.txt", showData + divider, function(err) {
    if (err) throw err;
    console.log(showData);
  });
};
function concertFunc() {
  let URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown.app_id;
  axios.get(URL).then(function(response){
    jsonData = response.data[0];
    showData = [
      "Lineup: " + jsonData.lineup,
      "Venue: " + jsonData.venue.name,
      "Location: " + jsonData.venue.city + "," + jsonData.venue.region,
      "Date of the Event: " + moment(jsonData.datetime).format("MM/DD/YYYY")
    ].join("\n");
    storeData();
  })
}
function spotifyFunc() {
  if (input === "") {input = "ace of base the sign"};
  spotify.search({ type: 'track', query: input }).then(function(response) {
    jsonData = response.tracks.items[0];
    showData = [
      "Song Name: " + jsonData.name,
      "Artist: " + jsonData.artists[0].name,
      "Album: " + jsonData.album.name,
      "Preview Link : " + jsonData.external_urls.spotify,
    ].join('\n');
    storeData();
  });
}
function omdbFunc() {
  if (input === "") {input = "Mr. Nobody"};
  let URL = ""
  axios.get
}