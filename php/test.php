<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');

$req = $bdd->prepare("SELECT * FROM sessions") or die('Erreur');
$req->execute();
$rep = $req->fetchAll();
echo "Personnes en ligne";
echo "<br>";
echo "<ul>";

foreach ($rep as $key => $value) {

echo "<li>".$value['user']."</li>";
}
echo "</ul>";
count($rep);
?>
