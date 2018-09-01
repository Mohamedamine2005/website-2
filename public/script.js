$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    navigation: true,
    loopBottom: true,
    dragAndMove: true
  });
  
  $( window ).scroll(function() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
 
    if (scroll == 0) {
      $('nav').removeClass('blackFade');
      $('nav').addClass('transparent');
    } else {
      $('nav').removeClass('transparent');
      $('nav').addClass('blackFade');
    }
  });
  
  if ($('body').hasClass('fp-viewing-0')) {console.log("1")}
  if ($('body').hasClass('fp-viewing-1')) {console.log("2")}
  if ($('body').hasClass('fp-viewing-2')) {console.log("3")}

});