$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    navigation: true,
    sectionsColor: ['transparent', '#4BBFC3', '#22FF22']
  });

});