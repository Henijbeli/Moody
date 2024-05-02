<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
include "connect.php";

$json_data = json_decode(file_get_contents('php://input'), true);
$user = $json_data['user'];
$req = "SELECT COUNT(*) AS count FROM artiste WHERE username='$user'";
$result = mysqli_query($conn, $req);
if ($result) {
    $row = mysqli_fetch_assoc($result);
    $count = $row['count'];
    if ($count == 0) {
        echo json_encode(array("result" => "false"));
    } else {
        echo json_encode(array("result" => "success"));
    }
}
?>