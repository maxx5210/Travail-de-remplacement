<?php
//Sert à envoyer l'information des joueurs connecté dans la session depuis la base de donnée pour l'afficher dans le lobby.
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

switch ($_SESSION['game']) {
  case 'bataille':
  $player = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
  $player->execute(array($_SESSION['gid']));
  $playerrep = $player->fetchAll();

  foreach ($playerrep as $key => $value) {
    $tableau = array("game" => $_SESSION['game'], "J1" => $value["J1"], "J2" => $value["J2"], "J1Status" => $value["J1Status"], "J2Status" => $value["J2Status"]);
  }
  break;

  case 'belote':
  $player = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
  $player->execute(array($_SESSION['gid']));
  $playerrep = $player->fetchAll();

  foreach ($playerrep as $key => $value) {
    $tableau = array(
      "game" => $_SESSION['game'], "J1" => $value["J1"], "J2" => $value["J2"], "J3" => $value["J3"], "J4" => $value["J4"],
     "J1Status" => $value["J1Status"], "J2Status" => $value["J2Status"], "J3Status" => $value["J3Status"], "J4Status" => $value["J4Status"]
   );
  }

  default:
  // code...
  break;
}

echo json_encode($tableau);
?>
