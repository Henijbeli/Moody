<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true);

if(isset($json_data["username"]) && isset($json_data["nickname"])) {
    $username = $json_data["username"];
    $nickname = $json_data["nickname"];

    // Prepare an insert statement
    $stmt = $conn->prepare("INSERT INTO artiste (username, nickname, nb_abonne, nb_song) VALUES (?, ?, 0, 0)");

    // Bind variables to the prepared statement as parameters
    $stmt->bind_param("ss", $username, $nickname);

    // Attempt to execute the prepared statement
    if($stmt->execute()) {
        echo json_encode(array("result" => "success"));
    } else {
        echo json_encode(array("result" => "false"));
    }

    // Close statement
    $stmt->close();
} else {
    echo json_encode(array("result" => "false", "error" => "Username or nickname missing"));
}

// Close connection
$conn->close();
?>
