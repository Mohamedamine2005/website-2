$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('#fullpage', {
    sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
  });

});