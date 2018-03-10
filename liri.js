require("dotenv").config();


let Twitter =require("twitter");
let Spotify =require("node-spotify-api");
let keys=require("./keys");
let request = require("request");
var fs = require("fs");
var spotify= new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var getArtistNames = function(artistN){
	return artistN.name;
};

var getSpotify = function(songName){
	if(songName ===undefined){
		songName = "what is my age again";
	}
	spotify.search(
	{
		type:"track",
		query:songName
	},
	function(err,data){
		if(err){
			console.log(err);
			return;
		}
		var songs = data.tracks.items;

		for(var i=0; i<songs.length; i++){
			console.log("artist: "+song[i].artists.map(getArtistName));
			console.log("song name: "+song[i].name);
			console.log("preview song: " +songs[i].preview_url);
			console.log("album:"+songs[i].album.name);
		}
	}
	);
	
};
var getTweets=function(){
	  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: "cnn"
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
var getMeMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};


var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);









