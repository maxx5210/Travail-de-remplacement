<?php
include_once('includes/config.php');

$bdd = new PDO('mysql:host=localhost;dbname=' . $db_name, $db_user, $db_pass, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
)) or die('Failed to connect');
$time = strtotime(date("Y-d-m H:i:s"));

$req = $bdd->prepare("SELECT * FROM sessions");
$req->execute();
$rep = $req->fetchAll();

foreach ($rep as $key => $value) {
  if (strtotime($value['access']) < strtotime(date("Y-d-m H:i:s"))-3600000) {
    $req2 = $bdd->prepare("DELETE FROM sessions WHERE user = ?");
    $req2->execute(array($value['user']));
  }
}
?>
