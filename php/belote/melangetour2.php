<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$checkp1 = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$checkp1->execute(array($_SESSION['gid']));
$reponse = $checkp1->fetchAll();

foreach ($reponse as $key => $value) {
  $reserve = explode(",", $value['reserve']);
  $paquet1 = explode(",", $value['paquet1']);
  $pasuet2 = explode(",", $value['paquet2']);
  $paquet3 = explode(",", $value['paquet3']);
  $paquet4 = explode(",", $value['paquet4']);
}

function melange($reserve){
  for ($j=0; $j < 3; $j++) {
    $rand = rand(0, count($reserve)-1);
    echo $rand."";
    $paquet1[] = $reserve[$rand];
    array_splice($reserve, $rand, 1);
  }
  for ($j=0; $j < 3; $j++) {
    $rand = rand(0, count($reserve)-1);
    echo $rand."";
    $paquet2[] = $reserve[$rand];
    array_splice($reserve, $rand, 1);
  }
  for ($j=0; $j < 3; $j++) {
    $rand = rand(0, count($reserve)-1);
    echo $rand."";
    $paquet3[] = $reserve[$rand];
    array_splice($reserve, $rand, 1);
  }
  for ($j=0; $j < 3; $j++) {
    $rand = rand(0, count($reserve)-1);
    echo $rand."";
    $paquet4[] = $reserve[$rand];
    array_splice($reserve, $rand, 1);
  }
}

 ?>
