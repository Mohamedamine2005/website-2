$(document).ready(function() {

  $('.full').removeClass('hidden');
  $('.sidenav').sidenav();
  $('.tabs').tabs();
  
  new fullpage('.fullpage', {
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    navigation: true,
    loopBottom: true,
    sectionsColor: ['transparent', '#fff', '#111']
  });
  
  $(window).load(function() {
    if ($(".podmena1").val().split(" ")[1] != "8 (812)") {
      var res = $(".podmena1").html().split(" ");
      $(".podmena1").html("8 (812) " + res[2]);
      $("#tel").attr('href', "tel:8812" + res[2].split("-")[0] + res[2].split("-")[1] + res[2].split("-")[2]);
      $("#tel_popup").attr('href', "tel:8812" + res[2].split("-")[0] + res[2].split("-")[1] + res[2].split("-")[2]);
      $("#tel2").attr('href', "tel:8812" + res[2].split("-")[0] + res[2].split("-")[1] + res[2].split("-")[2]);
      $("#tel3").attr('href', "tel:8812" + res[2].split("-")[0] + res[2].split("-")[1] + res[2].split("-")[2]);
    }
  });

});