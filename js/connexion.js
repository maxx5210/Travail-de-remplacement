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

function connexion() {
    var req = createHttpRequest();
    req.onreadystatechange = function () {
        if (req.status == 200) {
            console.log(req.status);
            console.log(req.responseText);
        }
    }
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;
    req.open("POST", "php/login.php", true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send("user=" + user + "&pass=" + pass);
    setTimeout(function () {
        console.log(req.responseText.includes("oui"));
        if (req.responseText.includes("oui") == true) {
            console.log("retour");
            alert("Connecté !");
            document.location.href = "menu.html";
        } else {
            console.log("echec");
            alert("Echec de la connexion");
        }
    }, 500);
}
