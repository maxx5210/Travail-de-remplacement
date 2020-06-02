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
  window.sessionStorage.clear();
  document.location.href = "index.html"
}

window.onload = function() {
  document.getElementById('connecte').innerHTML = "Vous êtes connecté en tant que " + window.sessionStorage.getItem('name');
}
