var express = require('express');
var app = express();
var session  = require('express-session')
var passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*START AUTH*/

passport.use(new DiscordStrategy({
    clientID: 'id',
    clientSecret: 'secret',
    callbackURL: 'callbackURL'
},
function(accessToken, refreshToken, profile, cb) {
    if (err)
        return done(err);
 
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
        return cb(err, user);
    });
}));

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/secretstuff') // Successful auth
});

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