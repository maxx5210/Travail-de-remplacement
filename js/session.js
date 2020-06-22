var obj;
var player;
var balance = true;
var team;
var team1ul = document.getElementById("team1");
var team2ul = document.getElementById("team2");
var team1 = [];
var team2 = [];
var result = document.getElementById("result");

window.onload = function() {
  get();
  setInterval(function() {
    status();
  }, 1000);
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
          document.getElementById('P1Status').innerHTML = "Prêt";
          document.getElementById('P1Status').style.color = "green";
          document.getElementById('P1Status').style.border = "1px solid green";
        } else {
          document.getElementById('P1Status').innerHTML = "Pas prêt";
          document.getElementById('P1Status').style.color = "red";
          document.getElementById('P1Status').style.border = "1px solid red";
        }
        if (obj["J2Status"] == "1") {
          document.getElementById('P2Status').innerHTML = "Prêt";
          document.getElementById('P2Status').style.color = "green";
          document.getElementById('P2Status').style.border = "1px solid green";
        } else {
          document.getElementById('P2Status').innerHTML = "Pas prêt";
          document.getElementById('P2Status').style.color = "red";
          document.getElementById('P2Status').style.border = "1px solid red";
        }
        if (balance == true) {
          document.getElementById('P1').innerHTML = "Joueur 1 : " + obj['J1'];
          document.getElementById('P2').innerHTML = "Joueur 2 : " + obj['J2'];
          document.getElementById('P3').remove();
          document.getElementById('P3Status').remove();
          document.getElementById('P4').remove();
          document.getElementById('P4Status').remove();
          balance = false;
        }
        break;

      case 'belote':
        if (obj["J1Status"] == "1") {
          document.getElementById('P1Status').innerHTML = "Prêt";
          document.getElementById('P1Status').style.color = "green";
          document.getElementById('P1Status').style.border = "1px solid green";
        } else {
          document.getElementById('P1Status').innerHTML = "Pas prêt";
          document.getElementById('P1Status').style.color = "red";
          document.getElementById('P1Status').style.border = "1px solid red";
        }
        if (obj["J2Status"] == "1") {
          document.getElementById('P2Status').innerHTML = "Prêt";
          document.getElementById('P2Status').style.color = "green";
          document.getElementById('P2Status').style.border = "1px solid green";
        } else {
          document.getElementById('P2Status').innerHTML = "Pas prêt";
          document.getElementById('P2Status').style.color = "red";
          document.getElementById('P2Status').style.border = "1px solid red";
        }
        if (obj["J3Status"] == "1") {
          document.getElementById('P3Status').innerHTML = "Prêt";
          document.getElementById('P3Status').style.color = "green";
          document.getElementById('P3Status').style.border = "1px solid green";
        } else {
          document.getElementById('P3Status').innerHTML = "Pas prêt";
          document.getElementById('P3Status').style.color = "red";
          document.getElementById('P3Status').style.border = "1px solid red";
        }
        if (obj["J4Status"] == "1") {
          document.getElementById('P4Status').innerHTML = "Prêt";
          document.getElementById('P4Status').style.color = "green";
          document.getElementById('P4Status').style.border = "1px solid green";
        } else {
          document.getElementById('P4Status').innerHTML = "Pas prêt";
          document.getElementById('P4Status').style.color = "red";
          document.getElementById('P4Status').style.border = "1px solid red";
        }
        if (balance == true) {
          document.getElementById('P1').innerHTML = "Joueur 1 : " + obj['J1'];
          document.getElementById('P2').innerHTML = "Joueur 2 : " + obj['J2'];
          document.getElementById('P3').innerHTML = "Joueur 3 : " + obj['J3'];
          document.getElementById('P4').innerHTML = "Joueur 4 : " + obj['J4'];
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
        if (document.getElementById("team1").childElementCount !== document.getElementById("team2").childElementCount) {
          result.innherHTML = "Les équipes ne sont pas équilibrées";
        }
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
