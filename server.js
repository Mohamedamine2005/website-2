var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/commands', function(request, response) {
  response.sendFile(__dirname + '/commands/index.html');
});

app.get('/about', function(request, response) {
  response.sendFile(__dirname + '/about/index.html');
});

app.get('*', function(req, res){ res.status(404).sendFile(__dirname + '/404/index.html'); });

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});