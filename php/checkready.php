<?php
//Verifie le status des joueurs (Prêt/Pas prêt)
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

switch ($_SESSION["game"]) {
  case 'bataille':
  $change = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
  $change->execute(array($_SESSION['gid']));
  $changeres = $change->fetchAll();

  foreach ($changeres as $key => $value) {

    if ($value["J1Status"] == "1" && $value["J2Status"] == "1") {
      echo "bataille";
    } else {
      echo "non";
    }
  }
  break;

  case 'belote':
  $change = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
  $change->execute(array($_SESSION['gid']));
  $changeres = $change->fetchAll();

  foreach ($changeres as $key => $value) {
    $a = explode(",", $value['team1']);
    $b = explode(",", $value['team2']);

    if ($value["J1Status"] == "1" && $value["J2Status"] == "1" && $value["J3Status"] == "1" && $value["J4Status"] == "1" ) {
      if (count($a) == count($b) && count($a) > 0 && count($b) > 0) {
        echo "belote";
      }
    } else {
      echo "non";
    }
  }
  break;

  default:
  // code...
  break;
}
?>
