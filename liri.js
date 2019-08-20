require("dotenv").config();

var keys = require("./keys.js")
var fs = require("fs")
var axios = require("axios")
var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);

var search = process.argv[2]
var term = process.argv.slice(3).join(" ")

function searchSwitch(search){
    switch(search) {

        case "concert-this":
            getConcert();
            break;

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            getText();
            break;
    }
}

function getSpotify() {
    spotify.search({ type: "track", query: term}).then(function(response){
        console.log(response.tracks)  
    })
    
}

function getConcert(){
    var band = term;
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function(response) {

            console.log(response.data[0].venue.name)
        }
    )
}

function getMovie() {
    var movie = term;
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
        function(response) {
            console.log(response)
        }
    )

}
searchSwitch(search);