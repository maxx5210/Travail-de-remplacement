<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$test = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$test->execute(array($_SESSION['gid']));
$testres = $test->fetchAll();

foreach ($testres as $key => $value) {
  if ($value['J2'] == $_SESSION['user']) {
    if ($value['J1Status'] == "1") {
      echo "J1";
    }
  }

  if ($value['J1'] == $_SESSION['user']) {
    if ($value['J2Status'] == "1") {
      echo "J2";
    }
  }
}
?>
