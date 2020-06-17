var obj;
var balance = true;

window.onload = function() {
  document.getElementById('button').disabled = true;
  setInterval(function() {
    get();
    checkready();
  }, 1000);
}

function get() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      obj = req.responseText;
    }
  }
  req.open("POST", "php/test.php", true);
  req.send();
  setTimeout(function() {
    obj = JSON.parse(obj);
    switch (obj['game']) {
      case "bataille":
        document.getElementById('P1').innerHTML = "Joueur 1 : " + obj['J1'];
        document.getElementById('P2').innerHTML = "Joueur 2 : " + obj['J2'];
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
          document.getElementById('P3').remove();
          document.getElementById('P3Status').remove();
          document.getElementById('P4').remove();
          document.getElementById('P4Status').remove();
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
    if (req.responseText.includes("oui") == true) {
      document.location.href = "bataille.html";
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
  setTimeout(function() {
    if (req.responseText.includes("oui") == true) {
      document.getElementById('button').disabled = false;
    }
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
