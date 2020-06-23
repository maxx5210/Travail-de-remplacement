<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

switch ($_SESSION["game"]) {
  case 'belote':
  $teams = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
  $teams->execute(array($_SESSION['gid']));
  $reponse = $teams->fetchAll();

  foreach ($reponse as $key => $value) {
    $tableau = array("user" => $_SESSION['user'], "team1" => $value['team1'], "team2" => $value['team2'], "game" => $_SESSION['game']);
  }
  break;

  case 'bataille':
  $tableau = array("game" => $_SESSION['game']);
  break;

  default:
  // code...
  break;
}

echo json_encode($tableau);

?>
