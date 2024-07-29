const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

router.get('/login', (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['playlist-read-private']);
  res.redirect(authorizeURL);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    res.send('Login successful!');
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }
});

module.exports = router;