<?php
//Verifie le status des joueurs (Prêt/Pas prêt)
include_once('includes/garbage.php');
include_once('includes/refresh.php');

switch ($_SESSION["game"]) {
  case 'bataille':

  $change = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
  $change->execute(array($_SESSION['gid']));
  $changeres = $change->fetchAll();

  foreach ($changeres as $key => $value) {
    if ($value["J1"] == $_SESSION['user']) {
      if ($value["J1Status"] == "1" && $value["J2Status"] == "1") {
        echo "oui";
      } else {
        echo "non";
      }
    }
  }
    break;

  default:
    // code...
    break;
}
?>
