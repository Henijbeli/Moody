<?php
require_once("connect.php");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

$json_data = json_decode(file_get_contents('php://input'), true); 

if(isset($json_data['username']) ) {
    $username = $json_data['username'];

    // Requête SQL pour récupérer les chansons favorites de l'utilisateur
    $sql = "SELECT s.*,A.nickname FROM song s, favoris f, client c,artiste A WHERE c.username=f.id_c AND f.id_song=s.id AND f.id_c='$username' AND A.username=s.id_artist";
    $result = mysqli_query($conn, $sql);
    
    if ($result) {
        $songs = array(); // Initialisez le tableau pour stocker les chansons favorites

        // Récupérer les données des chansons favorites dans une boucle
        while ($row = mysqli_fetch_assoc($result)) {
            $row['url'] = substr($row['url'],7,);
            $row['cover'] = substr($row['cover'],7,);
            $songs[] = $row; // Ajoutez chaque chanson au tableau des chansons favorites
        }

        // Encodez le tableau en JSON et renvoyez-le
        echo json_encode($songs);
    } else {
        // Gérer l'erreur si la requête échoue
        echo "Error: " . mysqli_error($conn);
    }
} else {
    // Gérer l'erreur si le paramètre username est manquant
    echo "Error: Missing username parameter";
}

// Fermer la connexion
mysqli_close($conn);
?>
