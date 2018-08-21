const express = require('express');
var app = express();
const firebase = require('firebase');
const btoa = require('btoa');
const fetch = require('node-fetch');

app.use(express.static('public'));

/********   DASHBOARD   ********/

const CLIENT_ID = "464747957288435732";
const CLIENT_SECRET = "BwerPCx896WSIY_uQhfgBgZj4l5GXir1";
const redirect = encodeURIComponent('https://expobot.glitch.me/callback');

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "expobot-db.firebaseapp.com",
  databaseURL: "https://expobot-db.firebaseio.com",
  projectId: "expobot-db",
  storageBucket: "expobot-db.appspot.com",
  messagingSenderId: "516029793651"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(userId, name, token, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    token: token,
    avatar : imageUrl
  });
}

app.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify%20email%20connections%20guilds`);
});

app.get('/callback', async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&redirect_uri=${redirect}&code=${code}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
    },
  });
  const json = await response.json();
  
  const resp = await fetch('http://discordapp.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${json.access_token}`,
    }
  });
  const jsonUser = await resp.json();

  writeUserData(jsonUser.id, jsonUser.username, json.access_token, jsonUser.avatar)
  res.redirect("https://dashboard-expobot.glitch.me"); 
  
});

/********   RESPONSES   ********/

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/views/index.html'); 
});

app.get('/commands', function(request, response) {
  response.sendFile(__dirname + '/commands/index.html');
});

app.get('/dashboard', function(request, response) {
  response.redirect("https://dashboard-expobot.glitch.me"); 
});

app.get('*', function(request, response) {
  response.status(404).sendFile(__dirname + '/404/index.html');
});

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});