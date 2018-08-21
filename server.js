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

function createOrFindUser(id) {
  var userData = database.ref('users/' + id);
  
  if (userData == null) {
    database.ref('users/' + id).set({
      avatar: Math.random(),
      refresh_token: "asdd"
    });
  } 
}

app.get('/login', function(request, response) {
  
});

app.get('/create', function(request, response) {
  
  createOrFindUser("jarvis");
  response.sendFile(__dirname + '/views/index.html');
    
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