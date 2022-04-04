class Pelaaja {
  constructor() {
    this.xp = 0;
    this.lvl = 1;
    this.lvlNext = 100;
    this.kulta = 10;
    this.voima = 5;
    this.ketteryys = 5;
    this.elama = 25;
    this.mana = 15;
    this.pisteet = 5;

    this.aseM = null;
    this.aseR = null;
    this.loitsu = null;
    this.armor = null;
    this.pet = null;

    this.naytaArvot();
  }

  naytaArvot() {
    $("#voima").text(this.voima);
    $("#ketteryys").text(this.ketteryys);
    $("#elama").text(this.elama);
    $("#mana").text(this.mana);

    if(this.aseM!=null)
      $(".meleeAse").html(this.aseM.nimi + "<br />damage: " + this.aseM.damage + "<br />paino: " + this.aseM.paino);
    else
      $(".meleeAse").text("ei ole");
    if(this.aseR!=null)
      $(".rangedAse").html(this.aseR.nimi + "<br />damage: " + this.aseR.damage + "<br />paino: " + this.aseR.paino);
    else
      $(".rangedAse").text("ei ole");
    if(this.loitsu!=null)
      $(".loitsu").html(this.loitsu.nimi + "<br />lvl: " + this.loitsu.lvl);
    else
      $(".loitsu").text("ei ole");
    if(this.armor!=null)
      $(".armor").html(this.armor.nimi + "<br />defu: " + this.armor.defu + "<br />paino: " + this.armor.paino + "<br />resist: " + this.armor.resist);
    else
      $(".armor").text("ei ole");
    if(this.pet!=null)
      $(".pet").html(this.pet.nimi + "<br />tyyppi: " + this.pet.tyyppi + "<br />lvl: " + this.pet.lvl);
    else
      $(".pet").text("ei ole");

    $("#leveli").text(this.lvl);
    $("#kulta").text(this.kulta);
    $("#pisteet").text(this.pisteet);
  }

  lisaaVoima() {
    if(this.pisteet>0) {
      this.pisteet--;
      this.voima++;
    }
    this.naytaArvot();
  }
  lisaaKetteryys() {
    if(this.pisteet>0) {
      this.pisteet--;
      this.ketteryys++;
    }
    this.naytaArvot();
  }
  lisaaElama() {
    if(this.pisteet>0) {
      this.pisteet--;
      this.elama += 5;
      $("#elama").hide().text(this.elama).toggle("highlight");
    }
    // this.naytaArvot();
  }
  lisaaMana() {
    if(this.pisteet>0) {
      this.pisteet--;
      this.mana += 3;
      $("#mana").hide().text(this.mana).toggle("pulsate");
    }
    // this.naytaArvot();
  }

  haePaino() {
    return this.aseM.paino + this.aseR.paino + this.armor.paino;
  }

  haeDefu() {
    return this.armor.defu;
  }

  haeResist() {
    return this.armor.resist/100;
  }
}

class Ase {
  constructor(lvl = 1) {
    let nimet = ["Keppi", "Miekka", "Tikari", "Jousi", "Varsijousi"];
    let tyypit = ['m', 'm', 'm', 'r', 'r'];
    let damaget = [0.8, 1.2, 0.5, 0.9, 1.2];
    let painot = [1.0, 1.3, 0.4, 0.9, 1.3];
    let arpa = Math.floor(Math.random() * (nimet.length+1));
    this.nimi = nimet[arpa];
    this.tyyppi = tyypit[arpa];
    this.damage = Math.floor(Math.random() * parseInt(lvl*damaget[arpa]+1));
    this.paino = Math.floor(Math.random() * parseInt(lvl*painot[arpa]+1));
  }
}

class Loitsu {
  constructor(lvl = 1) {
    let nimet = ["Heal", "Tulipallo", "Sumu"];
    let tyypit = ['h', 'd', 'p'];
    let arpa = Math.floor(Math.random() * (nimet.length+1));
    this.nimi = nimet[arpa];
    this.tyyppi = tyypit[arpa];
    this.lvl = lvl;
  }
}

class Armor {
  constructor(lvl = 1) {
    let nimet = ["Kalsarit", "Nahkanuttu", "Haarniska"];
    let defut = [0.1, 1.0, 2.0];
    let painot = [0, 1, 2];
    let arpa = Math.floor(Math.random() * (nimet.length+1));
    this.nimi = nimet[arpa];
    this.defu = Math.floor(Math.random() * parseInt((lvl*defut[arpa]+1)));
    this.paino = Math.floor(Math.random() * parseInt((lvl*painot[arpa]+1)));
    this.resist = Math.floor(Math.random() * 30);
  }
}

class Pet {
  constructor(nimi, tyyppi, lvl) {
    this.nimi = nimi;
    this.tyyppi = tyyppi;
    this.lvl = lvl;
    this.lvlNext = lvl*100;
    this.xp = lvl*100;
  }
  lisaaXP() {
    let palautus = false;
    this.xp += 5;
    if(this.xp>this.lvlNext) {
      this.lvl++;
      this.lvlNext += 100;
      palautus = true;
    }
    return palautus;
  }
  toimi() {
    let palautus;
    switch(this.tyyppi) {
      case "heal":
	palautus = "heal:"+this.lvl;
        break;
      case "support": 
        palautus = "support:"+this.lvl;
	break;
      case "hyok":
        palautus = "hyok:"+(this.lvl*2);
	break;
    }
    return palautus;
  }
}
