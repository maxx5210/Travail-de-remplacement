<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$jeu = $_POST['jeu'];
$nom = $_POST['nom'];

$ajout = $bdd->prepare("INSERT INTO lobby (joueurs,nom,jeu) VALUES (?,?,?)");
$ajout->execute(array());
?>
