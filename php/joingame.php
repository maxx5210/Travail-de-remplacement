<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$gameid;

$gameid = $_POST['gameid'];

$_SESSION['gid'] = $gameid;

$select = $bdd->prepare("SELECT * from lobby WHERE id = ?");
$select->execute(array($gameid));
$selectrep = $select->fetchAll();

foreach ($selectrep as $key => $value) {
  $_SESSION['game'] = $value['jeu'];

  switch ($value['jeu']) {
    case "bataille":
    $insert = $bdd->prepare("UPDATE bataille SET J2 = ? WHERE idB = ?");
    $insert->execute(array($_SESSION['user'], $gameid));

    $delete = $bdd->prepare("DELETE FROM lobby WHERE id = ?");
    $delete->execute(array($_SESSION['gid']));

    echo "oui";
    break;

    case "belote":
    $aaa = $bdd->prepare("SELECT * FROM belote WHERE idB = ?");
    $aaa->execute(array($_SESSION['gid']));
    $bbb = $aaa->fetchAll();

    foreach ($bbb as $key => $value) {
      switch (true) {
        case $value['J2'] == "":
        $insert = $bdd->prepare("UPDATE belote SET J2 = ? WHERE idB = ?");
        $insert->execute(array($_SESSION['user'], $_SESSION['gid']));

        echo "oui";
        break;

        case $value['J3'] == "":
        $insert = $bdd->prepare("UPDATE belote SET J3 = ? WHERE idB = ?");
        $insert->execute(array($_SESSION['user'], $_SESSION['gid']));

        echo "oui";
        break;

        case $value['J4'] == "":
        $insert = $bdd->prepare("UPDATE belote SET J4 = ? WHERE idB = ?");
        $insert->execute(array($_SESSION['user'], $_SESSION['gid']));

        $delete = $bdd->prepare("DELETE FROM lobby WHERE id = ?");
        $delete->execute(array($_SESSION['gid']));

        echo "oui";
        break;

        default:
        echo "non";
        break;
      }
    }
    break;

    default:
    echo "non";
    break;
  }
}//Pas plus loin

?>
