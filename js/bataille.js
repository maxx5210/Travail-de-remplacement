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


//////////////////////////////////Comparaison//////////////////////////////////
function comparaison() {
  console.log(reserve);
  var triche = getComputedStyle(reveler, null).zIndex;

  if (player1click === true && player2click === true) {
    console.log(reserve);
    switch (true) {

      case player1card['valeur'] > player2card['valeur']:
      console.log(reserve);
        while (reserve.length > 0) {
          console.log(reserve);
          melange(paquet1);
          console.log(reserve);
        }
        newturn();
        break;

      case player1card['valeur'] < player2card['valeur']:
      console.log(reserve);
        while (reserve.length > 0) {
          console.log(reserve);
          melange(paquet2);
          console.log(reserve);
        }
        newturn();
        break;

      case player1card['valeur'] === player2card['valeur']:
        console.log("Bataille !");
        reserve.push(paquet1.shift(), paquet2.shift());
        reveler.classList.remove('disabled');
        devoiler.classList.remove('disabled');
        player1click = false;
        player2click = false;
        carte1.src = "cartes/cardback.svg";
        carte2.src = "cartes/cardback.svg";
        comparaison();
        break;

      default:
        alert("Erreur FATALE ! (Comment ta fait ça Billy ? Sérieusement ?)")
    }
  }
  console.log(reserve);
  nbrcart1.innerHTML = "Nombre de cartes : " + paquet1.length;
  nbrcart2.innerHTML = "Nombre de cartes : " + paquet2.length;
  console.log(reserve);
}
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////////Nouveau Tour//////////////////////////////////
function newturn() {
  player1click = false;
  player2click = false;
  setTimeout(function() {
    carte1.src = "cartes/nothing.svg";
    carte2.src = "cartes/nothing.svg";
    reveler.classList.remove('disabled');
    devoiler.classList.remove('disabled');
  }, 1000);
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////Pose des Cartes////////////////////////////////
reveler.onclick = function() {
  let draw = paquet1.shift();
  player1card = draw;
  player1click = true;
  reveler.classList.add('disabled');
  reserve.push(player1card);
  carte1.src = "cartes/" + draw['src'] + ".svg";
  carte1.alt = draw['src'];

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
  carte2.src = "cartes/" + draw['src'] + ".svg";
  carte2.alt = draw['src'];

  if (paquet2.length === 0) {
    alert("Le Joueur 2 a remporté la partie");
  }
  console.log(reserve);
  comparaison();
}
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////////Initialisation////////////////////////////////
function playstart() {
  for (let i = 0; i <= 25; i++) {
    melange(paquet1);
    melange(paquet2);
  }
}
///////////////////////////////////////////////////////////////////////////////


////////////////////////////////////Mélange////////////////////////////////////
function melange(input) {
  let rand = getRandomInt();
  input.push(obj[reserve[rand]]);
  reserve.splice(rand, 1);
}
///////////////////////////////////////////////////////////////////////////////


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
  req.open("POST", "js/cards.json", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    playstart();
    reveler.classList.remove('disabled');
    devoiler.classList.remove('disabled');
  }, 1000);
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
