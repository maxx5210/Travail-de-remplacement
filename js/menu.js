var obj;
var gameid;

window.onload = function() {
  afficher();
}

function menu() {
  document.getElementById('creation').classList.remove('hidden');
}

function create() {
  let jeu = document.getElementById('select').value;
  let nom = document.getElementById('nom').value;
  if (jeu == "") {
    alert("Séléctionnez un jeu");
  } else if (nom == "") {
    alert("Rentrez un nom");
  } else {
    lobby(jeu, nom);
  }
}

function lobby(jeu, nom) {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      console.log(req.responseText);
    }
  }
  req.open("POST", "php/createlobby.php", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send("jeu=" + jeu + "&nom=" + nom);
  setTimeout(function() {
    if (req.responseText.includes("oui") == true) {
      alert("Salle crée");
      document.location.href = "session.html";
    } else if (req.responseText.includes("exist") == true) {
      alert("Une salle avec le même nom existe déjà");
    } else {
      alert("Erreur fatale !");
    }
  }, 500);
}

function list() {
  gameid = event.target.value;
  console.log(gameid);
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      console.log(req.respondetext);
    }
  }
  req.open("POST", "php/joingame.php", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send("gameid=" + gameid);
  setTimeout(function() {
    if (req.responseText.includes("oui") == true) {
      alert("dfnsdjkfs");
      document.location.href = "session.html";
    } else {
      alert("Erreur de merde !!!!!!!");
    }
  }, 500);
}

function afficher() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      obj = req.responseText;
      console.log(obj);
    }
  }
  req.open("POST", "php/showlobby.php", true);
  req.send();
  setTimeout(function() {
    document.getElementById('lobbys').innerHTML = req.responseText;
  }, 500);
}

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

function deconnexion() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      console.log(req.responseText);
    }
  }
  req.open("POST", "php/deconnexion.php", true);
  req.send();
  setTimeout(function() {
    alert("Vous êtes deconnectés")
    window.sessionStorage.clear();
    document.location.href = "index.html";
  }, 1000);
}
