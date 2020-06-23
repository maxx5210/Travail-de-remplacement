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
var main =  [carte1,carte2,carte3,carte4,carte5,carte6,carte7,carte8];
var bosspl; //Joueur Maitre [Sting]
var bossct; //Carte de ce Joueur [Objet]
var fkiller; //Fonction pour fermer une autre fonction sous condition
var partenaire; //Partenaire qui est dans la meme équipe
var draw;
var reserve = ["1clubs", "7clubs", "8clubs", "9clubs", "10clubs", "Jackclubs", "Queenclubs", "Kingclubs",
"1hearts", "7hearts", "8hearts", "9hearts", "10hearts", "Jackhearts", "Queenhearts", "Kinghearts",
"1spades", "7spades", "8spades", "9spades", "10spades", "Jackspades", "Queenspades", "Kingspades",
"1diamonds", "7diamonds", "8diamonds", "9diamonds", "10diamonds", "Jackdiamonds", "Queendiamonds", "Kingdiamonds"
];

window.onload = function() {
  getjson();
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
  if (paquetX[i].atout === undefined) {
    main[i].classList.remove("disabled");
    main[i].classList.add("posable");
  }
}
//////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Initialisation///////////////////////////////
function playstart() {
  melange();
  atout();
  tourpartour();
  melangetour2();
  choix();
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
  melange(paquet1);
  melange(paquet2);
  melange(paquet3);
  melange(paquet4);

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

  tourpartour();

}
/////////////////////////////////////////////////////////////////////////////


////////////////////////////////////Bouttons//////////////////////////////////
prendre.onclick = function() {
  paquet1.push(draw);
  Object.defineProperty(draw, "atout", {
    atout: "oui"
  });
  disabled();
}

laisser.onclick = function() {
  disabled();
  //Dire à php tu peux continuer
}

coeur.onclick = function() {
  atout = "coeur";
  disabled();
}

carreau.onclick = function() {
  atout = "carreau";
  disabled();
}

pique.onclick = function() {
  atout = "pique";
  disabled();
}

trefle.onclick = function() {
  atout = "trefle";
  disabled();
}
//////////////////////////////////////////////////////////////////////////////


function disabled() {
  trefle.disabled = true;
  carreau.disabled = true;
  coeur.disabled = true;
  pique.disabled = true;
  prendre.disabled = true;
  laisser.disabled = true;
}


function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(reserve.length));
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

    switch (obj['status'])  {
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
  setTimeout(function() {}, 200);
}


function melangetour2() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Melange : ", req.status);
    }
  }
  req.open("POST", "php/belote/melangetour2.php", true);
  req.send();
  setTimeout(function() {}, 200);
}


function getcards() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Melange : ", req.status);
    }
  }
  req.open("POST", "php/belote/getcards.php", true);
  req.send();
  setTimeout(function() {}, 200);
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
  setTimeout(function() {
    var rep = JSON.parse(req.responseText);

    if (rep['status'] == rep['joueur']) {
      prendre.display = "initial";
      laisser.display = "initial";
    }

  }, 500);
}
