<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$team = $_POST['team'];
$_SESSION['team'] = $team;

switch ($_SESSION['game']) {
  case 'belote':
  $select = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
  $select->execute(array($_SESSION['gid']));
  $reponse = $select->fetchAll();

  foreach ($reponse as $key => $value) {
    if ($_SESSION['team'] == "team1") {
      $a = explode(",", $value['team1']);
    } else {
      // code...
    }
  }
  break;

  default:
  // code...
  break;
}
?>
