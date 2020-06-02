"use strict";
///////////////////////////////////Variables///////////////////////////////////
var reveler = document.getElementById('dos1');
var carte1 = document.getElementById('carte1');
var devoiler = document.getElementById('dos2');
var carte2 = document.getElementById('carte2');
var paquet1 = [];
var paquet2 = [];
var balance = true;
var reserve = ["1clubs", "1diamonds", "1hearts", "1spades", "2clubs", "2diamonds", "2hearts", "2spades", "3clubs", "3diamonds", "3hearts", "3spades",
  "4clubs", "4diamonds", "4hearts", "4spades", "5clubs", "5diamonds", "5hearts", "5spades", "6clubs", "6diamonds", "6hearts", "6spades",
  "7clubs", "7diamonds", "7hearts", "7spades", "8clubs", "8diamonds", "8hearts", "8spades", "9clubs", "9diamonds", "9hearts", "9spades",
  "10clubs", "10diamonds", "10hearts", "10spades", "Jackclubs", "Jackdiamonds", "Jackhearts", "Jackspades",
  "Queenclubs", "Queendiamonds", "Queenhearts", "Queenspades", "Kingclubs", "Kingdiamonds", "Kinghearts", "Kingspades"
];
///////////////////////////////////////////////////////////////////////////////


window.onload = function() {
  ////////////////////////////////Mélange du paquet//////////////////////////////
  for (var i = 0; i <= (reserve.length - 1); i++) {
    let max = reserve.length;
    let rand = getRandomInt(max);

    if (balance === true) {
      paquet1.push(reserve[rand]);
      balance = false;
    } else {
      paquet2.push(reserve[rand]);
      balance = true;
    }
    reserve.splice(rand, 1);
  }
  console.log(paquet1, paquet2, reserve);
  ///////////////////////////////////////////////////////////////////////////////
}


////////////////////////////////////Fonctions//////////////////////////////////
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

reveler.onclick = function() {
  var draw = paquet1.shift();
  console.log(draw);
  carte1.src = "cartes/" + draw + ".svg";
  carte1.alt = draw;
  console.log(carte1);
}

devoiler.onclick = function() {
  var draw = paquet2.shift();
  console.log(draw);
  carte2.src = "cartes/" + draw + ".svg";
  carte2.alt = draw;
  console.log(carte2);
}
///////////////////////////////////////////////////////////////////////////////
