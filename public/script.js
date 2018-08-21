$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
   let discord = new LoginWithDiscord({
    cache: true 
  });
  
  // Authorize
async function login() {
    await discord.login('464747957288435732', Scope.Identify, Scope.Connections, Scope.Email, Scope.Guilds);
}

// Unauthorize
async function logout() {
    await discord.logout();
}

// Fired when there is an auth token
discord.onlogin = async () => {
    let user = await discord.fetchUser().catch(console.log);
    let connections = await discord.fetchConnections().catch(console.log);
    let guilds = await discord.fetchGuilds().catch(console.log);

    // The login state
    discord.state;
}

// Fires when there is no auth token
discord.onlogout = async () => {
    console.log('You have been logged out');
}

window.onload = async () => {
    await discord.init(); // Loads auth token, only once the window has loaded
}

  var btn = document.getElementById("login");
  btn.addEventListener("click", login());

});