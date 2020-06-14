<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$gameid;

if (isset($_POST['gameid'])) {
  $gameid = $_POST['gameid'];
}
$_SESSION['gid'] = $gameid;

$select = $bdd->prepare("SELECT * from lobby WHERE id = ?");
$select->execute(array($gameid));
$selectrep = $select->fetchAll();

foreach ($selectrep as $key => $value) {
  if ($value['jeu'] == "bataille") {
    echo "bataille";
    $insert = $bdd->prepare("UPDATE bataille SET J2 = ? WHERE idB = ?");
    $insert->execute(array($_SESSION['user'], $gameid));
  } else if ($value['jeu'] == "test") {
    echo "test";
    $insert = $bdd->prepare("UPDATE bataille SET J2 = ? WHERE idB = ?");
    $insert->execute(array($_SESSION['user'], $gameid));
  }
}



?>
