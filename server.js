const express = require('express');
var app = express();
const firebase = require('firebase');

app.use(express.static('public'));

/********   DASHBOARD   ********/



app.get('/login', function(request, response) {
  
});

app.get('/create', function(request, response) {
  
  createUser("jarvis", "shjdbaishjdfbiahsdf", "auoysgdlaujhsd");
    
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