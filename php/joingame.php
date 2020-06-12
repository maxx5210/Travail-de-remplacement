<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$gameid;

if (isset($_POST['gameid'])) {
  $gameid = $_POST['gameid'];
}
$_SESSION['gid'] = $gameid;

$insert = $bdd->prepare("UPDATE bataille SET J2 = ? WHERE idB = ?");
$insert->execute(array($_SESSION['user'], $gameid));

if (true) {
  echo "oui";
} else {
  echo "non";
}

?>
