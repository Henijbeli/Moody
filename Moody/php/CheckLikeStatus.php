<?php
require_once("connect.php");

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

// Get JSON data from the request
$json_data = json_decode(file_get_contents('php://input'), true);

// Check if the required fields are present in the JSON data
if(isset($json_data['username'], $json_data['artist'], $json_data['name'])) {
    $username = $json_data['username'];
    $artist = $json_data['artist'];
    $title = $json_data['name'];

    // Function to get artist ID from the database using a prepared statement
    function Get_Artist_Id($conn, $artist) {
        $stmt = $conn->prepare("SELECT username FROM artiste WHERE nickname = ?");
        $stmt->bind_param("s", $artist);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            return $row['username'];
        } else {
            return null; // Return null if no artist found
        }
    }

    // Function to get song ID from the database using a prepared statement
    function Get_Song_Id($conn, $artist, $title) {
        $id_artist = Get_Artist_Id($conn, $artist);
        if (!$id_artist) {
            return null; // Return null if no artist ID found
        }
        $stmt = $conn->prepare("SELECT id FROM song WHERE name = ? AND id_artist = ?");
        $stmt->bind_param("ss", $title, $id_artist);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            return $row['id'];
        } else {
            return null; // Return null if no song found
        }
    }

    $id_artist = Get_Artist_Id($conn, $artist);
    $id_song = Get_Song_Id($conn, $artist, $title);

    if (!$id_song) {
        echo json_encode(array("error" => "Song or artist not found"));
        exit();
    }

    // Prepare the statement to check if the song is favorited by the user
    $stmt = $conn->prepare("SELECT * FROM favoris WHERE id_song = ? AND id_c = ?");
    $stmt->bind_param("is", $id_song, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any row is returned
    if($result->num_rows > 0) {
        echo json_encode(array("isLiked" => false));
    } else {
        echo json_encode(array("isLiked" => true));
    }
} else {
    echo json_encode(array("error" => "Missing parameters"));
}
?>
