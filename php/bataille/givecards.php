<?php
include_once('../includes/config.php');
include_once('../includes/garbage.php');
include_once('../includes/refresh.php');

$sel = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$sel->execute(array($_SESSION['gid']));
$selres = $sel->fetchAll();

foreach ($selres as $key => $value) {
$table = array('paquet1' => explode(",",$value['J1Paquet']), 'paquet2' => explode(",",$value['J2Paquet']));
}

echo json_encode($table);

?>
