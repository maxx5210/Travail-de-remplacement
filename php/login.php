<?php
include_once('includes/session.php');
$user = $_POST['user'];
$pass = $_POST['pass'];
$pass = md5($pass);
//Je devrais utilise password hash, je sais
$bdd = new PDO('mysql:host=localhost;dbname=' . $db_name, $db_user, $db_pass, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
)) or die('Failed to connect');

$req = $bdd->prepare("SELECT * FROM users WHERE name = ? AND pass = ?") or die('Impossible d\'ajouter à la base');
$req->execute(array(
    $user,
    $pass
));
$rep = $req->fetchAll();

if (empty($rep)) {
    echo "non";
} else {
    session_start();
    echo "oui";
}
?>
