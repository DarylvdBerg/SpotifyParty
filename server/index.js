require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const app = express();
app.use(cors());

var clientId = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
var playlistId = process.env.SPOTIFY_PLAYLIST_ID;

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant().then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token'])
}, function(error) {
    console.log(error);
    console.log("error retrieving the code");
});

app.get('/playlist', (req, res) => {
    spotifyApi.getPlaylist(playlistId)
    .then(function(data) {
        res.send(data.body);
    }); 
});

app.get('/tracks/:searchTerm', function(req, res) {
    spotifyApi.searchTracks(req.params.searchTerm)
    .then(function(data){
        res.send(data.body);
    });
});

app.post('/track', function(req, res){
    console.log(req.body);
});

app.listen(3001);