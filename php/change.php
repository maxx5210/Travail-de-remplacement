<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$change = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$change->execute(array($_SESSION['gid']));
$changeres = $change->fetchAll();

foreach ($changeres as $key => $value) {
  if ($value['J1'] == $_SESSION['user']) {
    if ($value['J1Status'] == TRUE) {
      $up = $bdd->prepare("UPDATE bataille SET J1Status = ? WHERE idB = ?");
      $up2 = $bdd->prepare("UPDATE bataille SET J2Status = ? WHERE idB = ?");
      $up->execute(array("0", $_SESSION['gid']));
      $up2->execute(array("1", $_SESSION['gid']));
      echo "oui";
    }
  } else if ($value['J2'] == $_SESSION['user']) {
    if ($value['J2Status'] == TRUE) {
      $up = $bdd->prepare("UPDATE bataille SET J1Status = ? WHERE idB = ?");
      $up2 = $bdd->prepare("UPDATE bataille SET J2Status = ? WHERE idB = ?");
      $up->execute(array("1", $_SESSION['gid']));
      $up2->execute(array("0", $_SESSION['gid']));
      echo "oui";
    }
  }
}
?>
