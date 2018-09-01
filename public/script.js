$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    navigation: true,
    sectionsColor: ['transparent', '#fff', '#111']
  });

});