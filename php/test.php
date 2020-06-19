<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

  $tableau = array("user" => $_SESSION['user']);
  
echo json_encode($tableau);

?>
