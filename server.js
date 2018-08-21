const express = require('express');
var app = express();
const firebase = require('firebase');

app.use(express.static('public'));

/********   DASHBOARD   ********/

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

function createUser(username, token, refresh) {
  firebase.database().ref('users/' + username).set({
    token: token,
    refresh_token : refresh
  });
}

app.get('/create', function(request, response) {
  
  createUser("jarvis", "shjdbaishjdfbiahsdf", "auoysgdlaujhsd");
  
  response.redirect("https://dashboard-expobot.glitch.me/");
  
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