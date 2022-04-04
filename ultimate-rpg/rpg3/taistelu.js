class Taistelu {
  constructor(pelaaja, vihu, boss) {
    this.bossFight = false;
    if(vihu==null) {
      this.bossFight = true;
    }
    this.pelaaja = pelaaja;
    this.vihu = vihu;
    this.boss = boss;
    this.loki = ['', '', '', '', '', ''];
  }
  vihuHyokkaa() {
    let vaisto = Math.floor(Math.random() * 10) + (this.pelaaja.ketteryys - this.pelaaja.haePaino());
    let defu = this.pelaaja.haeDefu();
    let resist = this.pelaaja.haeResist();
    var osuminen, damage, nimi, tyyppi;
    if(this.bossFight) {
      osuminen = Math.floor(Math.random() * 10) + (this.boss.ketteryys);
      damage = Math.floor(Math.random() * (this.boss.voima+1)) + this.boss.lvl;
      nimi = this.boss.nimi;
      tyyppi = this.boss.tyyppi;
    }
    else {
      osuminen = Math.floor(Math.random() * 10) + (this.vihu.ketteryys);
      damage = Math.floor(Math.random() * (this.vihu.voima+1)) + this.vihu.lvl;
      nimi = this.vihu.nimi;
      tyyppi = this.vihu.tyyppi;
    }
    console.log("Vihun osuma: " + vaisto + " vs. " + osuminen);
    if(vaisto>osuminen)
      damage = 0;
    else {
      if(tyyppi=='m')
	damage = damage - defu;
      else if(tyyppi=='r')
	damage = Math.floor(damage * resist);
    }
    this.lisaaLokiin("<b>" + nimi + "</b> teki sinulle " + damage + " damagea.");
    return damage;
  }
  meleeHyokkays() {
    var vaisto, tyyppi;
    var damage = 0;
    if(this.bossFight) {
      vaisto = Math.floor(Math.random() * 10) + (this.boss.ketteryys);
      tyyppi = this.boss.tyyppi;
      // elama = this.boss.elama;
    }
    else {
      vaisto = Math.floor(Math.random() * 10) + (this.vihu.ketteryys);
      tyyppi = this.vihu.tyyppi;
      // elama = this.vihu.elama;
    }
    console.log("Osuma? => " + this.pelaaja.ketteryys + " vs. " + vaisto);
    switch(tyyppi) {
      case 'm':
        damage = this.pelaaja.haeMeleeDamage();
        break;
      default:
	if(!(Math.floor(Math.random() * 3)==0))
	  damage = this.pelaaja.haeMeleeDamage();
	else
	  this.lisaaLokiin("Et osunut viholliseen aseella <b>" + this.pelaaja.aseM.nimi + "</b>.");
        break;
    }
    this.lisaaLokiin("Teit viholliselle " + damage + " damagea.");
    return damage;
  }

  rangedHyokkays() {
    var vaisto, tyyppi;
    var damage = 0;
    if(this.bossFight) {
      vaisto = Math.floor(Math.random() * 10) + (this.boss.ketteryys);
      tyyppi = this.boss.tyyppi;
    }
    else {
      vaisto = Math.floor(Math.random() * 10) + (this.vihu.ketteryys);
      tyyppi = this.vihu.ketteryys;
    }
    console.log("Osuma? => " + this.pelaaja.ketteryys + " vs. " + vaisto);
    switch(tyyppi) {
      case 's':
      case 'r':
        damage = this.pelaaja.haeRangedDamage();
        break;
      default:
	if(!(Math.floor(Math.random() * 3)==0))
	  damage = this.pelaaja.haeRangedDamage();
	else
	  this.lisaaLokiin("Et osunut viholliseen aseella <b>" + this.pelaaja.aseR.nimi + "</b>.");
        break;
    }
    this.lisaaLokiin("Teit viholliselle " + damage + " damagea.");
    return damage;
  }

  lisaaLokiin(rivi) {
    this.loki.push(rivi);
    this.loki.shift();
  }

  haeLoki() {
    let teksti = "";
    for(let i = 0; i<this.loki.length; i++) 
      teksti += "<p>" + this.loki[i] + "</p>";
    return teksti;
  }
}
