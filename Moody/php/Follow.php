<?php
require_once("connect.php");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');

$json_data = json_decode(file_get_contents('php://input'), true);

if(isset($json_data['username'], $json_data['nickname'], $json_data['action'])) {
    $username = $json_data['username'];
    $nickname = $json_data['nickname'];
    $action = $json_data['action'];

    $id_artist = getID($conn, $nickname);
    if($id_artist === null) {
        echo json_encode(["result" => "false", "message" => "Artist not found"]);
        exit;
    }

    if($action === "follow") {
        $stmt = $conn->prepare("SELECT * FROM follow WHERE username = ? AND id_Artiste = ?");
        $stmt->bind_param("ss", $username, $id_artist);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows == 0){
            $stmt = $conn->prepare("INSERT INTO follow (username, id_Artiste) VALUES (?, ?)");
            $stmt->bind_param("ss", $username, $id_artist);
            $stmt->execute();
            echo json_encode(["result" => "true"]);
        } else {
            echo json_encode(["result" => "false", "message" => "Already followed"]);
        }
    } elseif($action === "unfollow") {
        $stmt = $conn->prepare("DELETE FROM follow WHERE username = ? AND id_Artiste = ?");
        $stmt->bind_param("ss", $username, $id_artist);
        $stmt->execute();
        echo json_encode(["result" => "true"]);
    } else {
        echo json_encode(["result" => "false", "message" => "Invalid action"]);
    }
} else {
    echo json_encode(["result" => "false", "message" => "Missing parameters"]);
}

function getID($conn, $nickname) {
    $stmt = $conn->prepare("SELECT username FROM artiste WHERE nickname = ?");
    $stmt->bind_param('s', $nickname);
    $stmt->execute();
    $result = $stmt->get_result();
    $artist = $result->fetch_assoc();
    return ($artist ? $artist['username'] : null);
}

?>
