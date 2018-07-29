var express = require('express');
var app = express();
var session  = require('express-session')
var passport = require('passport');
var Strategy = require('passport-discord').Strategy;

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*START AUTH*/
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'email', /* 'connections', (it is currently broken) */ 'guilds', 'guilds.join'];

passport.use(new Strategy({
    clientID: '464747957288435732',
    clientSecret: 'BwerPCx896WSIY_uQhfgBgZj4l5GXir1',
    callbackURL: 'https://expobot.glitch.me/',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/commands/index.html') } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/about/index.html');
});
app.get('/info', checkAuth, function(req, res) {
    //console.log(req.user)
    res.json(req.user);
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}
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