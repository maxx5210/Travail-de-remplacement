<?php
include_once('config.php');
session_set_save_handler('open', 'close', 'read', 'write','destroy','gc');

function open($sess_id) {
  $bdd = new PDO('mysql:host=localhost;dbname='.$GLOBALS["db_name"], $GLOBALS["db_user"], $GLOBALS["db_pass"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

  $sql = "INSERT INTO sessions (sess_id, user, access) VALUES(?,?,?)";
  $req = $bdd->prepare($sql) or die('Impossible d\'ajouter à la base');
  $req->execute(array(session_id(), $GLOBALS['user'],date("Y-d-m H:i:s")));
  return true;
} // end function _open()

function close() {
  $sess_id = session_id();
} // end function _close()

function read() {
  $bdd = new PDO('mysql:host=localhost;dbname='.$GLOBALS["db_name"], $GLOBALS["db_user"], $GLOBALS["db_pass"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

  $sql = "SELECT data FROM sessions where session_id =".session_id();
  $result = $bdd->prepare($sql);
  $result->execute();
  $data = $result->fetchColumn();
  $result->closeCursor();

  return $data;
} // end function _read()

function write($sess_id,$data) {
  $bdd = new PDO('mysql:host=localhost;dbname='.$GLOBALS["db_name"], $GLOBALS["db_user"], $GLOBALS["db_pass"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

  $sql = "INSERT INTO session SET session_id =" . $db->quote($sessionId) . ", session_data =" . $db->quote($data) . " ON DUPLICATE KEY UPDATE session_data =" . $db->quote($data);
  $req = $bdd->prepare($sql);
  $req->execute();
} // end function _write()

function destroy() {
  $bdd = new PDO('mysql:host=localhost;dbname='.$GLOBALS["db_name"], $GLOBALS["db_user"], $GLOBALS["db_pass"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

  $sql = "DELETE * FROM sessions WHERE sess_id =".session_id();
  $req = $bdd->prepare($sql) or die('Echec');
  $req->execute();
} // end function _destroy()

function gc($lifetime) {
  $bdd = new PDO('mysql:host=localhost;dbname='.$GLOBALS["db_name"], $GLOBALS["db_user"], $GLOBALS["db_pass"], array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)) or die('Failed to connect');

  $sql = "DELETE FROM sessions WHERE access < DATE_SUB(NOW(), INTERVAL " . $lifetime . " SECOND)";
  $req = $bdd->prepare($sql);
  $req->execute();
} // end function _gc

?>
