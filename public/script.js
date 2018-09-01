$(document).ready(function() {

  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    navigation: true,
    loopBottom: true
  });

});