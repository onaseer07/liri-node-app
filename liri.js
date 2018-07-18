require("dotenv").config();
let keys = require('./keys.js');

let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);


//let commands = ['my-tweets','spotify-this-song','movie-this','do-what-it-says'];
//Twitter API
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);
let params = {user_id:'OzLiri'};
let actions = process.argv[2];
let nodeArgArray = process.argv.slice(3,process.argv.length+1);
let Title = nodeArgArray.join(" ").replace(',',' ');
/*let nodeArgArray = process.argv.slice(3,process.argv.length+1);
let Title = nodeArgArray.join(" ").replace(',',' ');
let cleanString = Title.trim(' ');
console.log(nodeArgArray);
console.log(Title);
console.log(cleanString);*/
    if (actions == "my-tweets"){
        client.get('statuses/user_timeline', params, function (err, tweets, response){
            if (err) {
                console.log(err);
            } else {
                for (let i = 0; i < tweets.length; i++){
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);
                }
            }
        });
    } else if (actions == "spotify-this-song"){

        if (Title == null || Title == "" || Title ==[]){
            Title = "The Sign";
            console.log(Title);
            spotify.search(
                { type: 'track', query: Title, limit: '1'}, function (err, data) {
                if(err) {
                    console.error(err);
                }else {
    
                    let result = data.tracks.items;
                    console.log("Artist: "+result[0].artists[0].name);
                    console.log("Song Name: "+result[0].name);
                    console.log("Preview this song: "+result[0].preview_url);
                    console.log("Album: "+result[0].album.name);     
            };
            });
        }else {
            spotify.search({ type: 'track', query: Title, limit: '1'}, function (err, data) {
                if(err) {
                    console.error(err);
                }else {
    
                    let result = data.tracks.items;
                    console.log("Artist: "+result[0].artists[0].name);
                    console.log("Song Name: "+result[0].name);
                    console.log("Preview this song: "+result[0].preview_url);
                    console.log("Album: "+result[0].album.name);     
            };
        });
        }

} else if (actions == "movie-this"){
    let movieTitle = process.argv[3];
    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
    let request = require("request");
    request("http://www.omdbapi.com/?t="+Title+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // Title of the movie.
        let movieResult = JSON.parse(body);
        console.log(movieResult.Title);
        // Year the movie came out.
        console.log(movieResult.Year);
        // IMDB Rating of the movie.
        console.log(movieResult.imdbRating);
        // Rotten Tomatoes Rating of the movie.
        console.log(movieResult.Ratings[1].Value);
        // Country where the movie was produced.
        console.log(movieResult.Country);
        // Language of the movie.
        console.log(movieResult.Language);
        // Plot of the movie.
        console.log(movieResult.Plot);
        // Actors in the movie.
        console.log(movieResult.Actors);

        }else {
            console.error(error);
        }
    });
} else if (actions == "do-what-it-says"){
    let fs = require('fs');
    fs.readFile('random.txt','utf8',function(error,data){
        if (error){
            console.log(error);
        }else {
            let nodeArgArray = process.argv.slice(3,process.argv.length+1);
            let Title = nodeArgArray.join(" ").replace(',',' ');
            let cleanString = Title.trim(' ');
    
            console.log("node liri.js "+data+cleanString);
               /*for (let i = 0; i<dataArr.length;i++){
                   console.log(dataArr[i]);
               }*/
          }
    })
    
}

















