<?php
include_once('includes/garbage.php');
include_once('includes/refresh.php');


$games = $bdd->prepare("SELECT * FROM lobby");
$games->execute();
$gamesrep = $games->fetchAll();

echo "<table>"."<thead>
<tr><th colspan='3'>Liste des parties</th></tr>
</thead>";
echo "<tbody>";
foreach ($gamesrep as $key => $value) {
  echo "<tr>";
  echo "<td>".$value['nom']."</td>";
  echo "<td>".$value['jeu']."</td>";
  echo "<td>"."<button onclick='list();' value=".$value["id"].">Rejoindre la partie</button>"."</td>";
  echo "</tr>";
}
echo "</tbody>";
echo "</table>";
?>
