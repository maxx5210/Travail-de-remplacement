<?php
include_once("includes/config.php");
include_once('includes/garbage.php');
$user = $_POST['user'];
$email = $_POST['mail'];
$pass = $_POST['pass'];
$pass = password_hash($pass);
 
$bdd = new PDO('mysql:host=localhost;dbname=' . $db_name, $db_user, $db_pass, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
)) or die('Failed to connect');

$req = $bdd->prepare("SELECT * FROM users WHERE name = ? AND pass = ?") or die('Impossible d\'ajouter à la base');
$req->execute(array(
    $user,
    $pass
));
$rep = $req->fetchAll();

if (empty($rep))
{
    $req2 = $bdd->prepare("INSERT INTO users (name, mail, pass) VALUES('$user', '$email', '$pass')") or die('Impossible d\'ajouter à la base');
    $req2->execute(array(
        $user,
        $email,
        $pass
    ));
    echo "oui";
}
else
{
    echo "non";
}
?>
