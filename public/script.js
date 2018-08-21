$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  const qs = (key) => {
    key = key.replace(/[*+?^$.[\]{}()|\\/]/g, '\\$&'); // escape RegEx meta chars
    const match = window.location.search.match(new RegExp(`[?&]${key}=([^&]+)(&|$)`));
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
        
  if (qs('token') !== null) {
    $('#toptitle').text(qs("token"));
  }
  
  /*const response = fetch(`https://discordapp.com/api/v6/users/@me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${qs('token')}`,
    }
  });
  const json = response.json();
  console.log(json);*/

});