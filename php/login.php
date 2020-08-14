<?php
include_once('includes/config.php');

$user = $_POST['user'];
$pass = $_POST['pass'];
$pass = password_hash($pass);
//Je devrais utilise password hash, je sais
$bdd = new PDO('mysql:host=localhost;dbname='.$db_name, $db_user, $db_pass,
array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

$req = $bdd->prepare("SELECT * FROM users WHERE name = ? AND pass = ?") or die('Impossible d\'ajouter à la base');
$req->execute(array($user,$pass));
$rep = $req->fetchAll();

if (empty($rep)) {
  echo "non";
} else {
  session_start();
  $_SESSION['user'] = $user;
  $data = session_encode();
  $req2 = $bdd->prepare("INSERT INTO sessions (`sess_id`, `user`, `data`) VALUES (?,?,?)");
  $req2->execute(array(session_id() ,$user,$data));
  echo "oui";
}
?>
