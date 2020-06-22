<?php
include_once('includes/config.php');
include_once('includes/garbage.php');
include_once('includes/refresh.php');

if (isset($_POST['team'])) {$team = $_POST['team'];}

switch ($_SESSION['game']) {
  case 'belote':

  if ($_SESSION['team'] == $team) {
    echo "joined";
    exit();
  } else {
    if ($team == "team1") {
      $select = $bdd->prepare("SELECT team1 FROM belote WHERE idB = ?");
      $select->execute(array($_SESSION['gid']));
      $reponse = $select->fetch();
      $_SESSION['team'] = $team;
    } else if ($team == "team2") {
      $select = $bdd->prepare("SELECT team2 FROM belote WHERE idB = ?");
      $select->execute(array($_SESSION['gid']));
      $reponse = $select->fetch();
      $_SESSION['team'] = $team;
    }
  }

  if ($reponse[0] !== "") {
    $a = explode(",", $reponse[0]);
    array_push($a, $_SESSION['user']);
  } else {
    $a = [];
    $a[] = $_SESSION['user'];
  }

  //suppression du joueur de l'autre équipe

  if ($team == "team1") {
    $supp = $bdd->prepare("SELECT team2 FROM belote WHERE idB = ?");
    $supp->execute(array($_SESSION['gid']));
    $reppp = $supp->fetch();

    $c = explode(",", $reppp[0]);

    for ($i=0; $i < count($c); $i++) {
      echo $i;
      echo $c[$i];
      if ($c[$i] == $_SESSION['user']) {
        array_splice($c, $i);

        $add = $bdd->prepare("UPDATE belote SET team2 = ? WHERE idB = ?");
        $add->execute(array(implode(",", $c), $_SESSION['gid']));
        break;
      }
    }
  } else {
    $supp = $bdd->prepare("SELECT team1 FROM belote WHERE idB = ?");
    $supp->execute(array($_SESSION['gid']));
    $reppp = $supp->fetch();

    $c = explode(",", $reppp[0]);

    for ($i=0; $i < count($c); $i++) {
      echo $i;
      echo $c[$i];
      if ($c[$i] == $_SESSION['user']) {
        array_splice($c, $i);

        $add = $bdd->prepare("UPDATE belote SET team1 = ? WHERE idB = ?");
        $add->execute(array(implode(",", $c), $_SESSION['gid']));
        break;
      }
    }
  }

  //Insertion des joueurs dans l'équipe

  $b = implode(",", $a);
  var_dump($b);

  if ($_SESSION['team'] == "team1") {
    $add = $bdd->prepare("UPDATE belote SET team1 = ? WHERE idB = ?");
    $add->execute(array($b, $_SESSION['gid']));
  } else {
    $add = $bdd->prepare("UPDATE belote SET team2 = ? WHERE idB = ?");
    $add->execute(array($b, $_SESSION['gid']));
  }

  break;

  default:
  // code...
  break;
}
?>
