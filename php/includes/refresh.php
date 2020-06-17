<?php
session_start();

$bdd = new PDO('mysql:host=localhost;dbname='.$db_name, $db_user, $db_pass,
array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

$data = session_encode();

$req2 = $bdd->prepare("UPDATE sessions SET data = ? WHERE sess_id = ?");
$req2->execute(array($data, session_id()));

$req3 = $bdd->prepare("UPDATE sessions SET access = ? WHERE sess_id = ?");
$req3->execute(array(date("Y-m-d H:i:s"), session_id()));
?>
