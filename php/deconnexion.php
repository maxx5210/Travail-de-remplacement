<?php
include_once('includes/session.php');
include_once('includes/garbage.php');

session_start();
$bdd = new PDO('mysql:host=localhost;dbname=' . $db_name, $db_user, $db_pass, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
)) or die('Failed to connect');

$req = $bdd->prepare("DELETE FROM `sessions` WHERE `sess_id` = ?") or die('Erreur');
$req->execute(array(session_id()));

session_unset();
session_destroy();
?>
