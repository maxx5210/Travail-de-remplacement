var obj;
var player;
var balance = true;
var team;
var team1ul = document.getElementById("team1");
var team2ul = document.getElementById("team2");
var team1 = [];
var team2 = [];
var result = document.getElementById("result");
var ready = false;
var p1status = document.getElementById('P1Status');
var p2status = document.getElementById('P2Status');
var p3status = document.getElementById('P3Status');
var p4status = document.getElementById('P4Status');
var p1 = document.getElementById('P1');
var p2 = document.getElementById('P2');
var p3 = document.getElementById('P3');
var p4 = document.getElementById('P4');

window.onload = function() {
  setInterval(function() {
    get();
    status();
  }, 500);
}

function teams() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
    }
  }
  team = event.target.value;
  console.log(team);
  req.open("POST", "php/teams.php", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send("team=" + team);
  setTimeout(function() {
    if (req.responseText.includes("joined") == true) {
      alert("Tu es déjà dans cette équipe");
    }
    if (ready == true) {
      toggleready();
    }
  }, 200);
}

function get() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
    }
  }
  req.open("POST", "php/test.php", true);
  req.send();
  setTimeout(function() {
    player = JSON.parse(req.responseText);
    if (player['game'] == "belote") {
      team1 = player['team1'].split(",");
      team2 = player['team2'].split(",");

      team1ul.innerHTML = team1;
      team2ul.innerHTML = team2;
    }
  }, 200);
}


function status() {
  checkready();
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "php/status.php", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    switch (obj['game']) {
      case "bataille":
        if (obj["J1Status"] == "1") {
          p1status.innerHTML = "Prêt";
          p1status.style.color = "green";
          p1status.style.border = "1px solid green";
        } else {
          p1status.innerHTML = "Pas prêt";
          p1status.style.color = "red";
          p1status.style.border = "1px solid red";
        }
        if (obj["J2Status"] == "1") {
          p2status.innerHTML = "Prêt";
          p2status.style.color = "green";
          p2status.style.border = "1px solid green";
        } else {
          p2status.innerHTML = "Pas prêt";
          p2status.style.color = "red";
          p2status.style.border = "1px solid red";
        }
        if (balance == true) {
          p1.innerHTML = "Joueur 1 : " + obj['J1'];
          p2.innerHTML = "Joueur 2 : " + obj['J2'];
          p3.remove();
          p3status.remove();
          p4.remove();
          p4status.remove();
          balance = false;
        }
        break;

      case 'belote':
        if (obj["J1Status"] == "1") {
          p1status.innerHTML = "Prêt";
          p1status.style.color = "green";
          p1status.style.border = "1px solid green";
        } else {
          p1status.innerHTML = "Pas prêt";
          p1status.style.color = "red";
          p1status.style.border = "1px solid red";
        }
        if (obj["J2Status"] == "1") {
          p2status.innerHTML = "Prêt";
          p2status.style.color = "green";
          p2status.style.border = "1px solid green";
        } else {
          p2status.innerHTML = "Pas prêt";
          p2status.style.color = "red";
          p2status.style.border = "1px solid red";
        }
        if (obj["J3Status"] == "1") {
          p3status.innerHTML = "Prêt";
          p3status.style.color = "green";
          p3status.style.border = "1px solid green";
        } else {
          p3status.innerHTML = "Pas prêt";
          p3status.style.color = "red";
          p3status.style.border = "1px solid red";
        }
        if (obj["J4Status"] == "1") {
          p4status.innerHTML = "Prêt";
          p4status.style.color = "green";
          p4status.style.border = "1px solid green";
        } else {
          p4status.innerHTML = "Pas prêt";
          p4status.style.color = "red";
          p4status.style.border = "1px solid red";
        }
        p1.innerHTML = "Joueur 1 : " + obj['J1'];
        p2.innerHTML = "Joueur 2 : " + obj['J2'];
        p3.innerHTML = "Joueur 3 : " + obj['J3'];
        p4.innerHTML = "Joueur 4 : " + obj['J4'];
        if (balance == true) {
          document.getElementById("teams").classList.remove("hidden");
          balance = false;
        }
        break;

      default:
        break;
    }
  }, 500);
}


function checkready() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
    }
  }
  req.open("POST", "php/checkready.php", true);
  req.send();
  setTimeout(function() {
    switch (true) {
      case req.responseText.includes("bataille") == true:
        document.location.href = "bataille.html";
        break;

      case req.responseText.includes("belote") == true:
        document.location.href = "belote.html";
        break;

      default:

    }
  }, 500);
}

function toggleready() {
  checkready();
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
    }
  }
  if (ready == true) {
    ready = false;
  } else {
    ready = true;
  }
  req.open("POST", "php/toggleready.php", true);
  req.send();
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
