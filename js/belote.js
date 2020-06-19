var paquet1 = [];
var paquet2 = [];
var paquet3 = [];
var paquet4 = [];
var j = 1; //Variable du joueur qui doit jouer
var centre = document.getElementById('centre');
var mel = 3;
var obj;
var atout;
var prendre = document.getElementById('prendre');
var laisser = document.getElementById('laisser');
var coeur = document.getElementById('coeur');
var pique = document.getElementById('pique');
var trefle = document.getElementById('trefle');
var carreau = document.getElementById('carreau');
var bosspl;
var bossct;
var fkiller;
var partenaire;
var draw;
var reserve = ["7clubs", "8clubs", "9clubs", "10clubs", "Jackclubs", "Queenclubs", "Kingclubs",
  "7hearts", "8hearts", "9hearts", "10hearts", "Jackhearts", "Queenhearts", "Kinghearts",
  "7spades", "8spades", "9spades", "10spades", "Jackspades", "Queenspades", "Kingspades",
  "7diamonds", "8diamonds", "9diamonds", "10diamonds", "Jackdiamonds", "Queendiamonds", "Kingdiamonds"
];

window.onload = function() {
  getjson();
}

//////////////////////////////////Comparaison//////////////////////////////////
function Jeposequoi() {
  for (var i = 0; i < paquetX.length; i++) {
    if (paquetX[i].couleur === atout) {
      main[i].disabled = false;
      fkiller = "couleur";
    }
  }
  if (fkiller = "couleur") {
    break;
  }

  for (var i = 0; i < paquetX.length; i++) {
    if (bosspl = partenaire) {
      monteratout();
      normal();
      fkiller = "partenaire";
    }
  }
  if (fkiller = "partenaire") {
    break;
  }

  for (var i = 0; i < paquetX.length; i++) {
    monteratout();
  }
  if (fkiller = "atout") {
    break;
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
      main[i].disabled = false;
      fkiller = "atout";
    }
  }
}

function normal() {
  if (paquetX[i].atout === undefined) {
    main[i].disabled = false;
  }
}
//////////////////////////////////////////////////////////////////////////////


/////////////////////////////////Initialisation///////////////////////////////
function playstart() {
  melange(paquet1);
  melange(paquet2);
  melange(paquet3);
  melange(paquet4);
  atout();
  tourpartour();
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


///////////////////////////////////Mélange///////////////////////////////////
function melange(input) {
  for (let i = 0; i < mel; i++) {
    let rand = getRandomInt();
    input.push(obj[reserve[rand]]);
    reserve.splice(rand, 1);
  }
}
//////////////////////////////////////////////////////////////////////////////


///////////////////////////////////2e Tour///////////////////////////////////
function choix() {
  mel = 2;
  melange(paquet1);
  melange(paquet2);
  melange(paquet3);
  melange(paquet4);

  switch (atout) {
    case "carreau":
      coeur.disabled = false;
      pique.disabled = false;
      trefle.disabled = false;
      break;

    case "coeur":
      carreau.disabled = false;
      pique.disabled = false;
      trefle.disabled = false;
      break;

    case "pique":
      carreau.disabled = false;
      coeur.disabled = false;
      trefle.disabled = false;
      break;

    case "trefle":
      carreau.disabled = false;
      coeur.disabled = false;
      pique.disabled = false;
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
    atout: "oui";
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
      obj = req.responseText;
    }
  }
  req.open("POST", "php/belote/preparebelote.php", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    playstart();

    switch (obj['status']) {
      case expression:

        break;
      default:

    }
  }, 500);
}


function tourpartour() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP Prepare : ", req.status);
    }
  }
  req.open("POST", "php/belote/tourpartour.php", true);
  req.send();
  setTimeout(function() {
      rep = JSON.parse(req.responseText);

      if (rep['status'] == rep['joueur'] {
          prendre.disabled = false;
          laisser.disabled = false;
        }

      }, 500);
  }
