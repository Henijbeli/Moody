<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json');
require_once("connect.php");





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
        // Fetch the nickname from the database
        $reqNickname = "SELECT nickname FROM artiste WHERE username='$user'";
        $resultNickname = mysqli_query($conn, $reqNickname);
        $rowNickname = mysqli_fetch_assoc($resultNickname);
        $nickname = $rowNickname['nickname'];
        
        // Encode the result including the fetched nickname
        echo json_encode(array("result" => "success", "nickname" => $nickname));
    }
}
?>