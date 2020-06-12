var paquet1 = [];
var paquet2 = [];
var paquet3 = [];
var paquet4 = [];
var obj;
var reserve = ["lettre_a", "lettre_a", "lettre_a", "lettre_a", "lettre_a", "lettre_a", "lettre_a", "lettre_a",
"lettre_a", "lettre_b", "lettre_b", "lettre_c", "lettre_c", "lettre_d", "lettre_d", "lettre_d", "lettre_e",
"lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e",
"lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_e", "lettre_f", "lettre_f", "lettre_g", "lettre_g",
"lettre_h", "lettre_h", "lettre_i", "lettre_i", "lettre_i", "lettre_i", "lettre_i", "lettre_i", "lettre_i",
"lettre_i", "lettre_j", "lettre_k", "lettre_l", "lettre_l", "lettre_l", "lettre_l", "lettre_l", "lettre_m",
"lettre_m", "lettre_m", "lettre_n", "lettre_n", "lettre_n", "lettre_n", "lettre_n", "lettre_n", "lettre_o",
"lettre_o", "lettre_o", "lettre_o", "lettre_o", "lettre_o", "lettre_p", "lettre_p", "lettre_q", "lettre_r",
"lettre_r", "lettre_r", "lettre_r", "lettre_r", "lettre_r", "lettre_s", "lettre_s", "lettre_s", "lettre_s",
"lettre_s", "lettre_s", "lettre_t", "lettre_t", "lettre_t", "lettre_t", "lettre_t", "lettre_t", "lettre_u",
"lettre_u", "lettre_u", "lettre_u", "lettre_u", "lettre_u", "lettre_v", "lettre_v", "lettre_w", "lettre_x",
"lettre_y", "lettre_z"];


window.onload = function() {
  getjson();
}


  //////////////////////////////////Initialisation////////////////////////////////
  function playstart() {
    for (let i = 0; i <= 6; i++) {
      melange(paquet1);
      melange(paquet2);
      melange(paquet3);
      melange(paquet4);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////Mélange////////////////////////////////////
  function melange(input) {
    let rand = getRandomInt();
    console.log("Début");
    console.log(reserve);
    console.log(paquet1);
    input.push(obj[reserve[rand]]);
    console.log("Fin");
    console.log(reserve);
    console.log(paquet1);
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
    req.open("POST", "js/scrabble.json", true);
    req.send();
    setTimeout(function() {
      obj = JSON.parse(obj);
      playstart();
    }, 1000);
  }
  ///////////////////////////////////////////////////////////////////////////////
