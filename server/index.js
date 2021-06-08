const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const app = express();
app.use(cors());

var clientId = "b381cea0329f438bb48748b68eab820a";
var clientSecret = "9a75a7ba93f247bc8822c80642c48317";
var playlistId = "4ElSuytngDHoYR5gM2Z1zx";

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant().then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token'])
}, function(error) {
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
})

app.listen(3001);