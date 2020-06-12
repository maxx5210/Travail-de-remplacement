<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$test = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$test->execute(array($_SESSION['gid']));
$testres = $test->fetchAll();

foreach ($testres as $key => $value) {
  if ($value['J1'] == $_SESSION['user']) {
    if ($value['J1Status'] == TRUE) {
      echo "oui";
    }
  } else if ($value['J2'] == $_SESSION['user']) {
    if ($value['J2Status'] == TRUE) {
      echo "oui";
    }
  }
}
?>
