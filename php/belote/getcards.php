<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$getcartes = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$getcartes->execute(array($_SESSION['gid']));
$reponse = $getcartes->fetchAll();

foreach ($reponse as $key => $value) {
  $paquet1 = explode(",", $value['J1Paquet']);
  $paquet2 = explode(",", $value['J2Paquet']);
  $paquet3 = explode(",", $value['J3Paquet']);
  $paquet4 = explode(",", $value['J4Paquet']);
  $reserve = explode(",", $value['reserve']);
}

$tableau = array('paquet1' => $paquet1, 'paquet2' => $paquet2, 'paquet3' => $paquet3, 'paquet4' => $paquet4, 'reserve' => $reserve);


echo json_encode($tableau);
?>
