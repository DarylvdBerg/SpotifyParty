require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

var clientId = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
var redirect_uri = process.env.REDIRECT_URI;
var playlistId = process.env.SPOTIFY_PLAYLIST_ID;

const permissions = ["playlist-modify-public", "playlist-read-collaborative"];
const state = "state-of-app";

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirect_uri
});

var authorizeUrl = spotifyApi.createAuthorizeURL(permissions, state);

app.get('/authorize', (req, res) => {
    res.send(JSON.stringify(authorizeUrl))
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        spotifyApi.setAccessToken(data.body.access_token);
        spotifyApi.setRefreshToken(data.body.refresh_token);
    })
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
    let data = req.body;
    spotifyApi.addTracksToPlaylist(data.playlistId, data.tracks)
    .then(function(){
        res.send("Track added to playlist");
    })
    .catch(function(error){
        res.send(error.message);
    })
});

app.listen(3001);