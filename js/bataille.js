window.onload = function() {

  //Fonction qui permet de révéler la carte du dos du paquet de chaque joueur et de la placer à son emplacement
  var reveler = document.getElementById('dos1');
  var carte1 = document.getElementById('carte1');
  reveler.onclick = function() {
    console.log("Carte du joueur 1");
    carte1.src = "cartes/Jackhearts.svg";

  }

  //Fonction qui permet de révéler la carte du dos du paquet de chaque joueur et de la placer à son emplacement
  var devoiler = document.getElementById('dos2');
  var carte2 = document.getElementById('carte2')
  devoiler.onclick = function() {
    console.log("Carte du joueur 2");
    carte2.src = "cartes/8spades.svg";
  }









}
