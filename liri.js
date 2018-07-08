require("dotenv").config();
let keys = require('./keys.js');


//let spotify = new Spotify(keys.spotify);


//let commands = ['my-tweets','spotify-this-song','movie-this','do-what-it-says'];
//Twitter API
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);
let params = {user_id:'OzLiri'};

let actions = process.argv[2];

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
    }













