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

function register() {
  user = document.getElementById("user").value;
  email = document.getElementById("mail").value;
  pass1 = document.getElementById("pass1").value;
  pass2 = document.getElementById("pass2").value;
  user = user.trim();
  email = email.trim();
  pass1 = pass1.trim();
  pass2 = pass2.trim();
  console.log("inscrpition");
  if (user == "" || email == "" || pass1 == "" || pass2 == "") {
    alert("Certains champs sont vides");
  } else if (pass1 !== pass2) {
    alert("Les mots de passe ne sont pas identiques");
  } else if (email.includes("@") === false || email.includes(".") === false) {
    alert("Adresse mail incorrecte !")
  } else {
    send();
  }
}

function send() {
  var req = createHttpRequest();
  req.onreadystatechange = function() {
    if (req.status == 200) {
      console.log(req.status);
      console.log(req.responseText);
    }
  }
  req.open("POST", "php/register.php", true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send("user=" + user + "&mail=" + email + "&pass=" + pass1);
  setTimeout(function() {
    console.log(req.responseText.includes("oui"));
    if (req.responseText.includes("oui") == true) {
      console.log("retour");
      alert("Inscription réussie !");
      document.location.href = "index.html";
    } else {
      console.log("echec");
      alert("Utilisateur existant !");
    }
  }, 1000);
}
