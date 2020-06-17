"use strict";
///////////////////////////////////Variables///////////////////////////////////
var devoilerJ1 = document.getElementById('dos1');
var carte1 = document.getElementById('carte1');
var devoilerJ2 = document.getElementById('dos2');
var carte2 = document.getElementById('carte2');
var paquet1 = [];
var paquet2 = [];
var temp1 = 0;
var temp2 = 0;
var obj;
var rep;
var newcards;
var player1click;
var player2click;
var player1card;
var player2card;
var nbrcart1 = document.getElementById('cartpl1');
var nbrcart2 = document.getElementById('cartpl2');
var reserve = [];
///////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  getjson();
}

//////////////////////////////////Comparaison//////////////////////////////////
function comparaison() {
  if (player1click === true && player2click === true) {
    switch (true) {

      case player1card['valeur'] > player2card['valeur']:
        while (reserve.length > 0) {
          paquet1.push(reserve[0]);
          reserve.splice(0, 1);
        }

        newturn();
        break;

      case player1card['valeur'] < player2card['valeur']:

        while (reserve.length > 0) {
          paquet2.push(reserve[0]);
          reserve.splice(0, 1);
        }
        newturn();
        break;

      case player1card['valeur'] === player2card['valeur']:
        console.log("Bataille !");
        reserve.push(paquet1.shift(), paquet2.shift());
        devoilerJ1.classList.remove('disabled');
        devoilerJ2.classList.remove('disabled');
        player1click = false;
        player2click = false;
        carte1.src = "cartes/cardback.svg";
        carte2.src = "cartes/cardback.svg";
        if (rep['status'] == "oui") {
          devoilerJ1.classList.remove('disabled');
        } else if (rep['status'] == "non") {
          devoilerJ2.classList.remove('disabled');
        }
        temp1 = 0;
        temp2 = 0;
        turn();
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


//////////////////////////////////Nouveau Tour//////////////////////////////////
function newturn() {
  setTimeout(function() {
    if (rep['status'] == "oui") {
      devoilerJ1.classList.remove('disabled');
    } else if (rep['status'] == "non") {
      devoilerJ2.classList.remove('disabled');
    }
    temp1 = 0;
    temp2 = 0;
    player1click = false;
    player2click = false;
    carte1.src = "cartes/nothing.svg";
    carte2.src = "cartes/nothing.svg";
    turn();
  }, 1000);
}
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////Pose des Cartes////////////////////////////////
devoilerJ1.onclick = function() {
  if (temp1 == 0) {
    if (rep['status'] == "oui") {
      playcard();
    }
    temp1 = 1
    let draw = paquet1.shift();
    player1card = draw;
    player1click = true;
    devoilerJ1.classList.add('disabled');
    reserve.push(player1card);
    carte1.src = "cartes/" + draw['src'] + ".svg";
    carte1.alt = draw['src'];

    if (paquet1.length === 0) {
      alert("Le Joueur 1 a remporté la partie");
    }
    comparaison();
  }
}

devoilerJ2.onclick = function() {
  if (temp2 == 0) {
    if (rep['status'] == "non") {
      playcard();
    }
    temp2 = 1

    let draw = paquet2.shift();
    player2card = draw;
    player2click = true;
    devoilerJ2.classList.add('disabled');
    reserve.push(player2card);
    carte2.src = "cartes/" + draw['src'] + ".svg";
    carte2.alt = draw['src'];
    if (paquet2.length === 0) {
      alert("Le Joueur 2 a remporté la partie");
    }
    comparaison();
  }
}
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////Distribution//////////////////////////////////
function distribution(input1, input2) { //Input 1 correspond au paquet que l'on veut remplir, celui du joueur 1 ou du joueur 2
  while (input2.length > 0) {
    reserve.push(input2[0]);
    input2.splice(0, 1); //Input 2 est le paquet php qui lui est associé, paquet 1 avec jeu 1 et paquet 2 avec le jeu 2
  }
  for (var i = 0; i < 26; i++) {
    input1.push(obj[reserve[0]]);
    reserve.splice(0, 1);
  }
}
////////////////////////////////////////////////////////////////////////////////


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
      console.log("Status de la requête JSON : Cartes ", req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "js/cards.json", true);
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
      console.log("Status de la requête PHP Prepare : ", req.status);
    }
  }
  req.open("POST", "php/bataille/preparebataille.php", true);
  req.send();
  setTimeout(function() {
    rep = JSON.parse(req.responseText);

    melange();

    document.getElementById('name1').innerHTML = rep['J1'];
    document.getElementById('name2').innerHTML = rep['J2'];

    if (rep['status'] == "oui") {

      devoilerJ1.classList.remove('disabled');
    } else if (rep['status'] == "non") {
      devoilerJ2.classList.remove('disabled');
    }
  }, 500);
}
///////////////////////////////////////////////////////////////////////////////

function melange() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP melange : ", req.status);
    }
  }
  req.open("POST", "php/bataille/melange.php", true);
  req.send();
  setTimeout(function() {
    givecards();
  }, 500);
}

function givecards() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP givecards : ", req.status);
    }
  }
  req.open("POST", "php/bataille/givecards.php", true);
  req.send();
  setTimeout(function() {
    newcards = JSON.parse(req.responseText);
    console.log(newcards);
    distribution(paquet1, newcards['paquet1']);
    distribution(paquet2, newcards['paquet2']);

    setInterval(function() {
      bataille();
    }, 1000);
  }, 300);
}

function playcard() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP : Playcard ", req.status);
    }
  }
  req.open("POST", "php/bataille/playcard.php", true);
  req.send();
}

function bataille() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête JSON : Bataille ", req.status);
    }
  }
  req.open("POST", "php/bataille/bataille.php", true);
  req.send();
  setTimeout(function() {
    if (req.responseText.includes("J1") == true) {
      devoilerJ1.click();
    } else if (req.responseText.includes("J2") == true) {
      devoilerJ2.click();
    }
  }, 300);
}

function turn() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log("Status de la requête PHP : turn ", req.status);
    }
  }
  req.open("POST", "php/bataille/newturn.php", true);
  req.send();
}
