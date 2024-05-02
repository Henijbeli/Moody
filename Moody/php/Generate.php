<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow only requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Specify methods allowed
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Specify headers allowed
require_once("connect.php");

$json_data = json_decode(file_get_contents('php://input'), true); 
$mood = $json_data['mood'] ?? null;
$category = $json_data['category'] ?? null;
$activity = $json_data['activity'] ?? null;
$tempo = $json_data['tempo'] ?? null;

// Function to get IDs using prepared statements
function getId($conn, $table, $name) {
    $sql = "SELECT id FROM $table WHERE name = ?";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $name);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        mysqli_stmt_close($stmt);
        return ($row ? $row['id'] : null);
    }
    return null;
}

$id_mood = getId($conn, "mood", $mood);
$id_category = getId($conn, "categorie", $category); // Ensure 'categorie' is the correct table name
$id_activity = getId($conn, "activite", $activity);
$id_tempo = getId($conn, "tempo", $tempo);

// Base query with JOIN
$sql = "SELECT A.nickname, S.name, S.id_artist, S.url, S.cover FROM song S,artiste A where  S.id_artist = A.username";
$params = [];
$types = '';

// Append conditions based on input
if ($id_mood) {
    $sql .= " AND S.id_mood = ?";
    $params[] = $id_mood;
    $types .= 'i';
}
if ($id_activity) {
    $sql .= " AND S.id_activity = ?";
    $params[] = $id_activity;
    $types .= 'i';
}
if ($id_category) {
    $sql .= " AND S.id_category = ?";
    $params[] = $id_category;
    $types .= 'i';
}
if ($id_tempo) {
    $sql .= " AND S.id_tempo = ?";
    $params[] = $id_tempo;
    $types .= 'i';
}

// Execute the final SQL query using prepared statement
$stmt = mysqli_prepare($conn, $sql);
if ($params) {
    mysqli_stmt_bind_param($stmt, $types, ...$params);
}
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Initialize an array to store the results
$songs = array();
while ($row = mysqli_fetch_assoc($result)) {
    if (isset($row['url'])&&(isset($row['cover']))) {
        $row['url'] = substr($row['url'],7,);
        $row['cover'] = substr($row['cover'],7,); 
    }
    $songs[] = $row;
}

// Close statement and connection
mysqli_stmt_close($stmt);
mysqli_close($conn);

// Encode the array as JSON and return
echo json_encode($songs);
?>
