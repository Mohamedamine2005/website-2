$(document).ready(function() {

  $('.sidenav').sidenav();
  
  // Init ScrollMagic
  var ctrl = new ScrollMagic.Controller();
   
  //$('.opacity').each(function () {
    
    var Scene = new ScrollMagic.Scene({
      triggerElement: "half",
      triggerHook: 0.9
    })
    .setClassToggle("opacity", "fadeIn")
    .addTo(ctrl);
    
 // });

});