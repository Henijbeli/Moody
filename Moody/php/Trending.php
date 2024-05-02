<?php
// Connection
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";




$songs = array();
$sql = "SELECT max(id) as x FROM song";
$result = mysqli_query($conn, $sql);

// Vérifier si la requête a réussi
if ($result) {
    // Récupérer le résultat de la requête
    $row = mysqli_fetch_assoc($result);
    $nbr = $row['x'];
    $rowindice = array();
    // Fetch 12 random songs
    for ($i = 0; $i < 12; $i++) {
        $random_song_id = rand(1, $nbr); 
        $sql = "SELECT A.nickname, S.name, S.id_artist, S.url, S.cover FROM song S JOIN artiste A ON S.id_artist = A.username WHERE S.id='$random_song_id'";
        $result = mysqli_query($conn, $sql);

        // Vérifier si la requête a réussi
        if ($result) {
            // Vérifier s'il y a des résultats
            if (mysqli_num_rows($result) > 0 && !in_array($random_song_id, $rowindice)) {
                $row = mysqli_fetch_assoc($result);
                $row['url'] = substr($row['url'],7,);
                $row['cover'] = substr($row['cover'],7,);
                $rowindice[] = $random_song_id; 
                $songs[] = $row;
            } else {
                $i--; // Retry for another song if the current one is already fetched or duplicate
            }
        } else {
            // Gérer l'erreur si la requête échoue
            echo "Error: " . mysqli_error($conn);
        }
        
    }

} else {
    // Gérer l'erreur si la requête échoue
    echo "Error: " . mysqli_error($conn);
}

// Fermer la connexion
mysqli_close($conn);

// Encode the array to JSON and echo it
echo json_encode($songs);
?>
