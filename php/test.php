<?php
//Sert à envoyer l'information des joueurs connecté dans la session depuis la base de donnée pour l'afficher dans le lobby.
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

if ($_SESSION['game'] == "bataille") {
  $player = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
  $player->execute(array($_SESSION['gid']));
  $playerrep = $player->fetchAll();

  foreach ($playerrep as $key => $value) {
    $tableau = array("game" => $_SESSION['game'], "J1" => $value["J1"], "J2" => $value["J2"], "J1Status" => $value["J1Status"], "J2Status" => $value["J2Status"]);
  }
}

echo json_encode($tableau);

?>
