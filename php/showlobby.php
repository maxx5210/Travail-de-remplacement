<?php
include_once('includes/config.php');
include_once('includes/refresh.php');
include_once('includes/garbage.php');

$games = $bdd->prepare("SELECT * FROM lobby");
$games->execute();
$gamesrep = $games->fetchAll();

echo "<table>";
foreach ($gamesrep as $key => $value) {

}

echo "</table>";
?>
