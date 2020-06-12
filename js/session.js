var obj;
var obj2;
window.onload = function() {
  document.getElementById('button').disabled = true;
  get();

  setInterval(function() {
    refresh();
  }, 1000);
}

function refresh() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      console.log(req.responseText);
      obj2 = req.responseText;
    }
  }
  req.open("POST", "php/bataille.php", true);
  req.send();
  setTimeout(function() {
    console.log("actu");
    if (obj2.includes("oui") == true) {
      document.getElementById('button').disabled = false;
    }
  }, 300);
}

function change(){
  document.getElementById('button').disabled = true;
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
    }
  }
  req.open("POST", "php/change.php", true);
  req.send();
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
    document.getElementById('players').innerHTML = obj;
  }, 1000);
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
