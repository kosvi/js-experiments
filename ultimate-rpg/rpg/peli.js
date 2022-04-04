class Pelaaja
{
  constructor() {
    this.xp = 0;
    this.lvl = 1;
    this.voima = 5;
    this.ketteryys = 5;
    this.elama = 15;
    this.mana = 10;
    this.pisteet = 5;
    this.ase = "Puukeppi";
    this.aseType = "keppi";
    this.aseDam = 3;
    this.loitsu = "Pieru";
    this.loitsuDam = 1;
    this.naytaArvot();
  }

  naytaArvot() {
    $("#voima").text(this.voima);
    $("#ketteryys").text(this.ketteryys);
    $("#elama").text(this.elama);
    $("#mana").text(this.mana);
    $("#pisteet").text(this.pisteet);

    $("#ase").text("Ase: " + this.ase);
    $("#aseDam").text(this.aseDam);
    $("#loitsu").text("Loitsu: " + this.loitsu);
    $("#loitsuDam").text(this.loitsuDam);
  }

  haeAseDamage() {
    let kerroin;
    if(this.aseType=="keppi")
      kerroin = this.voima/10 + 1;
    if(this.aseType=="miekka")
      kerroin = this.voima/20 + this.ketteryys/20 + 1.1;
    else
      kerroin = this.ketteryys/10 + 1;
    return this.aseDam*kerroin;
  }

  haeLoitsuDamage(mana) {
    return this.loitsuDam * (mana/10 + 1);
  }

  lisaaAse(nimi, dam, tyyppi) {
    this.ase = nimi;
    this.aseType = tyyppi;
    this.aseDam = dam;
    this.naytaArvot();
  }
  lisaaLoitsu(nimi, dam) {
    this.loitsu = nimi;
    this.loitsuDam = dam;
    this.naytaArvot();
  }

  lisaaOminaisuus(omin) {
    if(this.pisteet>0) {
      this.pisteet--;
      switch(omin) {
	case 'voima':
	  this.voima++;
	  break;
	case 'ketteryys':
	  this.ketteryys++;
	  break;
	case 'elama':
	  this.elama += 5;
	  break;
	case 'mana':
	  this.mana += 3;
	  break;
	default: 
      }
    }
    this.naytaArvot();
  }
  lisaaPisteet(pist) {
    this.pisteet += pist;
  }
  lisaaXP(xp) {
    this.xp += xp;
    if(this.xp>this.lvl*100) {
      this.lvl++;
      this.lisaaPisteet(5);
    }
    console.log("Total exp. " + this.xp);
    this.naytaArvot();
  }
}

class Vihu
{
  constructor(tyyppi, level) {
    this.lvl = level;
    level *= 3;
    this.tyyppi = tyyppi;
    console.log("Luodaan " + tyyppi);
    switch(tyyppi) {
      case 'Orc':
        this.elama = (Math.floor(Math.random() * level/2) + (level/1.5)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level/2) + (level/2)).toFixed(1);
	this.damType = "melee";
	break;
      case 'Lohikäärme':
        this.elama = (Math.floor(Math.random() * level) + (level/1.2)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level) + (level/2)).toFixed(1);
	this.damType = "ranged";
	break;
      default:
        this.elama = 10;
	this.damage = 2;
	this.damType = "melee";
	this.type = "Rotta";
	break;
    }
    this.xp = parseInt(this.elama)+parseInt(this.damage);
    console.log("HP: " + this.elama + " Dam: " + this.damage + " XP: " + this.xp);
    this.teeAse();
  }

  teeAse() {
    let damage = Math.floor(Math.random() * (this.xp/2));
    let arpa = Math.floor(Math.random() * 4);
    var ase;
    var tyyppi;
    /*
     * 0 = spellkirja
     * 1 = miekka
     * 2 = keppi
     * 3 = jousi
     */ 
    switch(arpa) {
      case 0:
	let loitsut = ['Pieru', 'Röyhtäys', 'Jäätävä katse'];
	let arpa2 = Math.floor(Math.random() * (loitsut.length));
        ase = loitsut[arpa2];
	tyyppi = "Spell";
	break;
      case 1:
        ase = "Miekka";
	tyyppi = "miekka";
	break;
      case 2:
        ase = "Keppi";
	tyyppi = "keppi";
	break;
      case 3:
        ase = "Jousi";
	tyyppi = "jousi";
	break;
    }
    // console.log("Tyyppi: " + ase + " damagella " + damage);
    this.ase = [ase, damage, tyyppi];
    console.log(this.ase);
  }
  haeAse() {
    return this.ase;
  }
}

class Taistelu
{
  constructor() {
    this.vihu = null;
  }
  teeTaistelu(tyyppi, lvl) {
    this.vihu = new Vihu(tyyppi, lvl);
    this.pelaajaHP = $("#elama").text();
    this.pelaajaMana = $("#mana").text();
  }
  lopetaTaistelu() {
    this.vihu = null;
    this.pelaajaHP = 0;
    this.pelaajaMana = 0;
  }
}

// teeHahmo();
var pelaaja = new Pelaaja();
var taistelu = new Taistelu();

$("#peli").html("<p>Peli alkakoon!</p>");
teeTaisteluValikko(pelaaja.lvl);

$(document).ready(function() {

  $("#voima").click(function() {
    pelaaja.lisaaOminaisuus('voima');
  });
  $("#ketteryys").click(function() {
    pelaaja.lisaaOminaisuus('ketteryys');
  });
  $("#elama").click(function() {
    pelaaja.lisaaOminaisuus('elama');
  });
  $("#mana").click(function() {
    pelaaja.lisaaOminaisuus('mana');
  });

  $("#aseDam").click(function() {
    console.log(pelaaja.haeAseDamage());
  });
  $("#loitsuDam").click(function() {
    console.log(pelaaja.haeLoitsuDamage(15));
  });

});

function teeTaisteluValikko(lvl) {
  var vihuTyypit = ['Rotta', 'Orc', 'Lohikäärme'];
  $("#peli").append("<p>");
  for(let i = 0; i<3; i++) {
    let arpa = Math.floor(Math.random() * (vihuTyypit.length));
    let tyyppi = vihuTyypit[arpa];
    let vihulvl = Math.floor(Math.random() * 5) + (lvl-1);
    if(vihulvl<1)
      vihulvl = 1;
    $("#peli").append("<button onclick=\"taistele('"+tyyppi+"', "+vihulvl+")\">Lvl " + vihulvl + " " + tyyppi + "</button> &nbsp;");
  }
  $("#peli").append("</p>");
}

function taistele(tyyppi, lvl) {
  console.log("Aloitetaan taistelu vastaan lvl " + lvl + " " + tyyppi);
  taistelu.teeTaistelu(tyyppi, lvl);
  $("#peli").html("<p>"+tyyppi+"</p>");
  $("#peli").append("HP: <button id=\"vihuHP\"></button>");
  $("#peli").append("<hr><p>Sinä</p>HP: <button id=\"omaHP\"></button> Mana: <button id=\"omaMana\"></button>");
  $("#peli").append("<p><button id=\"kaytaAse\" onclick=\"hyokkaaAseella()\">Käytä asetta!</button> &nbsp; <button id=\"kaytaLoitsu\">Loitsu!</button></p>");
  $("#peli").append("<p>Käytä loitsuun <input type=\"text\" size=\"3\" value=\"0\" id=\"manaLkm\"> manaa. </p>");

  $("#peli").append("<hr><div id=\"taisteluLoki\"></div>");

  $("#vihuHP").text(taistelu.vihu.elama);
  $("#omaHP").text($("#elama").text());
  $("#omaMana").text($("#mana").text());

  $("#taisteluLoki").html("<p>Taistelu alkaa...</p>");
  vihuHyokkaa();
}

function vihuHyokkaa() {
  let vahinko = taistelu.vihu.damage;
  vahinko = parseFloat(vahinko) + parseFloat(Math.floor(Math.random() * taistelu.vihu.lvl));
  vahinko = vahinko.toFixed(1);
  $("#taisteluLoki").append("<p>"+taistelu.vihu.tyyppi+" teki sinulle "+vahinko+" damagea.</p>");
  $("#omaHP").text($("#omaHP").text()-vahinko);
  tarkistaElinvoimat();
}

function hyokkaaAseella() {
  let vahinko = parseFloat(pelaaja.haeAseDamage()) + parseFloat(Math.floor(Math.random() * parseInt(pelaaja.lvl/2+1)));
  vahinko = vahinko.toFixed(1);
  $("#taisteluLoki").append("<p>Sinä teit viholliselle " + vahinko + " damagea.</p>");
  $("#vihuHP").text($("#vihuHP").text()-vahinko);
  vihuHyokkaa();
}

function tarkistaElinvoimat() {
  var vihuHP = parseFloat($("#vihuHP").text());
  var omaHP = parseFloat($("#omaHP").text());
  if(vihuHP<=0) {
    // vihu kuoli
    let ase = taistelu.vihu.haeAse();
    let teksti = "Vihollinen pudotti esineen: " + ase[0] + "\nSen damage on: " + ase[1] + "\n\nOta käyttöön?";
    if(confirm(teksti)) {
      if(ase[2]=="Spell")
	pelaaja.lisaaLoitsu(ase[0], ase[1]);
      else
        pelaaja.lisaaAse(ase[0], ase[1], ase[2]);
    }
    pelaaja.lisaaXP(taistelu.vihu.xp);
    $("#peli").html("<p>Valitse uusi taistelusi!</p>");
    teeTaisteluValikko(pelaaja.lvl);
    return;
  }
  if(omaHP<=0) {
    // pelaaja kuoli
    alert("Kuolit, hahaa!");
    $("#jumpscare").css("display", "block");
    var audio = new Audio("aani.mp3");
    audio.play();
    return;
  }
}
