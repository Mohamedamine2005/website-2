$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    navigation: true,
    sectionsColor: ['transparent', '#fff', '#111'],
    loopBottom: true,
    dragAndMove: true
  });
  
  if ($('body').hasClass('fp-viewing-0')) {console.log("1")}
  if ($('body').hasClass('fp-viewing-1')) {console.log("2")}
  if ($('body').hasClass('fp-viewing-2')) {console.log("3")}

});