<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$select = $bdd->prepare("SELECT * FROM bataille WHERE idB = ?");
$select->execute(array($_SESSION['gid']));
$selectres = $select->fetchAll();

foreach ($selectres as $key => $value) {
  if ($value['J1'] == $_SESSION['user']) {
    $tbl = array('J1' => $_SESSION['user'], 'J2' => $value['J2'], 'status' => "oui");
    echo json_encode($tbl);
} else if ($value['J2'] == $_SESSION['user']) {
    $tbl = array('J2' => $_SESSION['user'], 'J1' => $value['J1'], 'status' => "non");
    echo json_encode($tbl);
  }
}

?>
