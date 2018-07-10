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
/*let nodeArgArray = process.argv.slice(3,process.argv.length+1);
let songTitle = nodeArgArray.join(" ").replace(',',' ');
let cleanString = songTitle.trim(' ');
console.log(nodeArgArray);
console.log(songTitle);
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

        spotify.search({ type: 'track', query: songTitle, limit: '3'}, function (err, data) {
            if(err) {
                console.error(err);
            }else {
                let nodeArgArray = process.argv.slice(3,process.argv.length+1);
                let songTitle = nodeArgArray.join(" ").replace(',',' ');
                let cleanString = songTitle.trim(' ');
                console.log(nodeArgArray);
                console.log(songTitle);
                console.log(cleanString);
                let result = data.tracks.items;
                
                for(let i = 0; i <result.length; i++){
                    console.log(result[i].name);
        
            };
        };
    });
} else if (actions == "movie-this"){
    let movieTitle = process.argv[3];
    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
    let request = require("request");
    request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
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

    
}

let fs = require('fs');
fs.readFile('random.txt','utf8',function(error,data){
    if (error){
        console.log(error);
    }else {
        console.log(data.replace(',',' '));
        console.log("$ node liri.js "+data.replace(',',' '));
        let nodeArgArray = process.argv.slice(3,process.argv.length+1);
        let songTitle = nodeArgArray.join(" ").replace(',',' ');
        let cleanString = songTitle.trim(' ');
        console.log(nodeArgArray);
        //console.log("node liri.js "+data+cleanString);
           /*for (let i = 0; i<dataArr.length;i++){
               console.log(dataArr[i]);
           }*/
      }
})
        //Artist(s)
        //Song Name
        //A preview Link
        //Album of the song














