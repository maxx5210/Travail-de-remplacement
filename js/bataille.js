"use strict";
///////////////////////////////////Variables///////////////////////////////////
var reveler = document.getElementById('dos1');
var carte1 = document.getElementById('carte1');
var devoiler = document.getElementById('dos2');
var carte2 = document.getElementById('carte2');
var paquet1 = [];
var paquet2 = [];
var balance = true;
var obj;
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

////////////////////////////////Mélange du paquet////////////////////////////
function distribution() {
  for (var i = 0; i <= (reserve.length - 1); i++) {
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
  console.log(paquet1, paquet2, reserve);
}
/////////////////////////////////////////////////////////////////////////////

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

reveler.onclick = function() {
  var draw = paquet1.shift();
  carte1.src = draw['src'] + ".svg";
  carte1.alt = draw;

  ////////////////////////Détection Victoire et Défaite////////////////////////
  if (paquet1.length === 0) {
    alert("Le Joueur 1 a remporté la partie");
  }
  /////////////////////////////////////////////////////////////////////////////
}

devoiler.onclick = function() {
  var draw = paquet2.shift();
  carte2.src = draw['src'] + ".svg";
  carte2.alt = draw;

  ////////////////////////Détection Victoire et Défaite////////////////////////
  if (paquet2.length === 0) {
    alert("Le Joueur 2 a remporté la partie");
  }
  /////////////////////////////////////////////////////////////////////////////
}
///////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////AJAX//////////////////////////////////////

/////////////////////////////////Http Request/////////////////////////////////
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
      console.log(req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "js/cards.json", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    distribution();
  }, 1000);
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
