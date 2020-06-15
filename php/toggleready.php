<?php
//Sert à faire basculer le status en prêt/Pas prêt
include_once('includes/garbage.php');
include_once('includes/refresh.php');

switch ($_SESSION['game']) {
  case 'bataille':

  $select = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
  $select->execute(array($_SESSION['gid']));
  $selectplayer = $select->fetchall();

  foreach ($selectplayer as $key => $value) {

    switch (true) {
      case $value['J1'] == $_SESSION['user']&& $value['J1Status'] == "1":
      $update = $bdd->prepare("UPDATE bataille SET J1Status = ?");
      $update->execute(array("0"));
      break;

      case $value['J1'] == $_SESSION['user']&& $value['J1Status'] == "0":
      $update = $bdd->prepare("UPDATE bataille SET J1Status = ?");
      $update->execute(array("1"));
      break;

      case $value['J2'] == $_SESSION['user'] && $value["J2Status"] == "1":
      $update = $bdd->prepare("UPDATE bataille SET J2Status = ?");
      $update->execute(array("0"));
      break;

      case $value['J2'] == $_SESSION['user'] && $value["J2Status"] == "0":
      $update = $bdd->prepare("UPDATE bataille SET J2Status = ?");
      $update->execute(array("1"));
      break;

      default:

      break;
    }
  }
  break;

  case 'belote':
  break;

  default:

  break;
}



?>
