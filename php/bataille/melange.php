<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$checkp1 = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$checkp1->execute(array($_SESSION['gid']));
$reponse = $checkp1->fetchAll();

$reserve = array(0 =>"1clubs", "1diamonds", "1hearts", "1spades", "2clubs", "2diamonds", "2hearts", "2spades", "3clubs", "3diamonds", "3hearts", "3spades",
  "4clubs", "4diamonds", "4hearts", "4spades", "5clubs", "5diamonds", "5hearts", "5spades", "6clubs", "6diamonds", "6hearts", "6spades",
  "7clubs", "7diamonds", "7hearts", "7spades", "8clubs", "8diamonds", "8hearts", "8spades", "9clubs", "9diamonds", "9hearts", "9spades",
  "10clubs", "10diamonds", "10hearts", "10spades", "Jackclubs", "Jackdiamonds", "Jackhearts", "Jackspades",
  "Queenclubs", "Queendiamonds", "Queenhearts", "Queenspades", "Kingclubs", "Kingdiamonds", "Kinghearts", "Kingspades");

$paquet1 = [];
$paquet2 = [];

foreach ($reponse as $key => $value) {
  if ($value['J1'] == $_SESSION['user']) {
    melange($reserve);
  }
}

function melange($reserve) {
  for ($i = 0 ; $i <= 25; $i++) {
    $rand = rand(0, count($reserve)-1);
    echo $rand." ";
    $paquet1[] = $reserve[$rand];
    array_splice($reserve, $rand, 1);

    $rand2 = rand(0, count($reserve)-1);
    echo $rand2." ";
    $paquet2[] = $reserve[$rand2];
    array_splice($reserve, $rand2, 1);
  }
  $ins = $GLOBALS['bdd']->prepare("UPDATE bataille SET J1Paquet = ? WHERE idB = ?");
  $ins->execute(array(implode(",", $paquet1) ,$_SESSION['gid']));

  $ins2 = $GLOBALS['bdd']->prepare("UPDATE bataille SET J2Paquet = ? WHERE idB = ?");
  $ins2->execute(array(implode(",", $paquet2) ,$_SESSION['gid']));
}
?>
