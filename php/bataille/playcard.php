<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$test = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$test->execute(array($_SESSION['gid']));
$testres = $test->fetchAll();

foreach ($testres as $key => $value) {

  if ($value['J1'] == $_SESSION['user']) {
    $update = $bdd->prepare("UPDATE bataille SET J1Status = ? WHERE idB = ?");
    $update->execute(array("1", $_SESSION['gid']));

  } else if ($value['J2'] == $_SESSION['user']) {
    $update2 = $bdd->prepare("UPDATE bataille SET J2Status = ? WHERE idB = ?");
    $update2->execute(array("1", $_SESSION['gid']));
  }
}

?>
