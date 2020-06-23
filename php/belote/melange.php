<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$checkp1 = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$checkp1->execute(array($_SESSION['gid']));
$reponse = $checkp1->fetchAll();

$reserve = array(0 =>"7clubs", "8clubs", "9clubs", "10clubs", "Jackclubs", "Queenclubs", "Kingclubs",
"7hearts", "8hearts", "9hearts", "10hearts", "Jackhearts", "Queenhearts", "Kinghearts",
"7spades", "8spades", "9spades", "10spades", "Jackspades", "Queenspades", "Kingspades",
"7diamonds", "8diamonds", "9diamonds", "10diamonds", "Jackdiamonds", "Queendiamonds", "Kingdiamonds"
);

$paquet1 =[];
$paquet2 =[];
$paquet3 =[];
$paquet4 =[];

foreach ($reponse as $key => $value) {
  if ($value['J1'] == $_SESSION['user']) {
    melange($reserve);
  }
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

  $ins = $GLOBALS['bdd']->prepare("UPDATE belote SET J1Paquet = ? WHERE idB = ?");
  $ins->execute(array(implode(",", $paquet1) ,$_SESSION['gid']));

  $ins2 = $GLOBALS['bdd']->prepare("UPDATE belote SET J2Paquet = ? WHERE idB = ?");
  $ins2->execute(array(implode(",", $paquet2) ,$_SESSION['gid']));

  $ins3 = $GLOBALS['bdd']->prepare("UPDATE belote SET J3Paquet = ? WHERE idB = ?");
  $ins3->execute(array(implode(",", $paquet3) ,$_SESSION['gid']));

  $ins4 = $GLOBALS['bdd']->prepare("UPDATE belote SET J4Paquet = ? WHERE idB = ?");
  $ins4->execute(array(implode(",", $paquet4) ,$_SESSION['gid']));

  $insr = $GLOBALS['bdd']->prepare("UPDATE belote SET reserve = ? WHERE idB = ?");
  $insr->execute(array(implode(",", $reserve) ,$_SESSION['gid']));
}
?>
