var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*START AUTH*/

app.use('/login', require('./router'));

/*END OF AUTH*/

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

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});