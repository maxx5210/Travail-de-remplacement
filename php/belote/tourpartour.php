<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$stat = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
$stat->execute(array($_SESSION['gid']));
$rep = $stat->fetchAll();

foreach ($rep as $key => $value) {
  switch (true) {
    case $value['tour'] == "1" && $value['J1'] == $_SESSION['user']:
    $status = "oui";

    $upp = $bdd->prepare("UPDATE belote SET tour = ? WHERE idB = ?");
    $upp->execute(array("2", $_SESSION['gid']));
    break;

    case $value['tour'] == "2" && $value['J2'] == $_SESSION['user']:
    $status = "oui";

    $upp = $bdd->prepare("UPDATE belote SET tour = ? WHERE idB = ?");
    $upp->execute(array("3", $_SESSION['gid']));
    break;

    case $value['tour'] == "3" && $value['J3'] == $_SESSION['user']:
    $status = "oui";

    $upp = $bdd->prepare("UPDATE belote SET tour = ? WHERE idB = ?");
    $upp->execute(array("4", $_SESSION['gid']));
    break;

    case $value['tour'] == "4" && $value['J4'] == $_SESSION['user']:
    $status = "oui";

    $upp = $bdd->prepare("UPDATE belote SET tour = ? WHERE idB = ?");
    $upp->execute(array("1", $_SESSION['gid']));
    break;

    default:
    $status = "non";
    break;
  }
}

$tableau = array('status' => $status);
echo json_encode($tableau);
?>
