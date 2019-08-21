//require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function searchSwitch(search) {
  switch (search) {
    case "concert-this":
      getConcert(term);
      break;

    case "spotify-this-song":
      getSpotify(term);
      break;

    case "movie-this":
      getMovie(term);
      break;

    case "do-what-it-says":
      getText(term);
      break;
  }
}

function getSpotify(term) {
  spotify.search({ type: "track", query: term }).then(function(response) {
    console.log(response.tracks);
    console.log(response);
  });
}

function getConcert() {
  //var band = term;
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        term +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Venue: " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city);
      console.log("Date:" + response.data[0].datetime);
    });
}

function getMovie() {
  //var movie = term;
  axios
    .get("http://www.omdbapi.com/?t=" + term + "&apikey=trilogy")
    .then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release: " + response.data.Year);
      console.log("IMDB: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);
      console.log("Counry: " + response.data.Country);
    });
}

function getText() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(",");
    search = data[0];
    searchSwitch(search);

    console.log(data);
  });
}

searchSwitch(search);
