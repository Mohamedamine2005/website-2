var firebase = require("firebase");

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
    refresh_token: refresh
  });
}

let discord = new LoginWithDiscord({
  cache: true 
});

discord.onlogin = async () => {
  let user = await discord.fetchUser().catch(console.log);
  let connections = await discord.fetchConnections().catch(console.log);
  let guilds = await discord.fetchGuilds().catch(console.log);

  // The login state
  discord.state;
}

// Fires when there is no auth token
discord.onlogout = async () => {
  
}

window.onload = async () => {
  await discord.init(); // Loads auth token, only once the window has loaded
}

// Authorize
async function login() {
  await discord.login('464747957288435732', Scope.Identify, Scope.Connections, Scope.Email, Scope.Guilds);
}

// Unauthorize
async function logout() {
  await discord.logout();
}