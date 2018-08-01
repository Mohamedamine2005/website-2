$(document).ready(function() {

  $('.sidenav').sidenav();
  
   // Init ScrollMagic
   var ctrl = new ScrollMagic.Controller();
    
   var half1 = new ScrollMagic.Scene({
     triggerElement: ".half",
     triggerHook: 1,
     duration: "100%"
   })
   .setTween(TweenMax
     .from('.half1', 1, {
       x: "100%",
       ease: Strong.easeOut
     })
   )
   .addTo(ctrl);

});