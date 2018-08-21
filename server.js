const express = require('express');
var app = express();
const firebase = require('firebase');
const btoa = require('btoa');

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

function createOrFindUser(id) {
  var userData = database.ref('users/' + id);
  console.log(userData)
  if (userData == null) {
    database.ref('users/' + id).set({
      avatar: Math.random(),
      refresh_token: "asdd"
    });
    return userData;
  } else {
    return userData;
  }
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
  res.redirect(`/?token=${json.access_token}`);

});

/********   RESPONSES   ********/

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/commands', function(request, response) {
  response.sendFile(__dirname + '/commands/index.html');
});

app.get('*', function(request, response) {
  response.status(404).sendFile(__dirname + '/404/index.html');
});

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});