<?php
include_once ('includes/garbage.php');
include_once ('includes/refresh.php');

$jeu = $_POST['jeu'];
$nom = $_POST['nom'];
$joueurs = array();

$_SESSION['lobby'] = $jeu.$nom; 

$check = $bdd->prepare("SELECT * FROM lobby WHERE nom = ?");
$check->execute(array($nom));
$checkresult = $check->fetchAll();
if (empty($checkresult)) {
    $ajout = $bdd->prepare("INSERT INTO lobby (joueurs,nom,jeu) VALUES (?,?,?)");
    $ajout->execute(array($joueurs, $nom, $jeu));
    if (true) {
        echo "oui";
    } else {
        echo "non";
      }
  } else {
  echo "exist";
}
?>
