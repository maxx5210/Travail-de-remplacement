<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$select = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$select->execute(array($_SESSION['gid']));
$selectres = $select->fetchAll();

foreach ($selectres as $key => $value) {

  $update = $bdd->prepare("UPDATE belote SET J1Status = ? WHERE idB = ?");
  $update->execute(array("0", $_SESSION['gid']));

  $update2 = $bdd->prepare("UPDATE belote SET J2Status = ? WHERE idB = ?");
  $update2->execute(array("0", $_SESSION['gid']));

  $update3 = $bdd->prepare("UPDATE belote SET J3Status = ? WHERE idB = ?");
  $update3->execute(array("0", $_SESSION['gid']));

  $update4 = $bdd->prepare("UPDATE belote SET J4Status = ? WHERE idB = ?");
  $update4->execute(array("0", $_SESSION['gid']));

  switch (true) {
    case $value['J1'] == $_SESSION['user']:

    $tbl = array('J1' => $_SESSION['user'], 'J2' => $value['J2'], 'status' => "J1");
    break;

    case $value['J2'] == $_SESSION['user']:

    $tbl = array('J2' => $_SESSION['user'], 'J2' => $value['J2'], 'status' => "J1");
    break;

    case $value['J3'] == $_SESSION['user']:

    $tbl = array('J3' => $_SESSION['user'], 'J2' => $value['J2'], 'status' => "J1");
    break;

    case $value['J4'] == $_SESSION['user']:

    $tbl = array('J4' => $_SESSION['user'], 'J2' => $value['J2'], 'status' => "J1");
    break;

    default:

    break;
  }


}
echo json_encode($tbl);

?>
