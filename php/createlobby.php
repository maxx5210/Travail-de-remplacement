<?php
include_once ('includes/garbage.php');
include_once ('includes/refresh.php');

$jeu = $_POST['jeu'];
$nom = $_POST['nom'];

$check = $bdd->prepare("SELECT * FROM lobby WHERE nom = ?");
$check->execute(array($nom));
$checkresult = $check->fetchAll();
if (empty($checkresult)) {
    $ajout = $bdd->prepare("INSERT INTO lobby (nom,jeu) VALUES (?,?)");
    $ajout->execute(array($nom, $jeu));
    if (true) {
      $save = $bdd->prepare("SELECT id FROM lobby WHERE nom = ? AND jeu = ?");
      $save->execute(array($nom, $jeu));
      $saveres = $save->fetchAll();
      $_SESSION['gid'];
      echo "oui";
    } else {
        echo "non";
      }
  } else {
  echo "exist";
}
?>
