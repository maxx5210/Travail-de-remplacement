<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$jeu = $_POST['jeu'];
$nom = $_POST['nom'];

$check = $bdd->prepare("SELECT * FROM lobby WHERE nom = ?");
$check->execute(array($nom));
$checkresult = $check->fetchAll();
if (isset($checkresult)) {
    $ajout = $bdd->prepare("INSERT INTO lobby (nom,jeu) VALUES (?,?)");
    $ajout->execute(array($nom, $jeu));

      $save = $bdd->prepare("SELECT id FROM lobby WHERE nom = ? AND jeu = ?");
      $save->execute(array($nom, $jeu));
      $saveres = $save->fetch();
      $_SESSION['gid'] = $saveres[0];
      print_r($saveres);

      if ($jeu == "test") {
        $ult = $bdd->prepare("INSERT INTO bataille (idB, nom, J1) VALUES(?,?,?)");
        $ult->execute(array($_SESSION['gid'], $nom, $_SESSION['user']));
      }
      echo "oui";
  } else {
  echo "exist";
}
?>
