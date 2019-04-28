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
function beginSwitch() {
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
        wildCardFunc();
        break;

      default:
        console.log("Sorry you have to type a command:'concert-this' or 'spotify-this-song' or 'movie-this' or 'do-what-it-says'");
  };
};
beginSwitch();
function storeData(){
  fs.appendFile("log.txt", showData + divider, function(err) {
    if (err) throw err;
    console.log(showData);
  });
};
function concertFunc() {
  if (input === "") {
    console.log("Please input an artist or band to see if they're on tour");
  } else {
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
  let URL = "http://www.omdbapi.com/?t=" + input + "&apikey=" + omdb.apikey;
  axios.get(URL).then(function(response){
    jsonData = response.data;
    showData = [
      "Title: "  + jsonData.Title,
      "Year: " + jsonData.Year,
      jsonData.Ratings[0].Source + " Rating: " + jsonData.Ratings[0].Value,
      jsonData.Ratings[1].Source + " Rating: " + jsonData.Ratings[1].Value,
      "Country: " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Plot: " + jsonData.Plot,
      "Actors: " + jsonData.Actors
    ].join('\n');
    storeData();
  })
}
function wildCardFunc() {
  fs.readFile("random.txt", "utf8", function(err, data){
    if (err) {
      return console.log(err);
    }
    data = data.split(",");
    action = data[0];
    input = data[1];
    beginSwitch(action, input);
  })
};