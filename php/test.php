<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$player = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$player->execute(array($_SESSION['gid']));
$playerrep = $player->fetchAll();

foreach ($playerrep as $key => $value) {
  echo "Joueur 1 : ".$value['J1'];
  echo "<br>";
  echo "Joueur 2 : ".$value['J2'];
}
?>
