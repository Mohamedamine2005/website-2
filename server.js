const DBL = require('dblapi.js');
const express = require('express');
const http = require('http');
var app = express();
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

app.use(express.static('public'));

const server = http.createServer(app);
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2NDc0Nzk1NzI4ODQzNTczMiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTMyNzM3NjA2fQ.ols5La5jjDTBCI1AU_GgNCvHk88ZvnAGmCYPv6yrDJY", { webhookAuth: 'password', webhookServer: server });

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running with path ${hook.path}`);
});
dbl.getStats("464747957288435732").then(stats => {
  $(document).ready(function() {
    $("#guild-count").val(stats.server_count);
  });
});

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