<?php
// Connection
require_once("connect.php");
require_once("vendor/autoload.php");

use Firebase\JWT\JWT;

$json_data = json_decode(file_get_contents('php://input'), true); 
$mood = $json_data['mood'];
$activite = $json_data['activity'];
$categorie = $json_data['category'];
$tempo = $json_data['tempo'];

// Base query
$sql = "SELECT name,id_artist,url,cover FROM song WHERE 1=1";

// Append conditions based on input
if(isset($mood)){
    $sql .= " AND id_mood=(SELECT id FROM mood WHERE name='$mood')";
}
if(isset($activite)){
    $sql .= " AND id_activity=(SELECT id FROM activite WHERE name='$activite')";
}
if(isset($categorie)){
    $sql .= " AND id_category=(SELECT id FROM categorie WHERE name='$categorie')";
}
if(isset($tempo)){
    $sql .= " AND id_tempo=(SELECT id FROM tempo WHERE name='$tempo')";
}

// Execute the final SQL query
$result = mysqli_query($conn, $sql);

// Initialize an array to store the results
$songs = array();

// Fetch rows and store in array
while ($row = mysqli_fetch_assoc($result)) {
    $songs[] = $row;
}

// Encode the array as JSON and return
echo json_encode($songs);

?>
