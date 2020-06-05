"use strict";
///////////////////////////////////Variables///////////////////////////////////
var reveler = document.getElementById('dos1');
var carte1 = document.getElementById('carte1');
var devoiler = document.getElementById('dos2');
var carte2 = document.getElementById('carte2');
var paquet1 = [];
var paquet2 = [];
var obj;
var balance = true;
var player1click;
var player2click;
var player1card;
var player2card;
var nbrcart1 = document.getElementById('cartpl1');
var nbrcart2 = document.getElementById('cartpl2');
var reserve = ["1clubs", "1diamonds", "1hearts", "1spades", "2clubs", "2diamonds", "2hearts", "2spades", "3clubs", "3diamonds", "3hearts", "3spades",
  "4clubs", "4diamonds", "4hearts", "4spades", "5clubs", "5diamonds", "5hearts", "5spades", "6clubs", "6diamonds", "6hearts", "6spades",
  "7clubs", "7diamonds", "7hearts", "7spades", "8clubs", "8diamonds", "8hearts", "8spades", "9clubs", "9diamonds", "9hearts", "9spades",
  "10clubs", "10diamonds", "10hearts", "10spades", "Jackclubs", "Jackdiamonds", "Jackhearts", "Jackspades",
  "Queenclubs", "Queendiamonds", "Queenhearts", "Queenspades", "Kingclubs", "Kingdiamonds", "Kinghearts", "Kingspades"
];
///////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  getjson();
}

////////////////////////////////////Fonctions//////////////////////////////////

//////////////////////////////////Comparaison//////////////////////////////////
function comparaison() {
  if (player1click === true && player2click === true) {

    switch (true) {

      case player1card['valeur'] > player2card['valeur']:
        console.log("Le J1 remporte les cartes");
        player1click = false;
        player2click = false;
        for (let i = 0; i <= reserve.length - 1; i++) {
          paquet1.push(reserve[i]);
        }
        reserve.splice(0, reserve.length);
        carte1.classList.add('animationgauche');
        carte2.classList.add('animationgauche');
        setTimeout(function() {
          carte1.src = "cartes/nothing.svg";
          carte2.src = "cartes/nothing.svg";
          reveler.classList.remove('disabled');
          devoiler.classList.remove('disabled');
          carte1.classList.remove('animationgauche');
          carte2.classList.remove('animationgauche');
        }, 1000);

        break;

      case player1card['valeur'] < player2card['valeur']:
        console.log("Le J2 remporte les cartes");
        player1click = false;
        player2click = false;
        for (let i = 0; i <= reserve.length - 1; i++) {
          paquet2.push(reserve[i]);
        }
        reserve.splice(0, reserve.length);
        carte1.classList.add('animationdroite');
        carte2.classList.add('animationdroite');
        setTimeout(function() {
          carte1.src = "cartes/nothing.svg";
          carte2.src = "cartes/nothing.svg";
          reveler.classList.remove('disabled');
          devoiler.classList.remove('disabled');
          carte1.classList.remove('animationdroite');
          carte2.classList.remove('animationdroite');
        }, 1000);
        break;

      case player1card['valeur'] === player2card['valeur']:
        console.log("Bataille !");
        reserve.push(paquet1.shift(), paquet2.shift());
        console.log("Reserve : ", reserve);
        carte1.src = "cartes/cardback.svg";
        carte2.src = "cartes/cardback.svg";
        player1click = false;
        player2click = false;
        reveler.classList.remove('disabled');
        devoiler.classList.remove('disabled');
        comparaison();
        break;

      default:
        alert("Erreur FATALE ! (Comment ta fait ça Billy ? Sérieusement ?)")
    }
  }
  nbrcart1.innerHTML = "Nombre de cartes : " + paquet1.length;
  nbrcart2.innerHTML = "Nombre de cartes : " + paquet2.length;
}
///////////////////////////////////////////////////////////////////////////////


////////////////////////////////Pose des Cartes////////////////////////////////
reveler.onclick = function() {
  let draw = paquet1.shift();
  player1card = draw;
  player1click = true;
  reveler.classList.add('disabled');
  reserve.push(player1card);
  carte1.src = draw['src'] + ".svg";
  carte1.alt = draw;

  if (paquet1.length === 0) {
    alert("Le Joueur 1 a remporté la partie");
  }
  comparaison();
}

devoiler.onclick = function() {
  let draw = paquet2.shift();
  player2card = draw;
  player2click = true;
  devoiler.classList.add('disabled');
  reserve.push(player2card);
  carte2.src = draw['src'] + ".svg";
  carte2.alt = draw;

  if (paquet2.length === 0) {
    alert("Le Joueur 2 a remporté la partie");
  }
  comparaison();
}
///////////////////////////////////////////////////////////////////////////////


////////////////////////////////Mélange du paquet//////////////////////////////
function distribution() {
  for (let i = 0; i <= 51; i++) {
    let max = reserve.length;
    let rand = getRandomInt(max);

    if (balance === true) {
      paquet1.push(obj[reserve[rand]]);
      balance = false;
    } else {
      paquet2.push(obj[reserve[rand]]);
      balance = true;
    }
    reserve.splice(rand, 1);
  }
  console.log("Cartes du joueur 1 : ", paquet1);
  console.log("Cartes du joueur 2 : ", paquet2);
  console.log("Reserve : ", reserve);
}
/////////////////////////////////////////////////////////////////////////////

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

///////////////////////////////////////////////////////////////////////////////






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
      console.log("Status de la requête JSON : Cartes", req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "js/cards.json", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    distribution();
    reveler.classList.remove('disabled');
    devoiler.classList.remove('disabled');
  }, 1000);
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
