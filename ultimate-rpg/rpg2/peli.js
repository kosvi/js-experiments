class Pelaaja
{
  constructor() {
    this.xp = 0;
    this.lvl = 1;
    this.lvlNext = 10;
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
    this.loki = ['', '', '', '', '', '', '', ''];
    this.naytaArvot();
  }

  naytaArvot() {
    $("#voima").text(this.voima);
    $("#ketteryys").text(this.ketteryys);
    $("#elama").text(this.elama);
    $("#mana").text(this.mana);
    $("#pisteet").text(this.pisteet);

    $("#leveli").text(this.lvl);
    $("#ase").text("Ase: " + this.ase);
    $("#aseDam").text(this.aseDam);
    $("#loitsu").text("Loitsu: " + this.loitsu);
    $("#loitsuDam").text(this.loitsuDam);
  }

  lisaaLokiin(rivi) {
    this.loki.push(rivi);
    this.loki.shift();
  }

  haeAseDamage() {
    let kerroin;
    if(this.aseType=="keppi")
      kerroin = this.voima/10 + 1;
    if(this.aseType=="miekka")
      kerroin = this.voima/20 + this.ketteryys/20 + 1.1;
    else
      kerroin = this.ketteryys/20 + 1;
    return this.aseDam*kerroin;
  }

  haeLoitsuDamage(mana) {
    return Math.floor(Math.random() * this.loitsuDam+1) * (mana/8 + 1);
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
      if(this.pisteet<=0) {
	$("#ohje").css("display", "none");
	$("#pisteetContainer").css("display", "none");
	$("#peli").css("display", "block");
      }
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
    $("#pisteetContainer").css("display", "inline-block");
    $("#peli").css("display", "none");
  }
  lisaaXP(xp) {
    this.lisaaLokiin("<p>Taistelusta kertyi <b>" + xp + " kokemuspistettä!</b></p>");
    this.xp += xp;
    while(this.xp>this.lvlNext) {
      this.lvl++;
      this.lisaaPisteet(5);
      this.lvlNext += this.lvl*10;
      $("#ohje").html("<p>Level Up!<br />Käytä saamasi pisteet, niin voit jatkaa peliä. </p>");
      $("#ohje").css("display", "block");
    }
    console.log("Total exp. " + this.xp + " next lvl: " + this.lvlNext);
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
      case 'Tonttu':
        this.elama = (Math.floor(Math.random() * level/2) + (level/2.5)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level/2) + (level/1.2)).toFixed(1);
	this.damType = "ranged";
	break;
      case 'Bandit':
        this.elama = (Math.floor(Math.random() * level/2) + (level/1.5)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level/2) + (level/2)).toFixed(1);
	this.damType = "melee";
	break;
      case 'Orc':
        this.elama = (Math.floor(Math.random() * level/2) + (level/1.2)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level/2) + (level/1.5)).toFixed(1);
	this.damType = "melee";
	break;
      case 'Lohikäärme':
        this.elama = (Math.floor(Math.random() * level) + (level*1.5)).toFixed(1);
	this.damage = (Math.floor(Math.random() * level) + (level/1.1)).toFixed(1);
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
    this.loki = ['', '', '', ''];
  }
  teeTaistelu(tyyppi, lvl) {
    this.vihu = new Vihu(tyyppi, lvl);
    this.pelaajaHP = $("#elama").text();
    this.pelaajaMana = $("#mana").text();
    for(let i = 0;i<4;i++)
      this.loki[i] = '';
  }
  lopetaTaistelu() {
    this.vihu = null;
    this.pelaajaHP = 0;
    this.pelaajaMana = 0;
  }
  lisaaLokiin(rivi) {
    this.loki.push(rivi);
    this.loki.shift();
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
  var vihuTyypit = ['Rotta', 'Orc', 'Lohikäärme', 'Bandit', 'Tonttu'];
  // $("#peli").append("<p class=\"vihuNapit\">");
  for(let i = 0; i<3; i++) {
    let arpa = Math.floor(Math.random() * (vihuTyypit.length));
    let tyyppi = vihuTyypit[arpa];
    let vihulvl = Math.floor(Math.random() * 5) + (lvl-1);
    if(vihulvl<1)
      vihulvl = 1;
    $("#peli").append("<button class=\"vihuNappi\" onclick=\"taistele('"+tyyppi+"', "+vihulvl+")\">Lvl " + vihulvl + " " + tyyppi + "</button> &nbsp;");
  }
  // $("#peli").append("</p>");
  $("#peli").append("<div id=\"pelaajaLoki\"></div>");
  for(let i = pelaaja.loki.length-1;i>=0;i--)
    $("#pelaajaLoki").append(pelaaja.loki[i]);
}

function taistele(tyyppi, lvl) {
  console.log("Aloitetaan taistelu vastaan lvl " + lvl + " " + tyyppi);
  taistelu.teeTaistelu(tyyppi, lvl);
  $("#peli").html("<p>"+tyyppi+"</p>");
  $("#peli").append("<div id=\"vihunTiedot\"><b>" + taistelu.vihu.tyyppi + "</b><br /><label>HP: </label><button id=\"vihuHP\"></button><br /><label>Dmg: </label><button>" + taistelu.vihu.damage + "</button>");
  $("#peli").append("<div id=\"omatTiedot\"><b>Sinä</b><br /><label>HP: </label><button id=\"omaHP\"></button> <br /><label>Mana: </label><button id=\"omaMana\"></button>");
  $("#peli").append("<div id=\"taisteluNapit\"><button id=\"kaytaAse\" onclick=\"hyokkaaAseella()\">Käytä asetta!</button> &nbsp; <button id=\"kaytaLoitsu\" onclick=\"hyokkaaLoitsulla()\">Loitsu!</button></div>");
  // $("#peli").append("<div id=\"\">Käytä loitsuun <input type=\"text\" size=\"3\" value=\"0\" id=\"manaLkm\"> manaa. </div>");

  $("#peli").append("<div id=\"taisteluLoki\"></div>");

  $("#vihuHP").text(taistelu.vihu.elama);
  $("#omaHP").text($("#elama").text());
  $("#omaMana").text($("#mana").text());

  $("#taisteluLoki").html("<p>Taistelu alkaa...</p>");
  if(pelaaja.aseType!="jousi")
    vihuHyokkaa();
}

function vihuHyokkaa() {
  let vahinko = taistelu.vihu.damage;
  vahinko = parseFloat(vahinko) + parseFloat(Math.floor(Math.random() * taistelu.vihu.lvl));
  vahinko = vahinko.toFixed(1);
  // $("#taisteluLoki").append("<p>"+taistelu.vihu.tyyppi+" teki sinulle "+vahinko+" damagea.</p>");
  taistelu.lisaaLokiin("<p>"+taistelu.vihu.tyyppi+" teki sinulle "+vahinko+" damagea.</p>");
  $("#omaHP").text(($("#omaHP").text()-vahinko).toFixed(1));
  tarkistaElinvoimat();
}

function hyokkaaLoitsulla() {
  let mana = parseInt($("#omaMana").text());
  manaKayt = mana/3;
  $("#omaMana").text((mana-manaKayt).toFixed(1));
  let vahinko = parseFloat(pelaaja.haeLoitsuDamage(manaKayt)) + parseFloat(Math.floor(Math.random() * parseInt(pelaaja.lvl/2+1)));
  vahinko = vahinko.toFixed(1);
  console.log("Spell damage: "+vahinko);
  taistelu.lisaaLokiin("<p>Sinä teit viholliselle " + vahinko + " damagea loitsulla " + pelaaja.loitsu + ".</p>");
  $("#vihuHP").text(($("#vihuHP").text()-vahinko).toFixed(1));
  vihuHyokkaa();
}

function hyokkaaAseella() {
  let vahinko = parseFloat(pelaaja.haeAseDamage()) + parseFloat(Math.floor(Math.random() * parseInt(pelaaja.lvl/2+1)));
  vahinko = vahinko.toFixed(1);
  // $("#taisteluLoki").append("<p>Sinä teit viholliselle " + vahinko + " damagea.</p>");
  taistelu.lisaaLokiin("<p>Sinä teit viholliselle " + vahinko + " damagea aseella " + pelaaja.ase + ".</p>");
  $("#vihuHP").text(($("#vihuHP").text()-vahinko).toFixed(1));
  vihuHyokkaa();
}

function tarkistaElinvoimat() {
  var vihuHP = parseFloat($("#vihuHP").text());
  var omaHP = parseFloat($("#omaHP").text());
  $("#taisteluLoki").html("");
  for(let i=0;i<4;i++)
    $("#taisteluLoki").append(taistelu.loki[i]);
  if(vihuHP<=0) {
    // vihu kuoli
    pelaaja.lisaaLokiin("<p>Lvl " + taistelu.vihu.lvl + " <b>" + taistelu.vihu.tyyppi + "</b> kaatui upeassa taistelussa!</p>");
    let ase = taistelu.vihu.haeAse();
    if(ase[2]=="Spell") {
      if(ase[1]>pelaaja.loitsuDam) {
	pelaaja.lisaaLoitsu(ase[0], ase[1]);
	pelaaja.lisaaLokiin("<p>Sait loitsun <b>" + ase[0] + "</b>, jonka damage on " + ase[1] + "</p>");
	alert("Sait uuden loitsun!");
      }
    }
    else {
      if(ase[1]>pelaaja.aseDam) {
	pelaaja.lisaaAse(ase[0], ase[1], ase[2]);
	pelaaja.lisaaLokiin("<p>Sait aseen <b>" + ase[0] + "</b>, jonka damage on " + ase[1] + "</p>");
	alert("Sait uuden aseen!");
      }
    }
    /*
    let teksti = "Vihollinen pudotti esineen: " + ase[0] + "\nSen damage on: " + ase[1] + "\n\nOta käyttöön?";
    if(confirm(teksti)) {
      if(ase[2]=="Spell")
	pelaaja.lisaaLoitsu(ase[0], ase[1]);
      else
        pelaaja.lisaaAse(ase[0], ase[1], ase[2]);
    }
    */
    pelaaja.lisaaXP(taistelu.vihu.xp);
    $("#kaytaAse").attr("disabled", true);
    $("#kaytaLoitsu").attr("disabled", true);
    $("#taisteluLoki").append("<button id=\"paluuNappi\" onclick=\"palaaTaistelusta()\">Lopeta taistelu</button>");
    // $("#peli").html("<p>Valitse uusi taistelusi!</p>");
    // teeTaisteluValikko(pelaaja.lvl);
    return;
  }
  if(omaHP<=0) {
    // pelaaja kuoli
    $("#jumpscare").css("display", "block");
    var audio = new Audio("aani.mp3");
    audio.play();
    alert("Kuolit, hahaa!");
    return;
  }
}

function palaaTaistelusta() {
  $("#peli").html("<p>Valitse uusi taistelusi!</p>");
  teeTaisteluValikko(pelaaja.lvl);
}
