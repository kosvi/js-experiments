class Vihu {
  constructor(lvl = 1, vihu = -1) {
    let nimet = ["Rotta", "Hiisi", "Örkki", "Tonttu", "Lohikäärme"];
    let tyypit = ['m', 'r', 'm', 'm', 's'];
    let voimat = [0.1, 0.7, 1.0, 0.5, 2.0];
    let ketteryydet = [0.3, 0.9, 0.5, 1.5, 1.0];
    let elamat = [0.1, 0.7, 1.2, 0.5, 2.0];
    let arpa = vihu;
    if(vihu<0)
      arpa = Math.floor(Math.random() * (nimet.length+1));
    this.lvl = lvl;
    this.nimi = nimet[arpa];
    this.tyyppi = tyypit[arpa];
    this.voima = Math.floor((lvl - lvl/2 + Math.floor(Math.random() * lvl+1))*voimat[arpa]);
    this.ketteryys = Math.floor((lvl - lvl/2 + Math.floor(Math.random() * lvl+1))*ketteryydet[arpa]); 
    this.elama = Math.floor((lvl - lvl/2 + Math.floor(Math.random() * lvl+1))*elamat[arpa]); 
    this.xp = (this.voima+this.ketteryys+this.elama)/3;
    this.kulta = Math.floor(Math.random() * this.xp)+1;
    if(Math.floor(Math.random() *3)==0)
      this.ase = new Ase(lvl);
    else
      this.ase = new Ase(1);
  }
}

class Boss {
  constructor(lvl = 1, boss = -1) {
    let nimet = ["Pekka"];
    let tyypit = ['m'];
    let voimat = [0.2];
    let ketteryydet = [0.2];
    let elamat = [3.0];
    let arpa = boss;
    if(boss<0)
      arpa = Math.floor(Math.random() * (nimet.length+1));
    this.lvl = lvl;
    this.nimi = nimet[arpa];
    this.tyyppi = tyypit[arpa];
    this.voima = lvl*voimat[arpa]*5;
    this.ketteryys = lvl*ketteryydet[arpa]*5;
    this.elama = lvl*elamat[arpa]*5;
  }
}
