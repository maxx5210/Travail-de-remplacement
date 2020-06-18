var paquet1 = [];
var paquet2 = [];
var paquet3 = [];
var paquet4 = [];
var centre = document.getElementById('centre');
var mel = 3;
var obj;
var reserve = ["7clubs","8clubs","9clubs","10clubs","Jackclubs","Queenclubs","Kingclubs",
  "7hearts","8hearts","9hearts","10hearts","Jackhearts","Queenhearts","Kinghearts",
  "7spades","8spades","9spades","10spades","Jackspades","Queenspades","Kingspades",
  "7clubs","8clubs","9clubs","10clubs","Jackclubs","Queenclubs","Kingclubs"
];

window.onload = function() {
  getjson();
}


  /////////////////////////////////Initialisation///////////////////////////////
  function playstart() {
    melange(paquet1);
    melange(paquet2);
    melange(paquet3);
    melange(paquet4);
    mel = 2;
    election();
  }
  //////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////Mélange///////////////////////////////////
  function melange(input) {
    for (let i = 0; i < mel; i++) {
      let rand = getRandomInt();
      input.push(obj[reserve[rand]]);
      reserve.splice(rand, 1);
    }
  }
  //////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////1er Tour///////////////////////////////////
  function election() {
    centre.push(reserve[0]);
    document.getElementById('prendre').onclick = function () {
      paquet1.push(centre[rand]);
      centre.splice(rand, 1);
    }
  }
  //////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////2e Tour///////////////////////////////////
  function choix() {

  }
  /////////////////////////////////////////////////////////////////////////////

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
      playstart();
    }, 1000);
  }
  ///////////////////////////////////////////////////////////////////////////////
