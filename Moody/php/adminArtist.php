<?php
// Connection
require_once("connect.php");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

$json_data = json_decode(file_get_contents('php://input'), true);
$username = $json_data['username'] ?? '';

// Corrected SQL query formation using prepared statement
if ($username) {
    $sql = "SELECT * FROM song WHERE id_artist=?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Initialize an array to store the results
    $songs = array();
    // Fetch rows and store in array
    while ($row = mysqli_fetch_assoc($result)) {
        // Example modification of the URL within the row data, if needed
        if (isset($row['url'])&&(isset($row['cover']))) {
            $row['url'] = substr($row['url'],7,);
            $row['cover'] = substr($row['cover'],7,); 
        }
        $songs[] = $row;
    }

    // Encode the array as JSON and return
    echo json_encode($songs);

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => "Username is required"]);
}

// Close the database connection
mysqli_close($conn);
?>
