<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$j1;
$j2;
$j3;
$j4;

$select = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$select->execute(array($_SESSION['gid']));
$selectres = $select->fetchAll();

foreach ($selectres as $key => $value) {

  $team1 = explode(",", $value['team1']);
  $team2 = explode(",", $value['team2']);

  $update = $bdd->prepare("UPDATE belote SET J1Status = ? WHERE idB = ?");
  $update->execute(array("0", $_SESSION['gid']));

  $update2 = $bdd->prepare("UPDATE belote SET J2Status = ? WHERE idB = ?");
  $update2->execute(array("0", $_SESSION['gid']));

  $update3 = $bdd->prepare("UPDATE belote SET J3Status = ? WHERE idB = ?");
  $update3->execute(array("0", $_SESSION['gid']));

  $update4 = $bdd->prepare("UPDATE belote SET J4Status = ? WHERE idB = ?");
  $update4->execute(array("0", $_SESSION['gid']));

  switch (true) {
    case $_SESSION['user'] == $value['J1']:

    if (in_array($_SESSION['user'], $team1)) {
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team1); $i++) {
        if ($team1[$i] !== $_SESSION['user']) {
          $j3 = $team1[$i];
        }
      }
      $j2 = $team2[0];
      $j4 = $team2[1];
    } else if (in_array($_SESSION['user'], $team2)){
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team2); $i++) {
        if ($team2[$i] !== $_SESSION['user']) {
          $j3 = $team2[$i];
        }
      }
      $j2 = $team1[0];
      $j4 = $team1[1];
    }

    $tbl = array('J1' => $j1, 'J2' => $j2, 'J3' => $j3, 'J4' => $j4, 'status' => "J1");

    $upd = $bdd->prepare("UPDATE belote SET J1 = ? WHERE idB = ?");
    $upd->execute(array($j1, $_SESSION['gid']));

    $upd2 = $bdd->prepare("UPDATE belote SET J2 = ? WHERE idB = ?");
    $upd2->execute(array($j2, $_SESSION['gid']));

    $upd3 = $bdd->prepare("UPDATE belote SET J3 = ? WHERE idB = ?");
    $upd3->execute(array($j3, $_SESSION['gid']));

    $upd4 = $bdd->prepare("UPDATE belote SET J4 = ? WHERE idB = ?");
    $upd4->execute(array($j4, $_SESSION['gid']));
    break;

    case $_SESSION['user'] == $value['J2']:
    if (in_array($_SESSION['user'], $team1)) {
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team1); $i++) {
        if ($team1[$i] !== $_SESSION['user']) {
          $j3 = $team1[$i];
        }
      }
      $j2 = $team2[0];
      $j4 = $team2[1];
    } else if (in_array($_SESSION['user'], $team2)){
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team2); $i++) {
        if ($team2[$i] !== $_SESSION['user']) {
          $j3 = $team2[$i];
        }
      }
      $j2 = $team1[0];
      $j4 = $team1[1];
    }

    $tbl = array('J1' => $j1, 'J2' => $j2, 'J3' => $j3, 'J4' => $j4, 'status' => "J2");
    break;

    case $_SESSION['user'] == $value['J3']:
    if (in_array($_SESSION['user'], $team1)) {
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team1); $i++) {
        if ($team1[$i] !== $_SESSION['user']) {
          $j3 = $team1[$i];
        }
      }
      $j2 = $team2[0];
      $j4 = $team2[1];
    } else if (in_array($_SESSION['user'], $team2)){
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team2); $i++) {
        if ($team2[$i] !== $_SESSION['user']) {
          $j3 = $team2[$i];
        }
      }
      $j2 = $team1[0];
      $j4 = $team1[1];
    }

    $tbl = array('J1' => $j1, 'J2' => $j2, 'J3' => $j3, 'J4' => $j4, 'status' => "J3");
    break;

    case $_SESSION['user'] == $value['J4']:
    if (in_array($_SESSION['user'], $team1)) {
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team1); $i++) {
        if ($team1[$i] !== $_SESSION['user']) {
          $j3 = $team1[$i];
        }
      }
      $j2 = $team2[0];
      $j4 = $team2[1];
    } else if (in_array($_SESSION['user'], $team2)){
      $j1 = $_SESSION['user'];

      for ($i=0; $i < count($team2); $i++) {
        if ($team2[$i] !== $_SESSION['user']) {
          $j3 = $team2[$i];
        }
      }
      $j2 = $team1[0];
      $j4 = $team1[1];
    }

    $tbl = array('J1' => $j1, 'J2' => $j2, 'J3' => $j3, 'J4' => $j4, 'status' => "J4");
    break;

    default:
    // code...
    break;
  }


}
echo json_encode($tbl);

?>
