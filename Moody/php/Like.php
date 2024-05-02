<?php
require_once("connect.php");

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['action'], $data['name'])) {
    echo json_encode(["result" => "false", "message" => "Missing parameters"]);
    exit();
}

$username = $data['username'];
$action = $data['action'];
$songName = $data['name'];

// Fetch song ID based on song name
$stmt = $conn->prepare("SELECT id FROM song WHERE name = ?");
$stmt->bind_param("s", $songName);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(["result" => "false", "message" => "Song not found"]);
    exit();
}
$song = $result->fetch_assoc();
$songId = $song['id'];

if ($action === "add") {
    $checkStmt = $conn->prepare("SELECT id FROM favoris WHERE id_song = ? AND id_c = ?");
    $checkStmt->bind_param("is", $songId, $username);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    if ($checkResult->num_rows > 0) {
        echo json_encode(["result" => "false", "message" => "User already liked this song"]);
        exit();
    }
    $insertStmt = $conn->prepare("INSERT INTO favoris (id_song, id_c) VALUES (?, ?)");
    $insertStmt->bind_param("is", $songId, $username);
    if ($insertStmt->execute()) {
        echo json_encode(["result" => "true", "message" => "Song liked successfully"]);
    } else {
        echo json_encode(["result" => "false", "message" => "Failed to add favorite"]);
    }
} elseif ($action === "remove") {
    $deleteStmt = $conn->prepare("DELETE FROM favoris WHERE id_song = ? AND id_c = ?");
    $deleteStmt->bind_param("is", $songId, $username);
    if ($deleteStmt->execute()) {
        echo json_encode(["result" => "true", "message" => "Song unliked successfully"]);
    } else {
        echo json_encode(["result" => "false", "message" => "Failed to remove favorite"]);
    }
} else {
    echo json_encode(["result" => "false", "message" => "Invalid action"]);
}
?>
