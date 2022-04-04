var pelaaja = new Pelaaja();
var taistelu = null;

function aloitaTaistelu(lvl, id, boss) {
  var vihu = null;
  var boss = null;
  if(boss>0)
    boss = new Boss(lvl, id);
  else
    vihu = new Vihu(lvl, id);
  taistelu = new Taistelu(pelaaja, vihu, boss);
}

$(document).ready(function() {
  $("#voima_nappi").click(function() {
    pelaaja.lisaaVoima();
  });
  $("#ketteryys_nappi").click(function() {
    pelaaja.lisaaKetteryys();
  });
  $("#elama_nappi").click(function() {
    pelaaja.lisaaElama();
  });
  $("#mana_nappi").click(function() {
    pelaaja.lisaaMana();
  });
});
