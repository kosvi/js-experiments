$(document).ready(function() {
  let nopeus = 300;
  $("#hahmomenu").css("display", "block");
  $("#hahmo_button").click(function() {
    $(".submenu").css("display", "none");
    // $("#hahmomenu").css("display", "block");
    $("#hahmomenu").toggle("blind", nopeus);
  });
  $("#kauppa_button").click(function() {
    $(".submenu").css("display", "none");
    // $("#kauppamenu").css("display", "block");
    $("#kauppamenu").toggle("blind", nopeus);
  });
  $("#asetukset_button").click(function() {
    $(".submenu").css("display", "none");
    // $("#asetuksetmenu").css("display", "block");
    $("#asetuksetmenu").toggle("blind", nopeus);
  });
});
