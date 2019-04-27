var fs = require('fs');
var axios = require('axios');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdb = new Omdb(keys.omdb);
var bandsInTown = new BandsInTown(keys.bandsInTown);
let action = process.argv[2];
process.argv.splice(0,3);
let input = process.argv.slice(0).join(" ");

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
}

function concertFunc() {
        var URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTown;
    
        axios.get(URL).then(function(response){
            console.log(response);
        })
}