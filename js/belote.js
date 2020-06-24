var paquet1 = [];
var paquet2 = [];
var paquet3 = [];
var paquet4 = [];
var nom1 = document.getElementById('nom1');
var nom2 = document.getElementById('nom2');
var nom3 = document.getElementById('nom3');
var nom4 = document.getElementById('nom4');
var j = 1; //Variable du joueur qui doit jouer
var centre = document.getElementById('centre');
var mel = 3; //Nombre de carte que l'on doit distribuer
var obj;
var obs;
var paquets;
var paquetstour2;
var showinterval;
var atout; //Couleur de l'atout
var prendre = document.getElementById('prendre');
var laisser = document.getElementById('laisser');
var coeur = document.getElementById('coeur');
var pique = document.getElementById('pique');
var trefle = document.getElementById('trefle');
var carreau = document.getElementById('carreau');
var carte1 = document.getElementById('carte1');
var carte2 = document.getElementById('carte2');
var carte3 = document.getElementById('carte3');
var carte4 = document.getElementById('carte4');
var carte5 = document.getElementById('carte5');
var carte6 = document.getElementById('carte6');
var carte7 = document.getElementById('carte7');
var carte8 = document.getElementById('carte8');
var main = [carte1, carte2, carte3, carte4, carte5, carte6, carte7, carte8];
var plateau1 = document.getElementById('plateau1');
var plateau2 = document.getElementById('plateau2');
var plateau3 = document.getElementById('plateau3');
var plateau4 = document.getElementById('plateau4');
var imgj1;
var imgj2;
var imgj3;
var imgj4;
var bosspl; //Joueur Maitre [Sting]
var bossct; //Carte de ce Joueur [Objet]
var fkiller; //Fonction pour fermer une autre fonction sous condition
var partenaire; //Partenaire qui est dans la meme équipe
var draw;
var reserve = [];


window.onload = function() {
  getjson();
  setInterval(function() {
  showinterval = showbutton();
  }, 1000);
}


//////////////////////////////////Comparaison//////////////////////////////////
function jeposequoi() {
  for (var i = 0; i < paquetX.length; i++) {
    if (paquetX[i].couleur === atout) {
      main[i].classList.remove("disabled");
      main[i].classList.add("posable");
      fkiller = "couleur";
    }
  }
  if (fkiller = "couleur") {
    return;
  }

  for (var i = 0; i < paquetX.length; i++) {
    if (bosspl = partenaire) {
      monteratout();
      normal();
      fkiller = "partenaire";
    }
  }
  if (fkiller = "partenaire") {
    return;
  }

  for (var i = 0; i < paquetX.length; i++) {
    monteratout();
  }
  if (fkiller = "atout") {
    return;
  }

  for (var i = 0; i < paquetX.length; i++) {
    if (paquet[i].couleur !== atout) {
      normal();
    }
  }
}

function monteratout() {
  if (paquetX[i].atout === "oui") {
    if (paquetX[i].valatout > bossct["valatout"] || bossct === undefined) {
      main[i].classList.remove("disabled");
      main[i].classList.add("posable");
      fkiller = "atout";
    }
  }
}

function normal() {
  if (paquetX[i].atout === "") {
    main[i].classList.remove("disabled");
    main[i].classList.add("posable");
  }
}
//////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Initialisation///////////////////////////////
function playstart() {
  atout();
}
//////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////Atout//////////////////////////////////////
function atout() {
  draw = reserve.shift();
  atout = draw['couleur'];
  centre.src = "cartes/" + draw['src'] + ".svg";
}
////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////2e Tour///////////////////////////////////
function choix() {

  switch (atout) {
    case "carreau":
      coeur.style.display = "initial";
      pique.style.display = "initial";
      trefle.style.display = "initial";
      break;

    case "coeur":
      carreau.style.display = "initial";
      pique.style.display = "initial";
      trefle.style.display = "initial";
      break;

    case "pique":
      carreau.style.display = "initial";
      coeur.style.display = "initial";
      trefle.style.display = "initial";
      break;

    case "trefle":
      carreau.style.display = "initial";
      coeur.style.display = "initial";
      pique.style.display = "initial";
      break;

    default:
  }
}
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////////Bouttons//////////////////////////////////
prendre.onclick = function() {
  console.log("Prendre");
  // paquet1.push(draw);
  centre.src = "cartes/nothing.svg";
  draw['atout'] = "oui";
  disabled();
  //takeatout();
  clearInterval(showinterval);
}

laisser.onclick = function() {
  console.log("Laisser");
  disabled();
  tourpartour();
}

coeur.onclick = function() {
  atout = "coeur";
  console.log("coeur");
  disabled();
}

carreau.onclick = function() {
  atout = "carreau";
  console.log('carreau');
  disabled();
}

pique.onclick = function() {
  atout = "pique";
  console.log('pique');
  disabled();
}

trefle.onclick = function() {
  atout = "trefle";
  console.log("trefle");
  disabled();
}
//////////////////////////////////////////////////////////////////////////////


////////////////////////////////////Cartes/////////////////////////////////////
carte1.onclick = function() {
  console.log('carte1');
  plateau1 = "cartes/" + paquet1[0].src + ".svg";
  imgj1 = paquet1[0].shift();
}
carte2.onclick = function() {
  console.log('carte2');
  plateau1 = "cartes/" + paquet1[1].src + ".svg";
  imgj1 = paquet1[1].shift();
}
carte3.onclick = function() {
  console.log('carte3');
  plateau1 = "cartes/" + paquet1[2].src + ".svg";
  imgj1 = paquet1[2].shift();
}
carte4.onclick = function() {
  console.log('carte4');
  plateau1 = "cartes/" + paquet1[3].src + ".svg";
  imgj1 = paquet1[3].shift();
}
carte5.onclick = function() {
  console.log('carte5');
  plateau1 = "cartes/" + paquet1[4].src + ".svg";
  imgj1 = paquet1[4].shift();
}
carte6.onclick = function() {
  console.log('carte6');
  plateau1 = "cartes/" + paquet1[5].src + ".svg";
  imgj1 = paquet1[5].shift();
}
carte7.onclick = function() {
  console.log('carte7');
  plateau1 = "cartes/" + paquet1[6].src + ".svg";
  imgj1 = paquet1[6].shift();
}
carte8.onclick = function() {
  console.log('carte8');
  plateau1 = "cartes/" + paquet1[7].src + ".svg";
  imgj1 = paquet1[7].shift();
}
///////////////////////////////////////////////////////////////////////////////


function disabled() {
  trefle.style.display = "none";
  carreau.style.display = "none";
  coeur.style.display = "none";
  pique.style.display = "none";
  prendre.style.display = "none";
  laisser.style.display = "none";
}


function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(reserve.length));
}


function concordance(input) {
  for (var i = 0; i < input.length; i++) {
    input[i] = obj[input[i]];
  }
}


/////////////////////////////////////AJAX//////////////////////////////////////

/////////////////////////////////Http Request//////////////////////////////////
function createHttpRequest() {
  var req = null;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {}
    }
  }
  if (req == null) {
    alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
  }
  return req;
}
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Recup du JSON/////////////////////////////////
function getjson() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête JSON : Cartes : ", req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "js/cartes32.json", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    prepare();
  }, 500);
}
///////////////////////////////////////////////////////////////////////////////


function prepare() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête JSON : Cartes : ", req.status);
      obs = req.responseText;
    }
  }
  req.open("POST", "php/belote/preparebelote.php", true);
  req.send();
  setTimeout(function() {
    obs = JSON.parse(obs);
    melange();
    nom1.innerHTML = obs['J1'];
    nom2.innerHTML = obs['J2'];
    nom3.innerHTML = obs['J3'];
    nom4.innerHTML = obs['J4'];

    switch (obj['status']) {
      case "J1":
        melange();
        break;
      case "J2":

        break;
      case "J3":

        break;
      case "J4":

        break;
      default:

    }
  }, 500);
}


function melange() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Melange : ", req.status);
    }
  }
  req.open("POST", "php/belote/melange.php", true);
  req.send();
  setTimeout(function() {
    getcards();
  }, 200);
}


function melangetour2() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Melange : ", req.status);
    }
  }
  req.open("POST", "php/belote/melangetour2.php", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send("atout="+draw+"&");
  setTimeout(function() {
    paquets = JSON.parse(req.responseText);

    paquet1.push(obj[paquets["paquet1"][0]]);
    paquet1.push(obj[paquets["paquet1"][1]]);
    paquet1.push(obj[paquets["paquet1"][2]]);

    paquet2.push(obj[paquets["paquet2"][0]]);
    paquet2.push(obj[paquets["paquet2"][1]]);
    paquet2.push(obj[paquets["paquet2"][2]]);

    paquet3.push(obj[paquets["paquet3"][0]]);
    paquet3.push(obj[paquets["paquet3"][1]]);
    paquet3.push(obj[paquets["paquet3"][2]]);

    paquet4.push(obj[paquets["paquet4"][0]]);
    paquet4.push(obj[paquets["paquet4"][1]]);
    paquet4.push(obj[paquets["paquet4"][2]]);
  }, 200);
}

function getcards() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP getcards : ", req.status);
    }
  }
  req.open("POST", "php/belote/getcards.php", true);
  req.send();
  setTimeout(function() {
    paquets = JSON.parse(req.responseText);

    paquet1 = paquets['paquet1'];
    paquet2 = paquets['paquet2'];
    paquet3 = paquets['paquet3'];
    paquet4 = paquets['paquet4'];
    reserve = paquets['reserve'];
    concordance(paquet1);
    concordance(paquet2);
    concordance(paquet3);
    concordance(paquet4);
    concordance(reserve);

    playstart();
  }, 200);
}

function tourpartour() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Tour par Tour : ", req.status);
    }
  }
  req.open("POST", "php/belote/tourpartour.php", true);
  req.send();
  // choix();
}

function showbutton() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP showbutton : ", req.status);
    }
  }
  req.open("POST", "php/belote/showbutton.php", true);
  req.send();
  setTimeout(function() {
    let rep = JSON.parse(req.responseText);

    if (rep["status"] == "oui") {
      prendre.style.display = "initial";
      laisser.style.display = "initial";

    }
    // choix();
  }, 500);
}
